import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SWRegister from "./components/sw-register";
import Footer from "./components/footer";
import LoadingBar from "./components/loading-bar";
import { Suspense } from "react";
import { GoogleAnalytics } from "@next/third-parties/google";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "视频影视浏览器",
  description: "视频，电影，动漫，短剧，纪录片，美剧，泰剧，韩剧，体育",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/dplayer@1.27.1/dist/DPlayer.min.css" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SWRegister />
        <Suspense fallback={null}>
          <LoadingBar />
        </Suspense>
        <div className="background-container">
          <div className="background-overlay"></div>
          <div className="content-wrapper flex flex-col min-h-screen">
            {children}
            <Footer />
          </div>
        </div>
      </body>
      <GoogleAnalytics gaId="G-L1S92GG6WK" />
    </html>
  );
}
