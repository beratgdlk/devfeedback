import type { Metadata } from "next";
import "./globals.css";
import { NavBar } from "@/components/NavBar";

export const metadata: Metadata = {
  title: "DevFeedback - Yazılımcıların Bilgi Paylaşım Platformu",
  description: "Yazılımcılar için bilgi paylaşım ve geri bildirim platformu",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body className="bg-black text-white min-h-screen">
        <NavBar />
        <div className="pt-36">
          {children}
        </div>
      </body>
    </html>
  );
}
