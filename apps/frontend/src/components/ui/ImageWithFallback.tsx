"use client";

import { useState } from "react";
import Image from "next/image";

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
  priority?: boolean;
}

export function ImageWithFallback({
  src,
  alt,
  fill = false,
  width,
  height,
  className = "",
  objectFit = "cover",
  priority = false,
}: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);
  const [fallbackIndex, setFallbackIndex] = useState(0);

  // Generate fallback images based on the alt text or category
  const generateFallbackImage = (text: string) => {
    // Clean the text for URL encoding
    const cleanText = encodeURIComponent(text.replace(/[^a-zA-Z0-9\s]/g, '').trim());
    const size = fill ? "800x800" : `${width || 800}x${height || 800}`;
    
    // Try different fallback services - using more reliable ones
    const fallbacks = [
      `https://picsum.photos/${width || 800}/${height || 800}?random=${Math.floor(Math.random() * 1000)}`,
      `https://picsum.photos/${width || 800}/${height || 800}?random=${Math.floor(Math.random() * 1000) + 100}`,
      `https://picsum.photos/${width || 800}/${height || 800}?random=${Math.floor(Math.random() * 1000) + 200}`,
    ];
    
    return fallbacks;
  };

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      const fallbacks = generateFallbackImage(alt);
      
      if (fallbackIndex < fallbacks.length) {
        setImgSrc(fallbacks[fallbackIndex]);
        setFallbackIndex(prev => prev + 1);
      } else {
        // If all fallbacks fail, use a simple SVG placeholder
        const size = fill ? "800x800" : `${width || 800}x${height || 800}`;
        setImgSrc(`data:image/svg+xml;base64,${btoa(`
          <svg width="${width || 800}" height="${height || 800}" xmlns="http://www.w3.org/2000/svg">
            <rect width="100%" height="100%" fill="#f3f4f6"/>
            <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="16" fill="#6b7280" text-anchor="middle" dy=".3em">
              ${alt || 'Image'}
            </text>
          </svg>
        `)}`);
      }
    }
  };

  // If it's a local file path (starts with /), use it directly
  if (src.startsWith('/')) {
    return (
      <Image
        src={src}
        alt={alt}
        fill={fill}
        width={width}
        height={height}
        className={className}
        style={fill ? { objectFit } : undefined}
        priority={priority}
        onError={handleError}
      />
    );
  }

  // For external URLs, use the fallback system
  return (
    <Image
      src={imgSrc}
      alt={alt}
      fill={fill}
      width={width}
      height={height}
      className={className}
      style={fill ? { objectFit } : undefined}
      priority={priority}
      onError={handleError}
    />
  );
}
