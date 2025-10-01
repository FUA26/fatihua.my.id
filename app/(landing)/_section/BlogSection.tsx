// app/components/BlogHubSection.tsx
'use client'

import clsx from 'clsx'
import type { Blog, Snippet } from 'contentlayer/generated'
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
  image?: string
  imageAlt?: string
  tags?: string[]
}

type Props = {
  // Boleh sudah Post[] (hasil map), atau masih raw dari Contentlayer—dua-duanya akan dinormalisasi.
  posts: (Blog | Post)[]
  snippets: (Snippet | Post)[]
}

/** Format tanggal ISO → "07 Okt 2023" (lokal Indonesia) */
function formatDate(idate?: string) {
  if (!idate) return ''
  const d = new Date(idate)
  if (Number.isNaN(d.getTime())) return idate
  return new Intl.DateTimeFormat('id-ID', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(d)
}

/** Normalisasi 1 item (raw Contentlayer atau Post) menjadi Post */
function normalizeItem(raw: Blog | Snippet | Post): Post {
  // Sumber dasar
  const anyRaw = raw as any
  const title = anyRaw.title ?? 'Untitled'
  const date = anyRaw.date ?? anyRaw.publishedAt ?? ''
  const description =
    'description' in anyRaw ? anyRaw.description : (anyRaw.summary ?? '')

  // Reading time (string atau object readingTime.text)
  let readTime: string | undefined
  if ('readTime' in anyRaw && anyRaw.readTime) {
    readTime = anyRaw.readTime
  } else if ('readingTime' in anyRaw && anyRaw.readingTime) {
    readTime =
      typeof anyRaw.readingTime === 'string'
        ? anyRaw.readingTime
        : anyRaw.readingTime?.text
  }

  // Cari slug/flattenedPath yang paling andal
  let slug: string | undefined
  if (anyRaw.slug) {
    slug = anyRaw.slug
  } else if (anyRaw.path) {
    slug = anyRaw.path
  } else if (anyRaw._raw?.flattenedPath) {
    // contoh: "blog/my-post" atau "snippets/my-snippet"
    slug = anyRaw._raw.flattenedPath
  } else if (anyRaw._id) {
    slug = anyRaw._id
      .toString()
      .replace(/^blog\//, '')
      .replace(/^snippets\//, '')
  }

  // Tentukan href yang benar sesuai prefix/tipe
  let href = '/blog'
  if (slug) {
    if (slug.startsWith('snippets/')) {
      href = `/${slug}` // → /snippets/...
    } else if (slug.startsWith('blog/')) {
      href = `/${slug}` // → /blog/...
    } else {
      // Jika tidak ada prefix, tentukan berdasarkan tipe
      const isSnippet =
        anyRaw.type === 'Snippet' ||
        anyRaw._id?.toString()?.startsWith('snippets/')
      href = isSnippet ? `/snippets/${slug}` : `/blog/${slug}`
    }
  } else if ('href' in anyRaw && anyRaw.href) {
    href = anyRaw.href
  }

  // Gambar (ambil image pertama yang tersedia)
  let image: string | undefined
  if ('image' in anyRaw && anyRaw.image) {
    image = anyRaw.image
  } else if (Array.isArray(anyRaw.images) && anyRaw.images.length > 0) {
    image = anyRaw.images[0]
  }

  const tags: string[] | undefined = anyRaw.tags

  return {
    id: 'id' in anyRaw && anyRaw.id ? anyRaw.id : (anyRaw._id ?? href),
    date,
    readTime,
    title,
    description,
    href,
    image,
    imageAlt: 'imageAlt' in anyRaw ? anyRaw.imageAlt : title,
    tags,
  }
}

/** Normalisasi array items */
function normalizeList(arr: (Blog | Snippet | Post)[] = []): Post[] {
  return arr.map(normalizeItem)
}

export default function BlogHubSection({ posts, snippets }: Props) {
  const [mode, setMode] = React.useState<'posts' | 'snippets'>('posts')

  const normPosts = React.useMemo(() => normalizeList(posts), [posts])
  const normSnippets = React.useMemo(() => normalizeList(snippets), [snippets])
  const items = mode === 'posts' ? normPosts : normSnippets

  // Debug jika perlu:
  // console.log('SNIPPETS:', snippets)
  // console.log('POSTS:', posts)
  // console.log('ITEMS:', items)

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
        <div className="flex text-2xl font-semibold sm:text-[26px]">
          <p className="pr-2 text-zinc-900 dark:text-zinc-50">Latest</p>

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
                : 'text-zinc-400 hover:text-zinc-600 dark:text-zinc-500 dark:hover:bg-zinc-800',
            )}
            aria-pressed={mode === 'snippets'}
          >
            snippets
          </button>
        </div>
      </div>

      <hr className="border-zinc-200 dark:border-zinc-800" />

      {/* List atau Empty State */}
      {items.length === 0 ? (
        <p className="mt-8 text-sm text-zinc-500 dark:text-zinc-400">
          {mode === 'snippets'
            ? 'Belum ada snippet untuk ditampilkan.'
            : 'Belum ada artikel untuk ditampilkan.'}
        </p>
      ) : (
        <div className="mt-8 space-y-10">
          {items.map((a) => (
            <article
              key={a.id}
              className={clsx(
                'flex flex-col gap-6 sm:flex-row',
                mode === 'posts'
                  ? 'items-start'
                  : 'items-center sm:items-start',
              )}
            >
              {/* Thumbnail: render hanya jika ada gambar (khusus posts) */}
              {mode === 'posts' && a.image ? (
                <div className="relative h-40 w-full flex-shrink-0 overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800 sm:h-32 sm:w-48">
                  <Image
                    src={a.image}
                    alt={a.imageAlt ?? a.title}
                    fill
                    className="object-cover transition duration-300 group-hover:scale-105"
                    sizes="(min-width: 1024px) 192px, 50vw"
                  />
                </div>
              ) : null}

              {/* Content */}
              <div className="flex flex-1 flex-col justify-between">
                <div>
                  <div className="mb-1 text-sm text-zinc-500 dark:text-zinc-400">
                    {formatDate(a.date)}
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
                    className="inline-flex items-center gap-1 text-sm font-semibold text-yellow-700 hover:opacity-80 dark:text-yellow-400"
                  >
                    Read more →
                  </Link>

                  {!!a.tags?.length && (
                    <div className="flex flex-wrap gap-2">
                      {a.tags.map((tag) => (
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
      )}
    </section>
  )
}
