import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "@/assets/styles/common/common.css"
import "@/assets/styles/common/commonFinance.css"

import RecoilProvider from "./ClientProviders";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { configImageURL } from "@/infrastructure/helper/helper";

export const metadata: Metadata = {
  title: 'FATS',
  description: '',
  openGraph: {
    type: "website",
    title: 'FATS',
    description: '',
    images: [`${configImageURL("idai-main-thumbnail")}`]
  }
}

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
      </head>
      <body>
        <RecoilProvider>
          <AntdRegistry>{children}</AntdRegistry>
        </RecoilProvider>
      </body>
    </html>
  );
}
