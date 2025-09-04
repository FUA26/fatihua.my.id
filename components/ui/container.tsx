import clsx from 'clsx'
import type { ReactNode } from 'react'

export function Container({
  children,
  as: Component = 'section',
  className,
}: {
  children: ReactNode
  as?: React.ElementType
  className?: string
}) {
  return (
    <Component
      className={clsx('mx-auto w-full max-w-7xl px-4 xl:px-6', className)}
    >
      {children}
    </Component>
  )
}
