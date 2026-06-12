import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AppLoader from "@/components/ApplLoader";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "PCPS College – The Most Career Focused UK Degree in Nepal",
  description:
    "PCPS College offers internationally recognised UK undergraduate programmes in Software Engineering, Business Management, Business Analytics, and Digital Marketing in partnership with the University of Bedfordshire.",
  keywords: ["PCPS", "Patan College", "UK Degree Nepal", "Software Engineering Nepal"],
  openGraph: {
    title: "PCPS College",
    description: "The Most Career Focused UK Degree in Nepal.",
    siteName: "PCPS College",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <body className="min-h-screen flex flex-col bg-white text-gray-900">
        <AppLoader>
          <Navbar />
          <main className="flex-1 mt-[72px]">{children}</main>
          <Footer />
        </AppLoader>
      </body>
    </html>
  );
}