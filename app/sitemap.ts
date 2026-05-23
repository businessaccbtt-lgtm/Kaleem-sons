import { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://kaleem-sons-puce.vercel.app", lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: "https://kaleem-sons-puce.vercel.app/t-shirts", lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: "https://kaleem-sons-puce.vercel.app/hoodies", lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: "https://kaleem-sons-puce.vercel.app/track-suits", lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: "https://kaleem-sons-puce.vercel.app/karate", lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: "https://kaleem-sons-puce.vercel.app/jiu-jitsu", lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: "https://kaleem-sons-puce.vercel.app/new-in", lastModified: new Date(), changeFrequency: "daily", priority: 0.8 },
    { url: "https://kaleem-sons-puce.vercel.app/shop", lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: "https://kaleem-sons-puce.vercel.app/contact", lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
  ]
}