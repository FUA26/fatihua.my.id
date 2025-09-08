// app/components/ProjectsSection.tsx
'use client'

import { GitBranch } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

type Project = {
  id: string
  year: string | number
  title: string
  description: string
  href: string
  image: string
  imageAlt: string
}

const projects: Project[] = [
  {
    id: 'bookmarked-android',
    year: 2024,
    title: 'Bookmarked Android: A Simple Viewer for My Bookmarked Content',
    description:
      'Built with Jetpack Compose, it aims to offer an improved reading experience on my laggy phone.',
    href: '/projects/bookmarked-android',
    image: '/images/projects/bookmarked-android.jpg', // ganti sesuai asetmu
    imageAlt: 'Bookmarked Android promo shot',
  },
  {
    id: 'bookmarked-notion',
    year: 2024,
    title: 'Bookmarked: Your Go-To Tool for Curating Tweets in Notion',
    description:
      'A full-stack app for saving tweets to Notion via Telegram bot.',
    href: '/projects/bookmarked-notion',
    image: '/images/projects/bookmarked-notion.jpg', // ganti sesuai asetmu
    imageAlt: 'Dashboard screenshot of Bookmarked Notion',
  },
]

export default function ProjectsSection() {
  return (
    <section
      aria-labelledby="projects-heading"
      className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8"
    >
      {/* Top row: badge + heading + CTA */}
      <div className="mb-10 flex items-start justify-between gap-6">
        <div className="max-w-2xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-zinc-300 bg-white px-3 py-1 text-sm font-medium text-zinc-700 shadow-sm dark:border-zinc-700 dark:bg-zinc-900/60 dark:text-zinc-200">
            <GitBranch className="h-4 w-4 text-yellow-500" />
            Projects
          </div>

          <h2
            id="projects-heading"
            className="text-4xl font-extrabold leading-[1.15] tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl"
          >
            The Journey in Code{' '}
            {/* <span className="block">learning journey</span> */}
          </h2>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
            Each line of code marks a lesson learned, each project a milestone
            in becoming a better developer.
          </p>
        </div>

        <Link
          href="/projects"
          className="shrink-0 rounded-full border border-zinc-300 px-5 py-3 text-sm font-semibold text-zinc-900 transition hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-800"
        >
          View all projects <span aria-hidden>→</span>
        </Link>
      </div>

      {/* Grid of cards */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {projects.map((p) => (
          <article
            key={p.id}
            className="group overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
          >
            {/* Image */}
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800">
              <Image
                src={p.image}
                alt={p.imageAlt}
                fill
                sizes="(min-width: 1024px) 560px, 100vw"
                className="object-cover transition duration-300 group-hover:scale-[1.02]"
                priority={false}
              />
              {/* Subtle gradient tint for readability on any theme */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent dark:from-black/20" />
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="mb-3 text-sm font-semibold tracking-wide text-emerald-600 dark:text-emerald-400">
                {p.year}
              </div>

              <h3 className="text-xl font-semibold leading-snug text-zinc-900 dark:text-zinc-50">
                <Link href={p.href} className="outline-none">
                  <span className="bg-gradient-to-r from-transparent via-transparent to-transparent bg-[length:0_2px] bg-left-bottom bg-no-repeat transition-[background-size] duration-300 group-hover:bg-[length:100%_2px] dark:from-emerald-500/0 dark:to-emerald-500/0">
                    {p.title}
                  </span>
                </Link>
              </h3>

              <p className="mt-3 line-clamp-3 text-sm text-zinc-600 dark:text-zinc-400">
                {p.description}
              </p>

              <div className="mt-6">
                <Link
                  href={p.href}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 transition hover:opacity-80 dark:text-emerald-400"
                  aria-label={`Read more about ${p.title}`}
                >
                  Read more <span aria-hidden>→</span>
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
