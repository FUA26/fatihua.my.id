import NextLink, { type LinkProps } from 'next/link'
import React, { isValidElement } from 'react'
import type { AnchorHTMLAttributes, ReactNode } from 'react'

type Props = LinkProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
    children?: ReactNode
  }

export function Link({ href, children, className, ...rest }: Props) {
  // Normalisasi href ke string untuk cek cepat
  const hrefStr =
    typeof href === 'string' ? href : (href as any)?.pathname || '' // fallback aman

  const isInternalLink = hrefStr.startsWith('/')
  const isAnchorLink = hrefStr.startsWith('#')

  // Jika children adalah <a>...</a>, ambil props & content-nya supaya tidak nested <a>
  let childIsAnchor = false
  let childAnchorProps: AnchorHTMLAttributes<HTMLAnchorElement> = {}
  let childContent: ReactNode = children

  if (isValidElement(children) && children.type === 'a') {
    childIsAnchor = true
    const {
      children: inner,
      className: childClass,
      ...childRest
    } = (children.props as AnchorHTMLAttributes<HTMLAnchorElement>) || {}
    childContent = inner
    childAnchorProps = childRest
    // gabung className parent + child
    className = [className, childClass].filter(Boolean).join(' ')
  }

  // Kumpulan props <a> (gabungan dari parent & child jika awalnya anak <a>)
  const anchorProps: AnchorHTMLAttributes<HTMLAnchorElement> = {
    className: ['break-words', className].filter(Boolean).join(' '),
    ...childAnchorProps,
    ...rest,
  }

  if (isInternalLink) {
    return (
      <NextLink href={href} {...anchorProps}>
        {childContent ?? 'Link'}
      </NextLink>
    )
  }

  if (isAnchorLink) {
    return (
      <a href={hrefStr} {...anchorProps}>
        {childContent ?? 'Link'}
      </a>
    )
  }

  // External link
  return (
    <a
      href={hrefStr}
      target="_blank"
      rel="noopener noreferrer"
      {...anchorProps}
    >
      {childContent ?? 'Link'}
    </a>
  )
}
