// app/components/SiteFooter.tsx
'use client'

import Link from 'next/link'
import { Logo } from '../ui/logo'

type NavGroup = {
  title: string
  links: { label: string; href: string; external?: boolean }[]
}

type Props = {
  authorCn?: string // e.g. "王安琪"
  authorName?: string // e.g. "Jesica"
  tagline?: string // short bio
  year?: number // default: current year
  lastUpdated?: string // e.g. "July 18, 2025 at 5:20 PM UTC+7"
}

const groups: NavGroup[] = [
  {
    title: 'General',
    links: [
      { label: 'Home', href: '/' },
      { label: 'Projects', href: '/projects' },
      { label: 'Blog', href: '/blog' },
      { label: 'Snippets', href: '/snippets' },
      { label: 'About', href: '/abouts' },
    ],
  },
  {
    title: 'This site',
    links: [
      {
        label: 'Analytics ↗',
        href: 'https://cloud.umami.is/share/NJ9CmSsopMVFKpd8/www.fatihua.my.id',
        external: true,
      },
      { label: 'RSS ↗', href: '/rss.xml' },
      {
        label: 'Source code',
        href: 'https://github.com/fua26/fatihua.my.id',
        external: true,
      },
    ],
  },
  // {
  //   title: 'Resources',
  //   links: [
  //     {
  //       label: 'Analytics ↗',
  //       href: 'https://bsky.app/profile/yourhandle',
  //       external: true,
  //     },
  //     { label: 'RSS ↗', href: 'https://monkeytype.com/', external: true },
  //   ],
  // },
]

// Simple outline icons (SVG inline) agar tanpa dependensi
const Icon = {
  GitHub: (props: React.SVGProps<SVGSVGElement>) => (
    // biome-ignore lint/a11y/noSvgWithoutTitle: <explanation>
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path
        strokeWidth="1.6"
        d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 19 3.5 5.07 5.07 0 0 0 18.91.5S17.73.15 15 2a13.38 13.38 0 0 0-6 0C6.27.15 5.09.5 5.09.5A5.07 5.07 0 0 0 5 3.5 5.44 5.44 0 0 0 3.5 8c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 17.13V21"
      />
    </svg>
  ),
  LinkedIn: (props: React.SVGProps<SVGSVGElement>) => (
    // biome-ignore lint/a11y/noSvgWithoutTitle: <explanation>
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <rect x="2" y="9" width="5" height="13" rx="1" strokeWidth="1.6" />
      <circle cx="4.5" cy="4.5" r="2.5" strokeWidth="1.6" />
      <path
        strokeWidth="1.6"
        d="M10 22V9h4.5a4.5 4.5 0 0 1 4.5 4.5V22h-5v-8a1.5 1.5 0 0 0-3 0v8H10z"
      />
    </svg>
  ),
  Book: (props: React.SVGProps<SVGSVGElement>) => (
    // biome-ignore lint/a11y/noSvgWithoutTitle: <explanation>
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path
        strokeWidth="1.6"
        d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5v14z"
      />
      <path strokeWidth="1.6" d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    </svg>
  ),
  Mail: (props: React.SVGProps<SVGSVGElement>) => (
    // biome-ignore lint/a11y/noSvgWithoutTitle: <explanation>
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" strokeWidth="1.6" />
      <path strokeWidth="1.6" d="M3 7l9 6 9-6" />
    </svg>
  ),
  X: (props: React.SVGProps<SVGSVGElement>) => (
    // biome-ignore lint/a11y/noSvgWithoutTitle: <explanation>
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path strokeWidth="1.6" d="M4 4l16 16M20 4L4 20" />
    </svg>
  ),
}

export default function SiteFooter({
  authorCn = '王安琪',
  authorName = 'Jesica',
  tagline = 'A dedicated problem-solver who thrives on learning and building.',
  year = new Date().getFullYear(),
  lastUpdated,
}: Props) {
  return (
    <footer className="border-t border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          {/* Left: identity */}
          <div className="order-2 md:order-1 md:col-span-5">
            <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 flex">
              <Logo className="mr-4" />
              <span className="ms-1">{authorName}</span>
            </h3>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              {tagline}
            </p>

            {/* Socials */}
            <div className="mt-6 flex items-center gap-4 text-zinc-700 dark:text-zinc-300">
              <Link
                aria-label="GitHub"
                href="https://github.com/yourname"
                className="transition hover:opacity-80"
              >
                <Icon.GitHub className="h-5 w-5" />
              </Link>
              <Link
                aria-label="LinkedIn"
                href="https://www.linkedin.com/in/yourname"
                className="transition hover:opacity-80"
              >
                <Icon.LinkedIn className="h-5 w-5" />
              </Link>
              <Link
                aria-label="Bookmarks"
                href="/bookmarks"
                className="transition hover:opacity-80"
              >
                <Icon.Book className="h-5 w-5" />
              </Link>
              <Link
                aria-label="Email"
                href="mailto:you@example.com"
                className="transition hover:opacity-80"
              >
                <Icon.Mail className="h-5 w-5" />
              </Link>
              <Link
                aria-label="X (Twitter)"
                href="https://x.com/yourhandle"
                className="transition hover:opacity-80"
              >
                <Icon.X className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Right: nav groups */}
          <div className="order-1 md:order-2 md:col-span-7">
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-2">
              {groups.map((g) => (
                <div key={g.title}>
                  <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-200">
                    {g.title}
                  </h4>
                  <ul className="mt-4 space-y-3 text-sm">
                    {g.links.map((l) => (
                      <li key={l.label}>
                        <Link
                          href={l.href}
                          target={l.external ? '_blank' : undefined}
                          rel={l.external ? 'noreferrer' : undefined}
                          className="text-zinc-600 underline-offset-4 hover:underline dark:text-zinc-400"
                        >
                          {l.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-500 mx-auto max-w-6xl px-4 py-4 sm:px-6 lg:px-8">
        <p>
          © {year} {authorName}. All rights reserved.
        </p>
        {lastUpdated && (
          <p className="text-right">
            Last updated by {authorName} on {lastUpdated}
          </p>
        )}
      </div>
    </footer>
  )
}
