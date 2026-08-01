import { Playfair_Display, Inter, Prata, Montserrat, Bebas_Neue } from "next/font/google"

export const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair",
  display: "swap",
})

export const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
})

export const prata = Prata({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-prata",
  display: "swap",
})

export const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["800", "900"],
  variable: "--font-montserrat",
  display: "swap",
})

export const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-bebas",
  display: "swap",
})