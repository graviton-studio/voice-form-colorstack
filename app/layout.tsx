import type React from "react";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ConvexClientProvider from "./ConvexClientProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "VoiceForm - Answer Forms with Your Voice",
  description: "Transform any online form into an interactive voice experience",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ConvexClientProvider>
        <body className={inter.className}>{children}</body>
      </ConvexClientProvider>
    </html>
  );
}

import "./globals.css";
