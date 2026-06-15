import Image from "next/image";
import type { SiteImage } from "@/config/content/images";
import { cn } from "@/lib/utils";

type PlaceholderImageProps = {
  image: SiteImage;
  priority?: boolean;
  className?: string;
  imageClassName?: string;
  aspect?: "video" | "square" | "portrait" | "wide";
  showCaption?: boolean;
  flush?: boolean;
};

const aspectClasses = {
  video: "aspect-video",
  square: "aspect-square",
  portrait: "aspect-[4/5]",
  wide: "aspect-[16/10]",
};

export function PlaceholderImage({
  image,
  priority = false,
  className,
  imageClassName,
  aspect = "video",
  showCaption = false,
  flush = false,
}: PlaceholderImageProps) {
  return (
    <figure className={cn("relative", className)}>
      <div
        className={cn(
          "relative overflow-hidden bg-muted",
          !flush && "surface-image",
          aspectClasses[aspect],
        )}
      >
        <Image
          src={image.src}
          alt={image.alt}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
          className={cn("object-cover", imageClassName)}
        />
      </div>
      {showCaption && image.caption && (
        <figcaption className="mt-2 text-xs text-muted-foreground">{image.caption}</figcaption>
      )}
    </figure>
  );
}
