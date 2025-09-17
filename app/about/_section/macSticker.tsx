import Image from '@/components/ui/next-image'
import Sticker from '@/components/ui/sticker'
import { fav } from '@/data/fav'

const MacSticker = () => {
  return (
    <div className="relative m-auto hidden h-[454px] w-[659px] md:block">
      <Image
        className="m-auto rounded-2xl"
        src="/static/images/macbook.webp"
        alt="Profile Image"
        priority={true}
        height={454}
        width={659}
      />
      {fav.map((items) => (
        <Sticker
          key={items.id}
          imageClass={items.class}
          width={items.width}
          height={items.height}
          imageUrl={items.image}
          name={items.name}
        />
      ))}
    </div>
  )
}

export default MacSticker
