import type { LinkProps } from 'next/link'
import NextLink from 'next/link'
import type { AnchorHTMLAttributes } from 'react'

export function Link({
  href,
  ...rest
}: LinkProps & AnchorHTMLAttributes<HTMLAnchorElement>) {
  // biome-ignore lint/complexity/useOptionalChain: <explanation>
  const isInternalLink = href && href.startsWith('/')
  // biome-ignore lint/complexity/useOptionalChain: <explanation>
  const isAnchorLink = href && href.startsWith('#')

  if (isInternalLink) {
    return (
      <NextLink className="break-words" href={href} {...rest}>
        {rest.children || 'Link'}
      </NextLink>
    )
  }

  if (isAnchorLink) {
    return (
      <a className="break-words" href={href} {...rest}>
        {rest.children || 'Link'}
      </a>
    )
  }

  return (
    <a
      className="break-words"
      target="_blank"
      rel="noopener noreferrer"
      href={href}
      {...rest}
    >
      {rest.children || 'Link'}
    </a>
  )
}
