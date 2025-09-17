import clsx from 'clsx'

export function PageHeader({
  title,
  description,
  children,
  className,
}: {
  title: string
  description: React.ReactNode
  children?: React.ReactNode
  className?: string
}) {
  return (
    <div className={clsx('space-y-2 py-6 md:space-y-5', className)}>
      <h2
        id="bloghub-heading"
        className="text-4xl font-extrabold leading-[1.15] tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl"
      >
        {title}
      </h2>
      <p className="mt-6 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
        {description}
      </p>
      {children}
    </div>
  )
}
