import { CtaBar } from "./SiteButton";
import { CHROME_URL, EDGE_URL } from "./motion";

function ChromeGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className="size-6 shrink-0">
      <circle cx="12" cy="12" r="9.25" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M12 8.5h8.2M8.97 13.75 4.9 6.7M15.03 13.75 11 20.7"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function EdgeGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className="size-6 shrink-0">
      <path
        d="M20.8 14.2c-.9 4-4.4 6.8-8.6 6.8a8.9 8.9 0 0 1-8.9-8.9C3.3 7 7.2 3 12.2 3c4.6 0 8.6 3.3 8.6 7.6 0 2.5-2 4.2-4.6 4.2-2.1 0-3.3-1-3.3-2.2 0-.6.4-1 .4-1.9 0-1.6-1.4-2.6-3.1-2.6-2.4 0-4 2-4 4.3 0 4 3.6 6.9 7.9 6.9"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Equal-weight install buttons for both supported browsers. */
export default function BrowserCtas({
  layout = "row",
  className = "",
}: {
  /** "stack" keeps one button per row; "row" pairs them on wide screens. */
  layout?: "stack" | "row";
  className?: string;
}) {
  return (
    <div
      className={`grid gap-4 lg:gap-5 ${
        layout === "row" ? "sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2" : ""
      } ${className}`}
    >
      <CtaBar href={CHROME_URL} external icon={<ChromeGlyph />}>
        Add to Chrome
      </CtaBar>
      <CtaBar href={EDGE_URL} external icon={<EdgeGlyph />} tone="white">
        Add to Edge
      </CtaBar>
    </div>
  );
}
