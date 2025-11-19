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

const BASE_URL = 'https://video.codelin.vip';
const desc = "凡人修仙传，仙逆，国漫，bilibili，腾讯，爱奇艺，资源，视频，电影，动漫，短剧，纪录片，美剧，泰剧，韩剧，体育，视频播放器，播放器";
const title = '视频影视播放器';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: title,
  description: desc,
  alternates: {
    canonical: BASE_URL,
    languages: {
      'zh-CN': BASE_URL,
    }
  },
  openGraph: {
    title: title,
    description: desc,
    url: BASE_URL,
    siteName: title,
    // images: [{ url: `${BASE_URL}/og.png` }]
  },
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
