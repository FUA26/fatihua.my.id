// app/components/BlogHubSection.tsx
'use client'

import clsx from 'clsx'
import { NotebookTabsIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import * as React from 'react'

type Post = {
  id: string
  date: string
  readTime?: string
  title: string
  description: string
  href: string
  image?: string // optional (posts usually have)
  imageAlt?: string
  tags?: string[]
}

type Props = {
  posts: Post[]
  snippets: Post[] // reuse shape
}

export default function BlogHubSection({ posts, snippets }: Props) {
  const [mode, setMode] = React.useState<'posts' | 'snippets'>('posts')
  const items = mode === 'posts' ? posts : snippets

  const ctaHref = mode === 'posts' ? '/blog' : '/snippets'
  const ctaText =
    mode === 'posts' ? 'View all articles →' : 'View all snippets →'

  return (
    <section
      aria-labelledby="bloghub-heading"
      className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8"
    >
      {/* Header: badge + title + cta */}
      <div className="mb-8 flex items-start justify-between gap-6">
        <div className="max-w-2xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-zinc-300 bg-white px-3 py-1 text-sm font-medium text-zinc-700 shadow-sm dark:border-zinc-700 dark:bg-zinc-900/60 dark:text-zinc-200">
            <NotebookTabsIcon className="h-4 w-4 text-yellow-500" />
            Articles
          </div>

          <h2
            id="bloghub-heading"
            className="text-4xl font-extrabold leading-[1.15] tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl"
          >
            Insights Along the Way
          </h2>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
            Here’s where I share my thoughts, experiments, and the small wins I
            pick up along my journey as a developer.
          </p>
        </div>

        <Link
          href={ctaHref}
          className="shrink-0 rounded-full border border-zinc-300 px-5 py-3 text-sm font-semibold text-zinc-900 transition hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-800"
        >
          {ctaText}
        </Link>
      </div>

      {/* Mode switch line (Posts / Snippets) */}
      <div className="mb-6 flex items-center justify-between">
        <div className="text-2xl sm:text-[26px] font-semibold flex">
          <p className="pr-2 text-zinc-900">Latest</p>
          <button
            type="button"
            onClick={() => setMode('posts')}
            className={clsx(
              'me-1 underline-offset-4 focus:outline-none',
              mode === 'posts'
                ? 'text-zinc-900 underline dark:text-zinc-50'
                : 'text-zinc-400 hover:text-zinc-600 dark:text-zinc-500 dark:hover:text-zinc-300',
            )}
            aria-pressed={mode === 'posts'}
          >
            posts
          </button>
          <span className="mx-1 text-zinc-300 dark:text-zinc-700">/</span>
          <button
            type="button"
            onClick={() => setMode('snippets')}
            className={clsx(
              'ms-1 underline-offset-4 focus:outline-none',
              mode === 'snippets'
                ? 'text-zinc-900 underline dark:text-zinc-50'
                : 'text-zinc-400 hover:text-zinc-600 dark:text-zinc-500 dark:hover:text-zinc-300',
            )}
            aria-pressed={mode === 'snippets'}
          >
            snippets
          </button>
        </div>
      </div>

      <hr className="border-zinc-200 dark:border-zinc-800" />

      {/* List */}
      <div className="mt-8 space-y-10">
        {items.map((a) => (
          <article
            key={a.id}
            className={clsx(
              'flex flex-col gap-6 sm:flex-row',
              mode === 'posts' ? 'items-start' : 'items-center sm:items-start',
            )}
          >
            {/* Thumbnail (optional, shown for posts; for snippets we can hide or use small preview) */}
            {mode === 'posts' && (
              <div className="relative h-40 w-full flex-shrink-0 overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800 sm:h-32 sm:w-48">
                {a.image ? (
                  <Image
                    src={a.image}
                    alt={a.imageAlt ?? a.title}
                    fill
                    className="object-cover transition duration-300 hover:scale-105"
                  />
                ) : null}
              </div>
            )}

            {/* Content */}
            <div className="flex flex-1 flex-col justify-between">
              <div>
                <div className="mb-1 text-sm text-zinc-500 dark:text-zinc-400">
                  {a.date}
                  {a.readTime ? <> • {a.readTime}</> : null}
                </div>

                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                  <Link href={a.href} className="hover:underline">
                    {a.title}
                  </Link>
                </h3>

                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                  {a.description}
                </p>
              </div>

              <div className="mt-3 flex items-center justify-between">
                <Link
                  href={a.href}
                  className="inline-flex items-center gap-1 text-sm font-semibold text-emerald-700 hover:opacity-80 dark:text-emerald-400"
                >
                  Read more →
                </Link>

                {!!a.tags?.length && (
                  <div className="flex flex-wrap gap-2">
                    {a.tags?.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md bg-zinc-200 px-2 py-1 text-xs text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
