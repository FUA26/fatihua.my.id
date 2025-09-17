'use client'

import NextImage, { type ImageProps as NextImageProps } from 'next/image'

import clsx from 'clsx'
import { useState } from 'react'

const Image = (props: NextImageProps) => {
  const { alt, src, className, priority, ...rest } = props
  const [isLoading, setLoading] = useState(true)

  return (
    <div className={clsx('overflow-hidden', isLoading ? 'animate-pulse' : '')}>
      <NextImage
        className={clsx(
          'duration-700 ease-in-out',
          isLoading
            ? 'scale-[1.02] blur-xl grayscale'
            : 'scale-100 blur-0 grayscale-0',
          className,
        )}
        src={src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        quality={100}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        onLoad={() => setLoading(false)}
        {...rest}
      />
    </div>
  )
}
export default Image
