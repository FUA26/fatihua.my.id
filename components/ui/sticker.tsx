import React, { type FC } from 'react'
import Image from './next-image'

interface StickerProps {
  height: number
  width: number
  imageClass?: string
  name: string
  imageUrl: string
}

const Sticker: FC<StickerProps> = ({
  height,
  width,
  imageClass,
  name,
  imageUrl,
}) => {
  return (
    <div className={`group/tooltip absolute hover:z-50 ${imageClass || ''}`}>
      <div className="relative" style={{ width, height }}>
        <Image
          src={imageUrl}
          alt={name}
          height={height}
          width={width}
          priority
          className="block rounded-md"
          // jangan kirim quality; biarkan default
        />
      </div>

      <div className="pointer-events-none absolute left-1/2 mt-3 -translate-x-1/2 rounded-lg bg-white px-3 py-2 opacity-0 shadow-lg transition group-hover/tooltip:opacity-100 dark:bg-gray-700">
        <p className="p-0 text-gray-700 dark:text-gray-300">{name}</p>
      </div>
    </div>
  )
}

export default Sticker
