"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  History,
  Globe,
  CheckCircle2,
  XCircle,
  FileText,
  Wand2,
  Zap,
  ChevronLeft,
  ChevronRight,
  Filter,
  Calendar,
} from "lucide-react";
import api from "@/lib/api";

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

const EventTypeIcon = ({
  type,
  success,
}: {
  type: string;
  success: boolean;
}) => {
  if (type === "cv_parse") return <FileText className="w-5 h-5" />;
  if (type === "text_enhance") return <Wand2 className="w-5 h-5" />;
  return success ? (
    <CheckCircle2 className="w-5 h-5" />
  ) : (
    <XCircle className="w-5 h-5" />
  );
};

const EventTypeBadge = ({ type }: { type: string }) => {
  const config = {
    form_fill: { label: "Form Fill", color: "bg-blue-500/20 text-blue-400" },
    cv_parse: { label: "CV Parse", color: "bg-purple-500/20 text-purple-400" },
    text_enhance: {
      label: "Text Enhance",
      color: "bg-amber-500/20 text-amber-400",
    },
  };
  const { label, color } = config[type as keyof typeof config] || {
    label: type,
    color: "bg-white/10 text-white/70",
  };

  return (
    <span
      className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${color}`}
    >
      {label}
    </span>
  );
};

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

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

export default function HistoryPage() {
  const [events, setEvents] = useState<UsageEvent[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");
  const [page, setPage] = useState(1);

  const fetchEvents = async (pageNum: number, typeFilter: string) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: pageNum.toString(),
        limit: "15",
      });
      if (typeFilter !== "all") {
        params.append("type", typeFilter);
      }

      const response = await api.get(`/analytics/events?${params}`);
      const data = response.data.data || response.data;
      setEvents(data.events || []);
      setPagination(data.pagination || null);
    } catch (err) {
      console.error("Failed to fetch events:", err);
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents(page, filter);
  }, [page, filter]);

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
    setPage(1);
  };

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-brand-accent text-xs font-bold uppercase tracking-[0.3em]">
          <History className="w-4 h-4" />
          Data Archives
        </div>
        <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tighter leading-none">
          Form History<span className="text-white/70">.</span>
        </h1>
        <p className="text-xl text-white/80 font-light max-w-4xl">
          Review your historical precision mapping and data population events.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 text-white/60">
          <Filter className="w-4 h-4" />
          <span className="text-xs font-bold uppercase tracking-wider">
            Filter:
          </span>
        </div>
        {["all", "form_fill", "cv_parse", "text_enhance"].map((type) => (
          <button
            key={type}
            onClick={() => handleFilterChange(type)}
            className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
              filter === type
                ? "bg-white text-black"
                : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
            }`}
          >
            {type === "all" ? "All" : type.replace("_", " ")}
          </button>
        ))}
      </div>

      {/* Events List */}
      <div className="glassmorphic rounded-[40px] overflow-hidden">
        {loading ? (
          <div className="p-8 space-y-4">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 p-4 bg-white/[0.02] rounded-2xl animate-pulse"
                >
                  <div className="w-12 h-12 rounded-xl bg-white/10" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-48 bg-white/10 rounded" />
                    <div className="h-3 w-32 bg-white/5 rounded" />
                  </div>
                  <div className="h-6 w-20 bg-white/10 rounded-full" />
                </div>
              ))}
          </div>
        ) : events.length === 0 ? (
          <div className="p-20 text-center space-y-6">
            <div className="w-20 h-20 bg-white/[0.03] border border-white/[0.05] rounded-3xl mx-auto flex items-center justify-center">
              <Zap className="w-10 h-10 text-white/60" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-white tracking-tight">
                No Events Yet
              </h2>
              <p className="text-white/80 font-light italic max-w-4xl mx-auto">
                Start using the extension to fill forms and your history will
                appear here.
              </p>
            </div>
          </div>
        ) : (
          <div className="divide-y divide-white/[0.05]">
            {events.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center gap-4 p-6 hover:bg-white/[0.02] transition-colors"
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    event.success
                      ? "bg-emerald-500/10 text-emerald-500"
                      : "bg-red-500/10 text-red-500"
                  }`}
                >
                  <EventTypeIcon type={event.type} success={event.success} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-sm font-semibold text-white truncate">
                      {event.pageTitle ||
                        (event.type === "cv_parse"
                          ? "CV Parsed"
                          : event.type === "text_enhance"
                            ? "Text Enhanced"
                            : "Form Fill")}
                    </h3>
                    <EventTypeBadge type={event.type} />
                  </div>
                  <div className="flex items-center gap-4 text-[11px] text-white/60">
                    {event.domain && (
                      <span className="flex items-center gap-1">
                        <Globe className="w-3 h-3" />
                        {event.domain}
                      </span>
                    )}
                    {event.type === "form_fill" && event.fieldCount > 0 && (
                      <span>{event.fieldCount} fields</span>
                    )}
                    {event.fillMode && (
                      <span className="capitalize">
                        {event.fillMode.replace("_", " ")}
                      </span>
                    )}
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="flex items-center gap-2 text-xs text-white/80">
                    <Calendar className="w-3 h-3" />
                    {getTimeAgo(event.createdAt)}
                  </div>
                  <div
                    className={`text-[10px] mt-1 ${event.success ? "text-emerald-500" : "text-red-500"}`}
                  >
                    {event.success ? "Success" : "Failed"}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {pagination && pagination.pages > 1 && (
          <div className="flex items-center justify-between p-6 border-t border-white/[0.05]">
            <div className="text-xs text-white/60">
              Showing {(pagination.page - 1) * pagination.limit + 1} -{" "}
              {Math.min(pagination.page * pagination.limit, pagination.total)}{" "}
              of {pagination.total}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={pagination.page === 1}
                className="p-2 rounded-lg bg-white/5 text-white/70 hover:bg-white/10 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <div className="flex items-center gap-1">
                {Array.from(
                  { length: Math.min(5, pagination.pages) },
                  (_, i) => {
                    let pageNum;
                    if (pagination.pages <= 5) {
                      pageNum = i + 1;
                    } else if (pagination.page <= 3) {
                      pageNum = i + 1;
                    } else if (pagination.page >= pagination.pages - 2) {
                      pageNum = pagination.pages - 4 + i;
                    } else {
                      pageNum = pagination.page - 2 + i;
                    }
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setPage(pageNum)}
                        className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${
                          pagination.page === pageNum
                            ? "bg-white text-black"
                            : "bg-white/5 text-white/70 hover:bg-white/10"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  },
                )}
              </div>
              <button
                onClick={() =>
                  setPage((p) => Math.min(pagination.pages, p + 1))
                }
                disabled={pagination.page === pagination.pages}
                className="p-2 rounded-lg bg-white/5 text-white/70 hover:bg-white/10 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
