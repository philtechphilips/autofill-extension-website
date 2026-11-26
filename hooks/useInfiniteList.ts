"use client";

import { DependencyList, useCallback, useEffect, useRef, useState } from "react";

export const PAGE_SIZE = 10;

export type PageResult<T> = {
  items: T[];
  /** Total pages, when the API reports it. */
  pages?: number;
  /** Total item count, when the API reports it. */
  total?: number;
};

/**
 * Loads a list 10 items at a time and fetches the next page automatically
 * when the sentinel element scrolls into view.
 *
 * `deps` resets the list (e.g. when a filter changes).
 */
export function useInfiniteList<T>(
  fetchPage: (page: number, limit: number) => Promise<PageResult<T>>,
  deps: DependencyList = [],
  limit: number = PAGE_SIZE,
) {
  const [items, setItems] = useState<T[]>([]);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState<number | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(false);

  const busy = useRef(false);
  const generation = useRef(0);
  const fetchRef = useRef(fetchPage);
  fetchRef.current = fetchPage;

  const load = useCallback(
    async (nextPage: number) => {
      if (busy.current) return;
      busy.current = true;
      const gen = generation.current;
      if (nextPage === 1) setLoading(true);
      else setLoadingMore(true);
      setError(false);

      try {
        const res = await fetchRef.current(nextPage, limit);
        if (gen !== generation.current) return; // a reset happened meanwhile
        setItems((prev) => (nextPage === 1 ? res.items : [...prev, ...res.items]));
        setPage(nextPage);
        if (res.total !== undefined) setTotal(res.total);
        const more =
          res.pages !== undefined ? nextPage < res.pages : res.items.length === limit;
        setHasMore(more);
      } catch (err) {
        console.error("Failed to load list:", err);
        if (gen === generation.current) setError(true);
      } finally {
        if (gen === generation.current) {
          setLoading(false);
          setLoadingMore(false);
        }
        busy.current = false;
      }
    },
    [limit],
  );

  // Reset and load the first page whenever deps change.
  useEffect(() => {
    generation.current += 1;
    busy.current = false;
    setItems([]);
    setPage(0);
    setTotal(null);
    setHasMore(true);
    load(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  // Observe the sentinel and fetch the next page as it approaches the viewport.
  const observer = useRef<IntersectionObserver | null>(null);
  const sentinelRef = useCallback(
    (node: HTMLElement | null) => {
      observer.current?.disconnect();
      if (!node) return;
      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0]?.isIntersecting && hasMore && !loading && !loadingMore && !error) {
            load(page + 1);
          }
        },
        { rootMargin: "320px 0px" },
      );
      observer.current.observe(node);
    },
    [hasMore, loading, loadingMore, error, load, page],
  );

  useEffect(() => () => observer.current?.disconnect(), []);

  return {
    items,
    total,
    hasMore,
    loading,
    loadingMore,
    error,
    sentinelRef,
    retry: () => load(page + 1 || 1),
  };
}
