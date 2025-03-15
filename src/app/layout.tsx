import "@/app/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ClientBody from "@/app/ClientBody"; // Fixed to use default import

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Maestro - Explore",
  description: "Explore conversations with experts and thought leaders.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white antialiased`}>
        <ClientBody>{children}</ClientBody>
      </body>
    </html>
  );
}
