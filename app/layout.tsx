import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";

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
  icons: {
    icon: "/favicon.png",
    apple: "/logo.png",
  },
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
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#1560BD",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased">
        <Toaster richColors position="top-center" theme="dark" />
        {children}
      </body>
    </html>
  );
}
