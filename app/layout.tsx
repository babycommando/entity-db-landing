import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>EntityDB - Local Ai Memory In Your Browser</title>
        <meta
          name="description"
          content="Storing Vector Embeddings In The Browser wrapping indexedDB and Transformers.js"
        />

        {/* <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="0xEntity - The Ai Entities Repository"
        />
        <meta
          property="og:description"
          content="A decentralized reservoir of Ai entity seeds that embodies large language models based on Interplanetary File System."
        />
        <meta property="og:url" content="https://0xentity.vercel.app" />
        <meta
          property="og:image"
          content="https://0xentity.vercel.app/1200x630OG-entity.png"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="en_US" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="0xEntity - The Ai Entities Repository"
        />
        <meta
          name="twitter:description"
          content="A decentralized reservoir of Ai entity seeds that embodies large language models based on Interplanetary File System."
        />
        <meta
          name="twitter:image"
          content="https://0xentity.vercel.app/1200x630OG-entity.png"
        /> */}
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
