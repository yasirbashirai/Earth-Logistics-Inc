import type { Metadata } from "next";

const SITE_URL = "https://earthlogistics247.com";
const DEFAULT_OG = "/og-image.jpg";

function toAbsolute(src: string) {
  if (src.startsWith("http")) return src;
  return `${SITE_URL}${src.startsWith("/") ? "" : "/"}${src}`;
}

export function pageMeta({
  title,
  description,
  path,
  image = DEFAULT_OG,
  keywords,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
  keywords?: string[];
}): Metadata {
  const url = `${SITE_URL}${path}`;
  const ogImage = toAbsolute(image);
  return {
    title,
    description,
    keywords,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: "Earth Logistics Inc",
      type: "website",
      locale: "en_US",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
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
  };
}
