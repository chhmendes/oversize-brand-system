'use client';

import React, { useState } from 'react';
import NextImage from 'next/image';

interface ImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  caption?: string;
  priority?: boolean;
}

export function Image({
  src,
  alt,
  width = 800,
  height = 600,
  caption,
  priority = false,
}: ImageProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <figure className="my-8">
      <div className="
        relative rounded-lg overflow-hidden
        bg-gray-100 border border-gray-300
      ">
        {isLoading && (
          <div className="
            absolute inset-0 bg-gray-100 animate-pulse
            flex items-center justify-center
          ">
            <div className="
              w-8 h-8 border-4 border-gray-300 border-t-[#B51F3A]
              rounded-full animate-spin
            " />
          </div>
        )}

        <NextImage
          src={src}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          quality={85}
          className="w-full h-auto object-cover"
          onLoadingComplete={() => setIsLoading(false)}
        />
      </div>

      {caption && (
        <figcaption className="
          mt-3 text-sm text-gray-600 text-center
          font-medium
        ">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

// Lazy loaded image component
interface LazyImageProps extends ImageProps {
  lazyLoad?: boolean;
}

export function LazyImage({
  src,
  alt,
  width = 800,
  height = 600,
  caption,
  priority = false,
  lazyLoad = true,
}: LazyImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      caption={caption}
      priority={priority && !lazyLoad}
    />
  );
}
