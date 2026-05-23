import type { Metadata } from "next";
import "./globals.css";

import { Providers } from "./providers";
import { CartProvider } from "@/context/CartContext";

import CartSidebar from "@/components/CartSidebar";
import AuthModal from "@/components/AuthModal";
import WhatsAppButton from "@/components/WhatsAppButton";

// ✅ Updated Imports
import TopBar from "@/components/TopBar";     // ← Added
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Kaleem Sons",
  description: "Elegant Design. Smart Solutions.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600&family=Prata&family=Montserrat:wght@800;900&family=Bebas+Neue&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0,1"
        />
      </head>

      <body className="font-inter bg-white text-[#1F1F1F]">

        <Providers>
          <CartProvider>

            {/* ✅ TOP BAR - Now on the very top */}
            <TopBar />

            {/* ✅ GLOBAL NAVBAR */}
            <Navbar />

            {/* ✅ PAGE CONTENT */}
            <main>{children}</main>

            {/* ✅ GLOBAL FOOTER */}
            <Footer />

            {/* ✅ GLOBAL COMPONENTS */}
            <CartSidebar />
            <AuthModal />
            <WhatsAppButton />

          </CartProvider>
        </Providers>

      </body>
    </html>
  );
}