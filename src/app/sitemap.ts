import type { MetadataRoute } from "next";
import { services } from "@/data/services";
import { blogPosts } from "@/data/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://earthlogistics247.com";
  const now = new Date();
  const top = [
    "",
    "/about",
    "/services",
    "/quote",
    "/contact",
    "/carriers",
    "/shippers",
    "/agents",
    "/industries",
    "/coverage",
    "/reviews",
    "/blog",
  ];
  const serviceRoutes = services.map((s) => `/services/${s.slug}`);
  const blogRoutes = blogPosts.map((p) => `/blog/${p.slug}`);
  return [...top, ...serviceRoutes, ...blogRoutes].map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.7,
  }));
}
