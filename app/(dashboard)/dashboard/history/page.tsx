"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, FileText, Wand2, XCircle, Zap } from "lucide-react";
import api from "@/lib/api";
import {
  Badge,
  EmptyState,
  InfiniteFooter,
  PageHeader,
  Panel,
  Segmented,
} from "@/components/app/AppUI";
import { useInfiniteList } from "@/hooks/useInfiniteList";
import { EASE } from "@/components/site/motion";

interface UsageEvent {
  id: string;
  type: "form_fill" | "cv_parse" | "text_enhance";
  domain: string | null;
  pageTitle: string | null;
  fieldCount: number;
  success: boolean;
  profileId: string | null;
  fillMode: string | null;
  createdAt: string;
  metadata?: {
    enhanceType?: string;
  };
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

type Filter = "all" | "form_fill" | "cv_parse" | "text_enhance";

const TYPE_LABEL: Record<string, string> = {
  form_fill: "Form fill",
  cv_parse: "Resume parse",
  text_enhance: "Text enhance",
};

const formatDate = (dateStr: string) =>
  new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

const getTimeAgo = (dateStr: string) => {
  const seconds = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return formatDate(dateStr);
};

function EventIcon({ type, success }: { type: string; success: boolean }) {
  const Icon =
    type === "cv_parse" ? FileText : type === "text_enhance" ? Wand2 : success ? CheckCircle2 : XCircle;
  return <Icon className="size-[18px]" strokeWidth={1.5} />;
}

export default function HistoryPage() {
  const [filter, setFilter] = useState<Filter>("all");

  const {
    items: events,
    total,
    loading,
    loadingMore,
    hasMore,
    error,
    sentinelRef,
    retry,
  } = useInfiniteList<UsageEvent>(
    async (page, limit) => {
      const params = new URLSearchParams({ page: String(page), limit: String(limit) });
      if (filter !== "all") params.append("type", filter);
      const response = await api.get(`/analytics/events?${params}`);
      const data = response.data.data || response.data;
      const pagination: Pagination | undefined = data.pagination;
      return { items: data.events || [], pages: pagination?.pages, total: pagination?.total };
    },
    filter,
  );

  return (
    <div>
      <PageHeader
        title="Form history"
        subtitle="Every form fill, resume parse and text enhancement, newest first."
        actions={
          <Segmented<Filter>
            id="history-filter"
            value={filter}
            onChange={setFilter}
            options={[
              { value: "all", label: "All" },
              { value: "form_fill", label: "Form fills" },
              { value: "cv_parse", label: "Resumes" },
              { value: "text_enhance", label: "Enhance" },
            ]}
          />
        }
      />

      <Panel>
        {loading ? (
          <div>
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex items-center gap-4 border-b border-line px-6 py-5 sm:px-7">
                <span className="size-10 animate-pulse rounded-[10px] bg-ink/[0.07]" />
                <div className="flex-1 space-y-2">
                  <span className="block h-4 w-48 animate-pulse rounded-md bg-ink/[0.07]" />
                  <span className="block h-3 w-32 animate-pulse rounded-md bg-ink/[0.05]" />
                </div>
              </div>
            ))}
          </div>
        ) : events.length === 0 ? (
          <EmptyState icon={<Zap />} title="Nothing here yet">
            Use the extension to fill a form and your history will appear here.
          </EmptyState>
        ) : (
          <div>
            {events.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: EASE, delay: (index % 10) * 0.03 }}
                className="flex items-center gap-4 border-b border-line px-6 py-5 transition-colors hover:bg-paper sm:px-7"
              >
                <span
                  className={`grid size-10 shrink-0 place-items-center rounded-[10px] ${
                    event.success ? "bg-tile-3 text-ink" : "bg-red-50 text-red-700"
                  }`}
                >
                  <EventIcon type={event.type} success={event.success} />
                </span>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="truncate text-[14.5px] text-ink">
                      {event.pageTitle ||
                        (event.type === "cv_parse"
                          ? "Resume parsed"
                          : event.type === "text_enhance"
                            ? "Text enhanced"
                            : "Form fill")}
                    </span>
                    <Badge tone="info">{TYPE_LABEL[event.type] || event.type}</Badge>
                  </div>
                  <div className="mt-1 flex flex-wrap gap-x-4 text-[13px] text-ink-mute">
                    {event.domain && <span>{event.domain}</span>}
                    {event.type === "form_fill" && event.fieldCount > 0 && (
                      <span>{event.fieldCount} fields</span>
                    )}
                    {event.fillMode && (
                      <span className="capitalize">{event.fillMode.replace("_", " ")}</span>
                    )}
                  </div>
                </div>

                <div className="shrink-0 text-right">
                  <div className="text-[13px] text-ink-soft">{getTimeAgo(event.createdAt)}</div>
                  <Badge tone={event.success ? "success" : "danger"} className="mt-1">
                    {event.success ? "Success" : "Failed"}
                  </Badge>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <InfiniteFooter
          sentinelRef={sentinelRef}
          loadingMore={loadingMore}
          hasMore={hasMore}
          error={error}
          count={events.length}
          total={total}
          onRetry={retry}
          noun="events"
        />
      </Panel>
    </div>
  );
}
