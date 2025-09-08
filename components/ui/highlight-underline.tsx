/* eslint-disable @typescript-eslint/no-explicit-any */
import { clsx } from 'clsx'
import type { CSSProperties } from 'react'

export function HighlightUnderline({
  as: Component = 'span',
  children,
  active,
  className,
  duration,
  ...rest
}: {
  children: React.ReactNode
  as?: React.ElementType
  active?: boolean
  className?: string
  duration?: number
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  [key: string]: any
}) {
  return (
    <Component
      className={clsx([
        'bg-gradient-to-r bg-left-bottom bg-no-repeat',
        'duration-&lsqb;var(--duration,300ms)&rsqb;',
        'transition-[background-size]',
        'from-yellow-200 to-yellow-100',
        'dark:from-yellow-700 dark:to-yellow-600',
        active
          ? 'bg-[length:100%_50%] hover:bg-[length:100%_100%]'
          : 'bg-[length:0px_50%] hover:bg-[length:100%_50%]',
        className,
      ])}
      style={{ '--duration': `${duration || 300}ms` } as CSSProperties}
      {...rest}
    >
      {children}
    </Component>
  )
}
