import type { Metadata } from "next";
import "./globals.css";

import { Providers } from "./providers";
import { CartProvider } from "@/context/CartContext";

import CartSidebar from "@/components/CartSidebar";
import AuthModal from "@/components/AuthModal";
import WhatsAppButton from "@/components/WhatsAppButton";

import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  // ✅ Title with template for inner pages
  title: {
    default: "Kaleem Sons | Premium Sportswear & Martial Arts Apparel",
    template: "%s | Kaleem Sons",
  },

  // ✅ Rich description with global + bulk keywords
  description:
    "Kaleem Sons offers premium sportswear, hoodies, tracksuits, karate gi, and BJJ apparel. Worldwide shipping available. Bulk & wholesale orders welcome. Quality Pakistani craftsmanship for global athletes.",

  // ✅ Keywords targeting global + bulk + categories
  keywords: [
    "kaleem sons",
    "Pakistani sportswear",
    "karate gi wholesale",
    "BJJ gi bulk order",
    "martial arts apparel Pakistan",
    "tracksuits manufacturer Pakistan",
    "hoodies bulk order",
    "sportswear wholesale Pakistan",
    "custom martial arts uniforms",
    "karate uniform supplier",
    "jiu jitsu gi manufacturer",
    "premium hoodies Pakistan",
    "bulk sportswear order",
    "wholesale athletic wear",
    "Pakistan clothing manufacturer",
    "Sialkot sportswear",
    "export quality sportswear",
    "gym wear Pakistan",
    "athletic apparel wholesale",
  ],

  // ✅ Base URL for all OG images
  metadataBase: new URL("https://kaleem-sons-puce.vercel.app"),

  // ✅ Open Graph (Facebook, WhatsApp, LinkedIn previews)
  openGraph: {
    title: "Kaleem Sons | Premium Sportswear & Martial Arts Apparel",
    description:
      "Premium sportswear, hoodies, tracksuits, karate & BJJ apparel. Worldwide shipping. Bulk orders welcome. Quality from Pakistan to the world.",
    url: "https://kaleem-sons-puce.vercel.app",
    siteName: "Kaleem Sons",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Kaleem Sons Premium Sportswear",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  // ✅ Twitter/X card
  twitter: {
    card: "summary_large_image",
    title: "Kaleem Sons | Premium Sportswear & Martial Arts Apparel",
    description:
      "Premium sportswear, hoodies, tracksuits, karate & BJJ apparel. Worldwide shipping. Bulk orders welcome.",
    images: ["/og-image.jpg"],
  },

  // ✅ Robots — allow full indexing
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // ✅ Canonical URL
  alternates: {
    canonical: "https://kaleem-sons-puce.vercel.app",
  },

  // ✅ App info
  applicationName: "Kaleem Sons",
  category: "Shopping",

  // ✅ Authors
 // ✅ Authors
  authors: [{ name: "Kaleem Sons", url: "https://kaleem-sons-puce.vercel.app" }],
  creator: "Kaleem Sons",
  publisher: "Kaleem Sons",

  // ✅ Favicon
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // ✅ JSON-LD Structured Data
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      // Organization
      {
        "@type": "Organization",
        "@id": "https://kaleem-sons-puce.vercel.app/#organization",
        name: "Kaleem Sons",
        url: "https://kaleem-sons-puce.vercel.app",
        logo: {
          "@type": "ImageObject",
          url: "https://kaleem-sons-puce.vercel.app/logo.png",
        },
        description:
          "Premium sportswear, martial arts apparel, hoodies, tracksuits and BJJ gi manufacturer. Worldwide shipping and bulk orders welcome.",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Sialkot",
          addressRegion: "Punjab",
          addressCountry: "PK",
        },
        contactPoint: [
          {
            "@type": "ContactPoint",
            contactType: "customer service",
            availableLanguage: ["English", "Urdu"],
          },
          {
            "@type": "ContactPoint",
            contactType: "sales",
            contactOption: "TollFree",
            availableLanguage: ["English", "Urdu"],
          },
        ],
        sameAs: [],
      },
      // Website
      {
        "@type": "WebSite",
        "@id": "https://kaleem-sons-puce.vercel.app/#website",
        url: "https://kaleem-sons-puce.vercel.app",
        name: "Kaleem Sons",
        publisher: {
          "@id": "https://kaleem-sons-puce.vercel.app/#organization",
        },
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate:
              "https://kaleem-sons-puce.vercel.app/shop?q={search_term_string}",
          },
          "query-input": "required name=search_term_string",
        },
      },
      // Store
      {
        "@type": "Store",
        "@id": "https://kaleem-sons-puce.vercel.app/#store",
        name: "Kaleem Sons",
        url: "https://kaleem-sons-puce.vercel.app",
        image: "https://kaleem-sons-puce.vercel.app/og-image.jpg",
        description:
          "Premium sportswear and martial arts apparel. Bulk and wholesale orders welcome. Worldwide shipping.",
        priceRange: "PKR 3,500 - PKR 15,000",
        currenciesAccepted: "PKR, USD",
        paymentAccepted: "Cash, JazzCash, Easypaisa, Bank Transfer",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Sialkot",
          addressRegion: "Punjab",
          addressCountry: "PK",
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Kaleem Sons Collection",
          itemListElement: [
            { "@type": "Offer", itemOffered: { "@type": "Product", name: "T-Shirts" } },
            { "@type": "Offer", itemOffered: { "@type": "Product", name: "Hoodies" } },
            { "@type": "Offer", itemOffered: { "@type": "Product", name: "Tracksuits" } },
            { "@type": "Offer", itemOffered: { "@type": "Product", name: "Karate Gi" } },
            { "@type": "Offer", itemOffered: { "@type": "Product", name: "BJJ Gi" } },
          ],
        },
      },
    ],
  };

  return (
    <html lang="en">
      <head>
        
        {/* ✅ JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* ✅ Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
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
            <TopBar />
            <Navbar />
            <main>{children}</main>
            <Footer />
            <CartSidebar />
            <AuthModal />
            <WhatsAppButton />
          </CartProvider>
        </Providers>
      </body>
    </html>
  );
}