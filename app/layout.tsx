import type { Metadata } from "next";
import "./globals.css";
import "./mobile-image-flow.css";
export const metadata: Metadata = {
  title: { default: "The Body Wedge — Patented Psoas & Core Self-Massage Tool", template: "%s | The Body Wedge" },
  description: "Meet The Body Wedge: a patented tool for psoas and deep abdominal self-massage. Watch the demonstration, compare sizes and densities, and shop directly from The Body Wedge.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};
export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return <html lang="en"><body>{children}</body></html>;
}
