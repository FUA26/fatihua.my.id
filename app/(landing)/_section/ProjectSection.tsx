import type { Project } from '@/.contentlayer/generated'
import { GitBranch } from 'lucide-react'
// app/components/ProjectsSection.tsx
import Image from 'next/image'
import Link from 'next/link'

type Props = {
  projects: Project[]
  heading?: string
  subheading?: string
  ctaHref?: string
  ctaText?: string
}

/** Format tanggal ISO → "18 Apr 2019" (id-ID) */
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

/** Tentukan href prioritas: halaman detail internal → demo eksternal → root */
function resolveHref(p: Project) {
  if (p.path) return `/${p.path}` // contoh: "project/sepasang-janji"
  if (p.slug) return `/project/${p.slug}`
  if (p.links?.demo) return p.links.demo
  return '/'
}

function resolveImage(p: Project) {
  if (Array.isArray(p.images) && p.images.length > 0) {
    const filename = p.images[0]
    return `/static/images/project/${filename}`
  }
  return '/static/placeholder-16x9.png' // fallback
}
// /static/images/project/
export default function ProjectsSection({
  projects,
  heading = 'The Journey in Code',
  subheading = 'Each line of code marks a lesson learned, each project a milestone.',
  ctaHref = '/project',
  ctaText = 'View all projects',
}: Props) {
  // Filter draft & urutkan terbaru
  const items = (projects ?? [])
    .filter((p) => !p.draft)
    .sort((a, b) => +new Date(b.date) - +new Date(a.date))

  return (
    <section
      aria-labelledby="projects-heading"
      className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8"
    >
      {/* Header */}
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
            {heading}
          </h2>

          {subheading ? (
            <p className="mt-6 max-w-xl text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
              {subheading}
            </p>
          ) : null}
        </div>

        {ctaHref && ctaText ? (
          <Link
            href={ctaHref}
            prefetch={false}
            className="shrink-0 rounded-full border border-zinc-300 px-5 py-3 text-sm font-semibold text-zinc-900 transition hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-800"
          >
            {ctaText} <span aria-hidden>→</span>
          </Link>
        ) : null}
      </div>

      {/* Grid */}
      {items.length === 0 ? (
        <div className="rounded-xl border border-dashed border-zinc-300 p-8 text-center text-zinc-500 dark:border-zinc-700 dark:text-zinc-400">
          Belum ada project untuk ditampilkan.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {items.map((p, idx) => {
            const href = resolveHref(p)
            const image = resolveImage(p)
            const imageAlt = p.title
            const metaLeft = p.duration || formatDate(p.date) // tampilkan duration jika ada
            const metaRight = p.status // "On Hold", "Completed", dsb.
            // console.log(p)
            // console.log('Images URL : ', image, p.images)
            return (
              <article
                key={p._id ?? p.slug ?? href}
                className="group overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
              >
                {/* Gambar */}
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                  <Image
                    src={p.images[0]}
                    alt={imageAlt}
                    fill
                    sizes="(min-width: 1024px) 560px, 100vw"
                    className="object-cover object-top transition duration-300 group-hover:scale-[1.02]"
                    priority={idx < 2}
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent dark:from-black/20" />
                </div>

                {/* Konten */}
                <div className="p-6">
                  {(metaLeft || metaRight) && (
                    <div className="mb-3 flex items-center justify-between text-xs font-semibold tracking-wide text-yellow-600 dark:text-yellow-400">
                      <span>{metaLeft}</span>
                      {metaRight ? (
                        <span className="text-yellow-700/80 dark:text-yellow-300/80">
                          {metaRight}
                        </span>
                      ) : (
                        <span />
                      )}
                    </div>
                  )}

                  <h3 className="text-xl font-semibold leading-snug text-zinc-900 dark:text-zinc-50">
                    <Link href={href} prefetch={false} className="outline-none">
                      <span className="bg-gradient-to-r from-transparent via-transparent to-transparent bg-[length:0_2px] bg-left-bottom bg-no-repeat transition-[background-size] duration-300 group-hover:bg-[length:100%_2px] dark:from-yellow-500/0 dark:to-yellow-500/0">
                        {p.title}
                      </span>
                    </Link>
                  </h3>

                  <p className="mt-3 line-clamp-3 text-sm text-zinc-600 dark:text-zinc-400">
                    {p.summary ?? ''}
                  </p>

                  {/* Optional: chip kecil untuk role & techStack (uncomment jika mau) */}
                  {/* {p.role && (
                    <div className="mt-4 inline-flex rounded-full border border-zinc-300 px-2.5 py-1 text-xs text-zinc-700 dark:border-zinc-700 dark:text-zinc-300">
                      {p.role}
                    </div>
                  )}
                  {Array.isArray(p.techStack) && p.techStack.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {p.techStack.slice(0, 4).map((t) => (
                        <span
                          key={t}
                          className="rounded-full bg-yellow-50 px-2.5 py-1 text-xs text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )} */}

                  <div className="mt-6">
                    <Link
                      href={href}
                      prefetch={false}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-yellow-700 transition hover:opacity-80 dark:text-yellow-400"
                      aria-label={`Read more about ${p.title}`}
                    >
                      Read more <span aria-hidden>→</span>
                    </Link>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      )}
    </section>
  )
}
