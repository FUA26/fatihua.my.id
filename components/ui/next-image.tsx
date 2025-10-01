'use client'

import NextImage, { type ImageProps as NextImageProps } from 'next/image'

export type AppImageProps = Omit<NextImageProps, 'priority'> & {
  priority?: boolean
}

function isSvg(src: NextImageProps['src']) {
  if (typeof src !== 'string') return false
  const s = src.split('?')[0].trim().toLowerCase()
  return s.endsWith('.svg') || s.startsWith('data:image/svg+xml')
}

export default function Image({ src, quality, ...rest }: AppImageProps) {
  // SVG: no optimization + jangan kirim quality
  if (isSvg(src)) return <NextImage src={src} unoptimized {...rest} />

  // Raster: hanya kirim quality jika ADA (jangan default 100)
  return (
    <NextImage
      src={src}
      {...(quality !== undefined ? { quality } : {})}
      {...rest}
    />
  )
}
