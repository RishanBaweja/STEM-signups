import type { Metadata } from "next";
import "./globals.css";

//! Update metadata to match your project
export const metadata: Metadata = {
  title: "STEM Signups",
  description: "Description Placeholder", // TODO: Replace placeholder description
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
