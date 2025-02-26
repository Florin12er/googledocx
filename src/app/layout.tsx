import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next/app";

import "@liveblocks/react-ui/styles.css";
import "@liveblocks/react-tiptap/styles.css";
import "./globals.css";
import ConvexClientProvider from "@/components/ui/convex-client-provider";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Document Manager Tool",
  description: "This is an document manager tool inspired by google docs",
};
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NuqsAdapter>
          <ConvexClientProvider>{children}</ConvexClientProvider>
          <Toaster />
        </NuqsAdapter>
      </body>
    </html>
  );
}
