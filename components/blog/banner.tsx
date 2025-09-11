import { GritBackground } from '@/components/ui/grit-background'
import { GrowingUnderline } from '@/components/ui/growing-underline'
import { Image, Zoom } from '@/components/ui/image'
import { Link } from '@/components/ui/link'
import { capitalize, kebabCaseToPlainText } from '@/utils/misc'
import clsx from 'clsx'

type BannerProps = {
  banner: string
  className?: string
}

export function Banner({ banner, className }: BannerProps) {
  // Expected shape: "path/to/file__author__filename.ext"
  // But we guard against missing segments.
  const parts = (banner ?? '').split('__')

  const path = parts[0] ?? ''
  const author = parts[1] ?? ''
  // Fallbacks: use last path segment if filename part is missing
  const lastSegment = (path.split('/').pop() ?? '').split('?')[0]
  const rawFilename = (parts[2] ?? lastSegment) || ''
  const cleanFilename = rawFilename.split('?')[0] // strip query params if any
  const id = cleanFilename.includes('.')
    ? cleanFilename.split('.')[0]
    : cleanFilename

  const handle = (path.split('/').pop() ?? '').split('?')[0]

  const alt = capitalize(kebabCaseToPlainText(handle)) || 'Article banner photo'

  const showCredit = Boolean(author && id)

  return (
    <div className={clsx('relative', className)}>
      {showCredit ? (
        <Credit
          author={author}
          id={id}
          className={clsx([
            'absolute top-4 right-4 z-10',
            'hidden rounded-lg px-3 py-0.5 lg:block',
            'bg-gray-50 text-gray-700 dark:bg-gray-800 dark:text-gray-200',
          ])}
        />
      ) : null}

      <Zoom>
        <Image
          src={banner}
          alt={alt}
          width={1600}
          height={900}
          className="h-auto w-full rounded-lg"
        />
      </Zoom>

      <GritBackground className="inset-0 rounded-lg opacity-75" />
    </div>
  )
}

interface CreditProps {
  author: string
  id: string
  className?: string
}

function Credit({ author, id, className }: CreditProps) {
  return (
    <div className={clsx('text-sm italic', className)}>
      Photo by{' '}
      <Link className="font-semibold" href={`https://unsplash.com/@${author}`}>
        <GrowingUnderline data-umami-event="banner-author">
          @{author}
        </GrowingUnderline>
      </Link>{' '}
      on{' '}
      <Link
        className="font-semibold"
        href={`https://unsplash.com/photos/${id}`}
      >
        <GrowingUnderline data-umami-event="banner-unsplash">
          Unsplash
        </GrowingUnderline>
      </Link>
    </div>
  )
}
