import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Immersion tracker",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#0c0d11]">
        <SidebarProvider>
          <Sidebar>
            <SidebarHeader>
              <div className="flex items-center justify-center gap-x-2">
                <div className="bg-gradient-to-r from-[#8b7bff] to-[#6a57e6] rounded-sm w-7 h-7 flex items-center justify-center text-white font-bold">
                  没
                </div>
                <p className="text-white text-lg font-bold">Immerse</p>
              </div>
            </SidebarHeader>
            <SidebarContent>content</SidebarContent>
          </Sidebar>
          <SidebarTrigger />
          <main>{children}</main>
        </SidebarProvider>
      </body>
    </html>
  );
}
