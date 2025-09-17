import { GrowingUnderline } from '@/components/ui/growing-underline'
import { Image } from '@/components/ui/image'
import { Link } from '@/components/ui/link'
import { SITE_METADATA } from '@/data/site-metadata'
import type { CoreContent } from '@/types/data'
import { formatDate } from '@/utils/misc'
import { clsx } from 'clsx'
import type { Blog } from 'contentlayer/generated'

export function PostCardGridView({ post }: { post: CoreContent<Blog> }) {
  const { path, date, title, summary, images, readingTime } = post

  const cover =
    images && images.length > 0 ? images[0] : SITE_METADATA.socialBanner
  const minutes = Math.max(1, Math.ceil(readingTime.minutes || 1))

  return (
    <article>
      <div className="flex flex-col items-start justify-between gap-4 md:gap-6">
        {/* Media / Cover */}
        <Link
          href={`/${path}`}
          aria-label={`Read: ${title}`}
          className={clsx(
            'group relative block w-full',
            // layout
            'aspect-[3/2] md:aspect-[3/2]',
            // no border, only shadow + transform
            'rounded-2xl overflow-hidden shadow-lg transition-[transform,box-shadow] duration-300 ease-out',
            'hover:-translate-y-0.5 hover:shadow-2xl focus-visible:-translate-y-0.5 focus-visible:shadow-2xl',
            // remove old padding-hover shift entirely
          )}
        >
          <Image
            src={cover}
            alt={title}
            width={1200}
            height={800}
            className="h-full w-full object-cover"
            // priority={false}
          />

          {/* Soft gradient scrim (no border) */}
          <div
            className={clsx(
              'pointer-events-none absolute inset-0',
              'bg-gradient-to-t from-black/35 via-black/10 to-transparent',
              'opacity-90 md:opacity-100',
              'transition-opacity duration-300 group-hover:opacity-100',
            )}
          />

          {/* Floating read-time pill (top-left) */}
          <div
            className={clsx(
              'absolute left-3 top-3',
              'rounded-full px-2.5 py-1 text-xs font-medium',
              'bg-white/85 text-gray-900 backdrop-blur',
              'dark:bg-zinc-900/70 dark:text-zinc-100',
            )}
          >
            {minutes} min read
          </div>

          {/* Hover CTA (bottom-right) */}
          <div
            className={clsx(
              'absolute bottom-3 right-3',
              'translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100',
              'transition-all duration-300',
            )}
          >
            <span
              className={clsx(
                'inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold',
                'bg-white/90 text-gray-900 shadow-md backdrop-blur',
                'dark:bg-zinc-900/70 dark:text-zinc-100',
              )}
            >
              Read&nbsp;→
            </span>
          </div>

          {/* Focus outline for accessibility (not a border in normal state) */}
          <span className="absolute inset-0 rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-black/60 focus-visible:ring-offset-white dark:focus-visible:ring-white/70 dark:focus-visible:ring-offset-zinc-900" />
        </Link>

        {/* Meta + Title + Summary */}
        <div className="w-full space-y-3">
          <div className="flex items-center gap-x-1.5 text-sm text-gray-600 dark:text-gray-400">
            <time dateTime={date}>{formatDate(date)}</time>
            <span className="mx-1 text-gray-400">/</span>
            <span>{minutes} mins read</span>
          </div>

          <div className="group relative">
            <h3 className="text-xl font-semibold leading-6">
              <Link href={`/${path}`}>
                <GrowingUnderline>{title}</GrowingUnderline>
              </Link>
            </h3>
            <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-600 dark:text-gray-500 md:mt-3">
              {summary}
            </p>
          </div>
        </div>
      </div>
    </article>
  )
}
