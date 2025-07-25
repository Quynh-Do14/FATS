import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "@/assets/styles/common/common.css"
import "@/assets/styles/common/commonFinance.css"
import RecoilProvider from "./ClientProviders";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { configImageURL } from "@/infrastructure/helper/helper";
import Script from "next/script";

export const metadata: Metadata = {
  title: 'FATS',
  description: 'Quản lý tài chính thông minh với AI',
  openGraph: {
    type: "website",
    title: 'FATS',
    description: 'Quản lý tài chính thông minh với AI',
    images: [`${configImageURL("thumbnail-fats.png")}`]
  }
}
const GA_TRACKING_ID = "G-QW7W25VKJ3";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&display=swap" rel="stylesheet" />
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_TRACKING_ID}');
        `}
        </Script>
      </head>
      <body>
        <RecoilProvider>
          <AntdRegistry>{children}</AntdRegistry>
        </RecoilProvider>
      </body>
    </html>
  );
}
