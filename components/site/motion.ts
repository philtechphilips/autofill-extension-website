// Shared motion language for the public site.
// One easing curve, a few durations — consistency is what makes motion feel calm.

export const EASE = [0.22, 1, 0.36, 1] as const;

export const DURATION = {
  fast: 0.35,
  base: 0.7,
  slow: 0.95,
} as const;

/** Trigger reveals slightly before an element reaches the viewport bottom. */
export const VIEWPORT = { once: true, margin: "0px 0px -12% 0px" } as const;

export const CHROME_URL =
  "https://chromewebstore.google.com/detail/Autofill.Ai/hdgpkgjdemnphbknlndiloffnocnmfhd";
export const EDGE_URL =
  "https://microsoftedge.microsoft.com/addons/detail/pnpokgabjdolinkjcpdegjlgemommjic";
export const GITHUB_URL =
  "https://github.com/philtechphilips/autofill-chrome-extension";
export const X_URL = "https://x.com/ai_autofill";
