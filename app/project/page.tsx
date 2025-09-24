import { type Project, allProjects } from '@/.contentlayer/generated'
import { ProjectCard } from '@/components/cards/project'
import { Container } from '@/components/ui/container'

import { Link } from '@/components/ui/link'
import { PageHeader } from '@/components/ui/page-header'
import { PROJECTS } from '@/data/projects'
import { formatDate } from '@/utils/misc'
import { genPageMetadata } from 'app/seo'
import Image from 'next/image'

export let metadata = genPageMetadata({ title: 'Projects' })
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
export default async function Projects() {
  // let workProjects = PROJECTS.filter(({ type }) => type === 'work')
  // let sideProjects = PROJECTS.filter(({ type }) => type === 'self')
  let projects = allProjects
  const items = (projects ?? [])
    .filter((p) => !p.draft)
    .sort((a, b) => +new Date(b.date) - +new Date(a.date))
  // console.log(workProjects)
  // console.log(projects)
  return (
    <Container className="relative text-neutral-500 pt-20 mb-20">
      <Container className="pt-4 lg:pt-12">
        <PageHeader
          title="Projects"
          description="Collections of my open-source side projects, along with some cool things I’ve built with colleagues at work. It’s a mix of passion projects and practical tools—some just for fun, others to solve real-world problems."
          className="border-b border-gray-200 dark:border-gray-700"
        />
        <div className="py-5 md:py-10">
          <h3 className="mb-6 text-2xl leading-9 font-bold tracking-tight text-gray-900 md:text-3xl dark:text-gray-100">
            Work
          </h3>

          {items.length === 0 ? (
            <div className="rounded-xl border border-dashed border-zinc-300 p-8 text-center text-zinc-500 dark:border-zinc-700 dark:text-zinc-400">
              Belum ada project untuk ditampilkan.
            </div>
          ) : (
            // ✅ Grid: 1 kolom di sm/md, 2 kolom di lg ke atas
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              {items.map((p, idx) => {
                const href = resolveHref(p)
                const imageAlt = p.title
                const metaLeft = p.duration || formatDate(p.date)
                const metaRight = p.status

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
                        <Link
                          href={href}
                          prefetch={false}
                          className="outline-none"
                        >
                          <span className="bg-gradient-to-r from-transparent via-transparent to-transparent bg-[length:0_2px] bg-left-bottom bg-no-repeat transition-[background-size] duration-300 group-hover:bg-[length:100%_2px] dark:from-yellow-500/0 dark:to-yellow-500/0">
                            {p.title}
                          </span>
                        </Link>
                      </h3>

                      <p className="mt-3 line-clamp-3 text-sm text-zinc-600 dark:text-zinc-400">
                        {p.summary ?? ''}
                      </p>

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
        </div>

        {/* <div className="mt-6 border-t border-gray-200 py-5 md:mt-10 md:py-10 dark:border-gray-700">
          <h3 className="mb-6 text-2xl leading-9 font-bold tracking-tight text-gray-900 md:mb-8 md:text-3xl dark:text-gray-100">
            Side projects
          </h3>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            {sideProjects.map((pro) => (
              <ProjectCard key={pro.title} project={pro} />
            ))}
          </div>
        </div> */}
      </Container>
    </Container>
  )
}
