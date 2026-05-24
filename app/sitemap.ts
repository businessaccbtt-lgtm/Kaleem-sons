import { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://kaleemsons.com", lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: "https://kaleemsons.com/t-shirts", lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: "https://kaleemsons.com/hoodies", lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: "https://kaleemsons.com/track-suits", lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: "https://kaleemsons.com/karate", lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: "https://kaleemsons.com/jiu-jitsu", lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: "https://kaleemsons.com/new-in", lastModified: new Date(), changeFrequency: "daily", priority: 0.8 },
    { url: "https://kaleemsons.com/shop", lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: "https://kaleemsons.com", lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
  ]
}