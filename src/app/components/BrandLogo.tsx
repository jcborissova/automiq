import Image from "next/image";

const wordmarks = {
  dark: {
    src: "/assets/logos/brand/automiq-wordmark-navbar.png",
    width: 3147,
    height: 1051,
  },
  light: {
    src: "/assets/logos/brand/automiq-wordmark-light.png",
    width: 3085,
    height: 1051,
  },
} as const;

const marks = {
  orange: {
    src: "/assets/logos/brand/automiq-submark-orange.png",
    width: 813,
    height: 793,
  },
  dark: {
    src: "/assets/logos/brand/automiq-submark-dark.png",
    width: 779,
    height: 779,
  },
} as const;

type BrandLogoProps = {
  theme?: keyof typeof wordmarks;
  alt?: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
};

type BrandMarkProps = {
  tone?: keyof typeof marks;
  alt?: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
};

export default function BrandLogo({
  theme = "dark",
  alt = "AutomIQ",
  className = "h-10 w-auto",
  priority = false,
  sizes = "(max-width: 640px) 120px, 160px",
}: BrandLogoProps) {
  const asset = wordmarks[theme];

  return (
    <Image
      src={asset.src}
      alt={alt}
      width={asset.width}
      height={asset.height}
      priority={priority}
      sizes={sizes}
      className={className}
    />
  );
}

export function BrandMark({
  tone = "orange",
  alt = "AutomIQ",
  className = "h-10 w-auto",
  priority = false,
  sizes = "(max-width: 640px) 40px, 56px",
}: BrandMarkProps) {
  const asset = marks[tone];

  return (
    <Image
      src={asset.src}
      alt={alt}
      width={asset.width}
      height={asset.height}
      priority={priority}
      sizes={sizes}
      className={className}
    />
  );
}
