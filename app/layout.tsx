import type { Metadata, Viewport } from "next";
import { Geist, Newsreader } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--font-newsreader",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AutoFill AI – Smart Chrome Extension for Instant Form Filling",
  description:
    "Automatically fill online forms in seconds. Save time on job applications, signups, and checkout forms with AutoFill AI. Secure, fast, and privacy-first.",
  keywords: [
    "form autofill",
    "chrome extension",
    "autofill",
    "form filler",
    "job applications",
    "productivity",
    "AI",
  ],
  authors: [{ name: "AutoFill AI Team" }],
  openGraph: {
    title: "AutoFill AI – Stop Filling Forms, Start Moving Faster",
    description:
      "AutoFill AI completes repetitive online forms in seconds — securely, accurately, and automatically.",
    type: "website",
    url: "https://autofillai.com",
    images: ["/logo.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "AutoFill AI – Smart Chrome Extension for Instant Form Filling",
    description:
      "Automatically fill online forms in seconds. Save time on job applications, signups, and checkout forms.",
    images: ["/logo.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#fbfaf7",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`scroll-smooth ${geist.variable} ${newsreader.variable}`}
    >
      <body className="antialiased">
        <Toaster richColors position="top-center" theme="light" />
        {children}
      </body>
    </html>
  );
}
