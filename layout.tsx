import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { StorefrontShell } from "@/components/mah-beauty-shell";

export const metadata: Metadata = {
  title: "MahBeauty — The soft side of beauty",
  description: "Thoughtful beauty essentials for your everyday ritual.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <StorefrontShell>{children}</StorefrontShell>
      </body>
    </html>
  );
}
