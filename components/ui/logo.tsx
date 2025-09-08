import { Image } from '@/components/ui/image'
import { Link } from '@/components/ui/link'
import { SITE_METADATA } from '@/data/site-metadata'
import { clsx } from 'clsx'

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label={SITE_METADATA.headerTitle}
      className={clsx(['flex items-center gap-2', className])}
    >
      <Image
        src="/static/images/FUA_logo.svg"
        alt={SITE_METADATA.headerTitle}
        width={100}
        height={100}
        className="h-8 w-8"
        loading="eager"
      />
      {/* <span className="font-semibold">{SITE_METADATA.headerTitle}</span> */}
    </Link>
  )
}
