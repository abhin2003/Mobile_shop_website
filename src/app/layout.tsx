import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Shree Sadguru Mobiles | Trusted Mobile Store Since 2012",
  description:
    "Shree Sadguru Mobiles — Your trusted mobile store since 2012. Shop the latest smartphones from Apple, Samsung, OnePlus, Vivo, Redmi & more. Best prices, genuine products, and expert guidance by owner Bharat Shinde.",
  keywords: [
    "mobile shop",
    "smartphones",
    "Shree Sadguru Mobiles",
    "Apple",
    "Samsung",
    "OnePlus",
    "Vivo",
    "Redmi",
    "Realme",
    "Oppo",
    "mobile accessories",
    "mobile exchange",
    "Bharat Shinde",
  ],
  authors: [{ name: "Bharat Shinde" }],
  openGraph: {
    title: "Shree Sadguru Mobiles | Trusted Mobile Store Since 2012",
    description:
      "Your one-stop destination for the latest smartphones, accessories & mobile solutions. Serving customers with trust and excellence since 2012.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
