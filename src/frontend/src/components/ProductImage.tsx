interface ProductImageProps {
  emoji: string;
  bgColor: string;
  name: string;
  className?: string;
}

export function ProductImage({
  emoji,
  bgColor,
  name,
  className = "",
}: ProductImageProps) {
  return (
    <div
      className={`flex items-center justify-center ${className}`}
      style={{ backgroundColor: bgColor }}
      aria-label={name}
    >
      <span style={{ fontSize: "3rem" }} role="img" aria-label={name}>
        {emoji}
      </span>
    </div>
  );
}
