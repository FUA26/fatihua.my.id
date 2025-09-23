// app/components/SiteFooter.tsx
'use client'

import { Github, Globe, Instagram, Linkedin, Mail } from 'lucide-react'
import Link from 'next/link'
import { Logo } from '../ui/logo'
import { SpotifyNowPlaying } from '../ui/now-playing'
import { LastCommit } from './last-commit'

type NavGroup = {
  title: string
  links: { label: string; href: string; external?: boolean }[]
}

type Props = {
  authorCn?: string
  authorName?: string
  tagline?: string
  year?: number
  lastUpdated?: string
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
]

export default function SiteFooter({
  authorName = 'FUA',
  tagline = 'Crafting solutions that make ideas come alive.',
  year = new Date().getFullYear(),
  lastUpdated,
}: Props) {
  return (
    <footer className="border-t border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          {/* Left: identity */}
          <div className="order-2 md:order-1 md:col-span-5">
            <h3 className="flex text-xl font-semibold text-zinc-900 dark:text-zinc-50">
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
                href="https://github.com/fua26"
                className="transition hover:opacity-80"
              >
                <Github className="h-5 w-5" />
              </Link>
              <Link
                aria-label="LinkedIn"
                href="https://www.linkedin.com/in/fatih-ulil-albab"
                className="transition hover:opacity-80"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link
                aria-label="Instagram"
                href="https://instagram.com/fatihulilalbab"
                className="transition hover:opacity-80"
              >
                <Instagram className="h-5 w-5" />
              </Link>
              <Link
                aria-label="Email"
                href="mailto:fatihulil@gmail.com"
                className="transition hover:opacity-80"
              >
                <Mail className="h-5 w-5" />
              </Link>
            </div>

            <SpotifyNowPlaying
              className="w-full justify-center truncate [--artist-color:var(--color-gray-500)] md:max-w-[50%] md:justify-start my-6"
              songEffect="underline"
              showCover
            />
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

      {/* Footer bottom */}
      {/* <div className="mx-auto mt-6 flex max-w-6xl items-center justify-between px-4 py-4 text-xs text-zinc-500 dark:text-zinc-500 sm:px-6 lg:px-8">
        <p>
          © {year} {authorName}. All rights reserved.
        </p>
        {lastUpdated && (
          <p className="text-right">
            Last updated by {authorName} on {lastUpdated}
          </p>
        )}
      </div> */}

      <LastCommit />
    </footer>
  )
}
