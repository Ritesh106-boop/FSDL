import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "gitlearn — Interactive Git Tutorial",
  description: "Learn Git version control interactively.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
