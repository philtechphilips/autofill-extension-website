import { ReactNode } from "react";

/** Shared input styling for every form on the site and in the app. */
export const fieldClass =
  "block h-12 w-full rounded-[10px] bg-white px-4 text-[15px] text-ink ring-1 ring-inset ring-line placeholder:text-ink-mute/70 " +
  "transition-[box-shadow] duration-300 focus:outline-none focus:ring-2 focus:ring-ink disabled:opacity-60";

export function FieldLabel({ children }: { children: ReactNode }) {
  return <span className="mb-2 block text-[14px] text-ink">{children}</span>;
}
