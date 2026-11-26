"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export const PAGE_SIZE = 10;

export type PageResult<T> = {
  items: T[];
  /** Total pages, when the API reports it. */
  pages?: number;
  /** Total item count, when the API reports it. */
  total?: number;
};

type ListState<T> = {
  key: string;
  items: T[];
  page: number;
  total: number | null;
  hasMore: boolean;
};

/**
 * Loads a list 10 items at a time and fetches the next page automatically
 * when the sentinel element scrolls into view.
 *
 * `resetKey` restarts the list from page 1 whenever it changes (e.g. a filter).
 */
export function useInfiniteList<T>(
  fetchPage: (page: number, limit: number) => Promise<PageResult<T>>,
  resetKey: string = "",
  limit: number = PAGE_SIZE,
) {
  const [state, setState] = useState<ListState<T> | null>(null);
  const [loadingMore, setLoadingMore] = useState(false);
  const [errorKey, setErrorKey] = useState<string | null>(null);

  const fetchRef = useRef(fetchPage);
  useEffect(() => {
    fetchRef.current = fetchPage;
  });

  const busy = useRef(false);
  const currentKey = useRef(resetKey);

  const load = useCallback(
    async (page: number, key: string) => {
      busy.current = true;
      try {
        const res = await fetchRef.current(page, limit);
        if (key !== currentKey.current) return; // filter changed meanwhile
        setState((prev) => ({
          key,
          items: page === 1 || !prev || prev.key !== key ? res.items : [...prev.items, ...res.items],
          page,
          total: res.total ?? prev?.total ?? null,
          hasMore: res.pages !== undefined ? page < res.pages : res.items.length === limit,
        }));
        setErrorKey(null);
      } catch (err) {
        console.error("Failed to load list:", err);
        if (key === currentKey.current) setErrorKey(key);
      } finally {
        busy.current = false;
        setLoadingMore(false);
      }
    },
    [limit],
  );

  // First page, and again whenever the reset key changes.
  useEffect(() => {
    currentKey.current = resetKey;
    load(1, resetKey);
  }, [resetKey, load]);

  const ready = state !== null && state.key === resetKey;
  const items = ready ? state.items : [];
  const hasMore = ready ? state.hasMore : true;
  const error = errorKey === resetKey;
  const loading = !ready && !error;

  const loadNext = useCallback(() => {
    if (busy.current || !ready || !hasMore) return;
    setLoadingMore(true);
    load((state?.page ?? 0) + 1, resetKey);
  }, [ready, hasMore, load, state, resetKey]);

  // Observe the sentinel and fetch the next page as it approaches the viewport.
  const observer = useRef<IntersectionObserver | null>(null);
  const sentinelRef = useCallback(
    (node: HTMLElement | null) => {
      observer.current?.disconnect();
      if (!node) return;
      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0]?.isIntersecting && !error) loadNext();
        },
        { rootMargin: "320px 0px" },
      );
      observer.current.observe(node);
    },
    [loadNext, error],
  );

  useEffect(() => () => observer.current?.disconnect(), []);

  return {
    items,
    total: ready ? state.total : null,
    hasMore,
    loading,
    loadingMore,
    error,
    sentinelRef,
    retry: () => {
      setErrorKey(null);
      if (ready) loadNext();
      else load(1, resetKey);
    },
  };
}
