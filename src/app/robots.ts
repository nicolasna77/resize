import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/image/", "/document/"],
        disallow: [
          "/api/",
          "/_next/",
          "/static/",
          "/*.json$",
          "/*.js$",
          "/*.css$",
        ],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        crawlDelay: 2,
      },
    ],
    sitemap: "https://resize2.vercel.app/sitemap.xml",
    host: "https://resize2.vercel.app",
  };
}
