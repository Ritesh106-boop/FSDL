import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Student Portfolio — MERN",
  description: "Full-stack student portfolio with CRUD operations",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
