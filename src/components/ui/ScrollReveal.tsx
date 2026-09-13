"use client";

import { useEffect, useRef, useState } from "react";

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  threshold?: number;
  rootMargin?: string;
  className?: string;
  animation?: "fade-in" | "slide-up" | "slide-down" | "scale-in";
}

export default function ScrollReveal({
  children,
  delay = 0,
  threshold = 0.1,
  rootMargin = "0px 0px -50px 0px",
  className = "",
  animation = "slide-up",
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
          observer.unobserve(entry.target);
        }
      },
      { threshold, rootMargin }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [delay, threshold, rootMargin]);

  const animationClasses = {
    "fade-in": "animate-fade-in",
    "slide-up": "animate-slide-up",
    "slide-down": "animate-slide-down",
    "scale-in": "animate-scale-in",
  };

  return (
    <div
      ref={ref}
      className={`${animationClasses[animation]} opacity-0 ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {isVisible ? children : <>{children}</>}
    </div>
  );
}