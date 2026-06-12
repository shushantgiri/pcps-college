import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AppLoader from "@/components/ApplLoader";

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
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen flex flex-col bg-white text-gray-900" style={{ fontFamily: "'Inter', sans-serif" }}>
        <AppLoader>
          <Navbar />
          <main className="flex-1 mt-[72px]">{children}</main>
          <Footer />
        </AppLoader>
      </body>
    </html>
  );
}