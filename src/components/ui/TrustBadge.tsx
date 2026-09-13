"use client";

export default function TrustBadge({
  rating = 4.9,
  reviewCount = 30,
  className = "",
  size: sizeProp = "default",
}: {
  rating?: number;
  reviewCount?: number;
  className?: string;
  size?: "default" | "compact" | "large";
}) {
  const sizes = {
    default: { stars: "text-lg", text: "text-sm", badge: "px-4 py-2.5" },
    compact: { stars: "text-sm", text: "text-xs", badge: "px-3 py-1.5" },
    large: { stars: "text-2xl", text: "text-base", badge: "px-6 py-4" },
  };

  const size = sizes[sizeProp];

  return (
    <div
      className={`inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-primary/20 rounded-2xl shadow-3d ${size.badge} ${className}`}
      role="img"
      aria-label={`${rating} out of 5 stars based on ${reviewCount} Google reviews`}
    >
      <div className="flex items-center gap-0.5" aria-hidden="true">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`w-5 h-5 ${size.stars} ${i < Math.floor(rating) ? "text-accent fill-current" : i < rating ? "text-accent fill-current" : "text-foreground/20"}`}
            viewBox="0 0 24 24"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        ))}
      </div>
      <span className="font-semibold text-foreground">{rating.toFixed(1)}</span>
      <span className="text-foreground/60">{size.text} ({reviewCount} reviews)</span>
    </div>
  );
}