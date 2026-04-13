import Image from "next/image";
import { cn } from "@/lib/utils";

type Props = {
  src: string;
  alt: string;
  className?: string;
  fill?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
  priority?: boolean;
};

export function RemoteImage({ src, alt, className, fill, width, height, sizes, priority }: Props) {
  const isAbsolute = /^https?:\/\//i.test(src);

  if (!isAbsolute) {
    return (
      <div
        className={cn("flex items-center justify-center bg-slate-800 text-xs text-slate-500", className)}
        style={fill ? undefined : { width, height }}
      >
        Invalid image URL
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      width={!fill ? width : undefined}
      height={!fill ? height : undefined}
      sizes={sizes}
      priority={priority}
      unoptimized
      className={className}
    />
  );
}
