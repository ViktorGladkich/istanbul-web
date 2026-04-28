import Image, { type ImageProps } from "next/image";
import blurMap from "@/lib/generated/blur-map.json";

const MAP = blurMap as Record<string, string>;

/**
 * Drop-in replacement for next/image that auto-attaches a base64 blur
 * placeholder for any /public/images/* src. Falls back to the regular
 * Image (no placeholder) for remote URLs or unmapped paths.
 */
export function BlurImage(props: ImageProps) {
  const src = typeof props.src === "string" ? props.src : null;
  const blur = src ? MAP[src] : undefined;

  if (!blur) {
    return <Image {...props} />;
  }

  return <Image {...props} placeholder="blur" blurDataURL={blur} />;
}
