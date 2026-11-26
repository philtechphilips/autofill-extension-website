"use client";

import { ReactNode, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { LogOut, type LucideIcon } from "lucide-react";
import { Wordmark } from "@/components/site/Primitives";
import { EASE } from "@/components/site/motion";

export type NavItem = { href: string; icon: LucideIcon; label: string };

function initials(name?: string, email?: string) {
  const source = name?.trim() || email || "U";
  const parts = source.split(/\s+/);
  return ((parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? "")).toUpperCase() || "U";
}

function NavLinks({
  items,
  pathname,
  onNavigate,
  layoutId,
}: {
  items: NavItem[];
  pathname: string;
  onNavigate?: () => void;
  layoutId: string;
}) {
  return (
    <nav className="space-y-1">
      {items.map(({ href, icon: Icon, label }) => {
        const active = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            onClick={onNavigate}
            className={`relative flex h-11 items-center gap-3 rounded-[10px] px-3 text-[15px] transition-colors duration-300 ${
              active ? "text-ink" : "text-ink-soft hover:bg-ink/[0.04] hover:text-ink"
            }`}
          >
            {active && (
              <motion.span
                layoutId={layoutId}
                className="absolute inset-0 rounded-[10px] bg-tile-2"
                transition={{ type: "spring", stiffness: 420, damping: 38 }}
              />
            )}
            <Icon className="relative size-[18px]" strokeWidth={1.5} />
            <span className="relative">{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

export default function AppShell({
  items,
  user,
  badge,
  onLogout,
  children,
}: {
  items: NavItem[];
  user?: { name?: string; email?: string } | null;
  badge?: string;
  onLogout: () => void;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const userCard = (
    <div className="rounded-2xl bg-tile-3 p-4">
      <div className="flex items-center gap-3">
        <span className="grid size-10 shrink-0 place-items-center rounded-full bg-tile-1 text-[13px] text-ink">
          {initials(user?.name, user?.email)}
        </span>
        <div className="min-w-0">
          <div className="truncate text-[14px] text-ink">{user?.name || "User"}</div>
          <div className="truncate text-[12.5px] text-ink-mute">{user?.email}</div>
        </div>
      </div>
      <button
        onClick={onLogout}
        className="mt-4 flex h-10 w-full items-center justify-center gap-2 rounded-[10px] bg-white text-[14px] text-ink transition-colors hover:bg-paper"
      >
        <LogOut className="size-4" strokeWidth={1.5} />
        Log out
      </button>
    </div>
  );

  return (
    <div className="site min-h-screen">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 hidden w-[264px] flex-col border-r border-line bg-paper px-4 pb-4 pt-6 lg:flex">
        <div className="flex items-center justify-between px-2">
          <Link href="/" aria-label="AutoFill AI home">
            <Wordmark size={30} />
          </Link>
          {badge && (
            <span className="rounded-md bg-tile-warm px-2 py-1 text-[12px] text-ink">{badge}</span>
          )}
        </div>
        <div className="mt-10 flex-1">
          <NavLinks items={items} pathname={pathname} layoutId="app-nav" />
        </div>
        {userCard}
      </aside>

      {/* Mobile top bar */}
      <header className="fixed inset-x-0 top-0 z-50 flex h-16 items-center justify-between border-b border-line bg-paper/90 px-5 backdrop-blur-xl lg:hidden">
        <Link href="/" aria-label="AutoFill AI home">
          <Wordmark size={28} />
        </Link>
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          className="grid size-10 place-items-center rounded-[10px] text-ink hover:bg-ink/[0.05]"
        >
          <span className="relative block h-3 w-[18px]">
            <motion.span
              className="absolute left-0 top-0 h-[1.5px] w-full rounded-full bg-current"
              animate={open ? { y: 5.25, rotate: 45 } : { y: 0, rotate: 0 }}
              transition={{ duration: 0.4, ease: EASE }}
            />
            <motion.span
              className="absolute bottom-0 left-0 h-[1.5px] w-full rounded-full bg-current"
              animate={open ? { y: -5.25, rotate: -45 } : { y: 0, rotate: 0 }}
              transition={{ duration: 0.4, ease: EASE }}
            />
          </span>
        </button>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="fixed inset-0 z-40 flex flex-col bg-paper px-5 pb-6 pt-20 lg:hidden"
          >
            <div className="flex-1">
              <NavLinks
                items={items}
                pathname={pathname}
                onNavigate={() => setOpen(false)}
                layoutId="app-nav-mobile"
              />
            </div>
            {userCard}
          </motion.div>
        )}
      </AnimatePresence>

      <main className="pt-16 lg:ml-[264px] lg:pt-0">
        <motion.div
          key={pathname}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mx-auto max-w-[1180px] px-5 py-8 sm:px-8 lg:px-12 lg:py-12"
        >
          {children}
        </motion.div>
      </main>
    </div>
  );
}

export function FullPageSpinner() {
  return (
    <div className="site grid min-h-screen place-items-center">
      <span className="size-7 animate-spin rounded-full border-2 border-ink/15 border-t-ink" />
    </div>
  );
}
