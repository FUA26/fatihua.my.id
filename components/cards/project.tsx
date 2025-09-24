'use client'

import type { Project } from 'contentlayer/generated'

import { TriPolygonBackground } from '@/components/ui/TriPolygonBackground'
import type { BrandsMap } from '@/components/ui/brand'
import { Brand } from '@/components/ui/brand'
import { GradientBorder } from '@/components/ui/gradient-border'
import { GrowingUnderline } from '@/components/ui/growing-underline'
import { Image } from '@/components/ui/image'
import { Link } from '@/components/ui/link'

import type { GithubRepository } from '@/types/data'
import { fetcher } from '@/utils/misc'
import clsx from 'clsx'
import { Github } from 'lucide-react'
import { Fragment, useMemo } from 'react'
import useSWR from 'swr'

/* ----------------------------- Utilities ----------------------------- */

function resolveImage(images: Project['images']): string {
  if (Array.isArray(images) && images.length > 0) {
    const first = images[0]
    if (typeof first === 'string') return normalizePublicPath(first)
    if (
      typeof first === 'object' &&
      'src' in first &&
      typeof first.src === 'string'
    ) {
      return normalizePublicPath(first.src)
    }
  }
  // pastikan file ini ada di /public/static/
  return '/static/placeholder-16x9.png'
}

function normalizePublicPath(p: string): string {
  if (!p) return '/static/placeholder-16x9.png'
  return p.startsWith('/') ? p : `/${p}`
}

type SimpleLink = { title: string; url: string }

function toLinkArray(links: Project['links']): SimpleLink[] {
  if (!links) return []
  if (Array.isArray(links)) {
    return links
      .map((l: any) => {
        if (!l) return null
        if (typeof l === 'string')
          return { title: new URL(l).host ?? 'Link', url: l }
        if (typeof l === 'object' && 'url' in l) {
          return {
            title: (l.title as string) || safeHost(String(l.url)) || 'Link',
            url: String(l.url),
          }
        }
        return null
      })
      .filter(Boolean) as SimpleLink[]
  }
  if (typeof links === 'object') {
    return Object.entries(links).map(([k, v]) => ({ title: k, url: String(v) }))
  }
  if (typeof links === 'string') {
    return [{ title: safeHost(links) || 'Link', url: links }]
  }
  return []
}

function safeHost(u: string) {
  try {
    return new URL(u).host
  } catch {
    return undefined
  }
}

function getGithubUrl(links: SimpleLink[]): string | undefined {
  return links.find((l) => l.url.includes('github.com'))?.url
}

function parseGithubRepo(
  url?: string,
): { owner: string; repo: string } | undefined {
  if (!url) return
  try {
    const u = new URL(url)
    const parts = u.pathname.split('/').filter(Boolean)
    if (u.hostname.includes('github.com') && parts.length >= 2) {
      return { owner: parts[0], repo: parts[1].replace(/\.git$/, '') }
    }
  } catch {}
  return
}

/* ------------------------------ Component ------------------------------ */

type ProjectCardProps = {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  const { title, summary, images, techStack, links, path, canonicalUrl } =
    project

  const imgSrc = resolveImage(images)
  const linkArr = useMemo(() => toLinkArray(links), [links])
  const href = canonicalUrl || linkArr[0]?.url || path
  const description = summary || ''

  const githubUrl = useMemo(() => getGithubUrl(linkArr), [linkArr])
  const gh = parseGithubRepo(githubUrl)

  const { data: repository } = useSWR<GithubRepository>(
    gh ? `/api/github/repo?owner=${gh.owner}&repo=${gh.repo}` : null,
    fetcher,
    { revalidateOnFocus: false },
  )

  const builtWith = techStack ?? []

  return (
    <GradientBorder
      offset={28}
      className="group flex flex-col overflow-hidden rounded-[40px] p-0 [box-shadow:0_8px_32px_rgba(194,194,218,.3)] dark:bg-white/5 dark:shadow-none"
    >
      {/* Header image */}
      <div className="relative w-full">
        {/* background mesh */}
        <TriPolygonBackground
          className="pointer-events-none absolute inset-0 z-0 text-black/10 dark:text-white/10"
          jitter={0.08}
        />

        {/* aspect box HARUS relative agar <Image fill /> bisa render */}
        <div className="relative z-10 w-full aspect-[16/10] md:aspect-[16/9] lg:aspect-[21/9]">
          <Image
            src={imgSrc}
            alt={title}
            fill
            sizes="100vw"
            className="rounded-t-[40px] object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            // priority
          />
        </div>
      </div>

      {/* Body */}
      <div className="relative z-10 p-6 md:p-8">
        <div className="mb-5">
          <h2 className="text-[22px] leading-[30px] font-bold">
            {href ? (
              <Link href={href} aria-label={`Link to ${title}`}>
                <GrowingUnderline data-umami-event="project-title-link">
                  {title}
                </GrowingUnderline>
              </Link>
            ) : (
              title
            )}
          </h2>
        </div>

        <p className="mb-10 line-clamp-3 text-lg">
          {repository?.description || description}
        </p>

        <div
          className={clsx(
            'mt-auto flex gap-6 sm:gap-9 md:grid md:gap-0',
            repository ? 'grid-cols-3' : 'grid-cols-2',
          )}
        >
          {repository ? (
            <div className="space-y-1.5">
              <div className="text-xs text-gray-600 dark:text-gray-400">
                <span className="hidden sm:inline">Github stars</span>
                <span className="sm:hidden">Stars</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center space-x-1.5">
                  <Github size={16} strokeWidth={1.5} />
                  <span className="font-medium">
                    {repository?.stargazerCount ?? 0}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-1.5">
              <div className="text-xs text-gray-600 dark:text-gray-400">
                Links
              </div>
              <div className="flex flex-col items-start gap-0.5 sm:flex-row sm:items-center sm:gap-1.5">
                {linkArr.length > 0 ? (
                  linkArr.map(({ title, url }, idx) => (
                    <Fragment key={`${title}-${url}`}>
                      <Link href={url} className="flex items-center gap-1.5">
                        <GrowingUnderline
                          className="font-medium"
                          data-umami-event="project-link"
                        >
                          {title}
                        </GrowingUnderline>
                      </Link>
                      {idx !== linkArr.length - 1 && (
                        <span className="hidden text-gray-400 md:inline dark:text-gray-500">
                          |
                        </span>
                      )}
                    </Fragment>
                  ))
                ) : (
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    No links
                  </span>
                )}
              </div>
            </div>
          )}

          <div className="space-y-1.5">
            <div className="text-xs text-gray-600 dark:text-gray-400">
              Stack
            </div>
            <div className="flex h-6 flex-wrap items-center gap-1.5">
              {builtWith.length > 0 ? (
                builtWith.map((tool) => (
                  <Brand
                    key={tool}
                    name={tool as keyof typeof BrandsMap}
                    iconClassName={clsx(tool === 'Pygame' ? 'h-4' : 'h-4 w-4')}
                  />
                ))
              ) : (
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  —
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </GradientBorder>
  )
}
