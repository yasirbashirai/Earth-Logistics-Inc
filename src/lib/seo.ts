import type { Metadata } from "next";

export function pageMeta({
  title,
  description,
  path,
  image = "/logo.png",
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
}): Metadata {
  const url = `https://earthlogistics247.com${path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "website",
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
