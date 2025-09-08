import SiteFooter from '@/components/footer/SiteFooter'
import Nav from '@/components/header/Nav'
import { Container } from '@/components/ui/container'
import bgDark from '@/public/static/images/background-dark.webp'
import bgLight from '@/public/static/images/background-light.webp'
import Image from 'next/image'
import BlogSection from './_section/BlogSection'
import BlogHubSection from './_section/BlogSection'
import ProjectsSection from './_section/ProjectSection'
import Bento from './_section/bento'
import Hero from './_section/hero'

const POSTS = [
  {
    id: 'tooltip-arrows',
    date: 'Dec 15, 2024',
    readTime: '5 min read',
    title: 'Hacky Way to Customize shadcn Tooltip Arrows',
    description:
      'A workaround for using a custom SVG arrow in shadcn/ui Tooltip.',
    href: '/blog/tooltip-arrows',
    image: '/images/blog/tooltip.jpg',
    imageAlt: 'Exit sign',
    tags: ['react', 'css'],
  },
  {
    id: 'zod-defaults',
    date: 'Dec 12, 2024',
    readTime: '3 min read',
    title: 'Setting Dynamic Default Values with Zod',
    description:
      'Use Zod to set dynamic defaults and boost validation flexibility.',
    href: '/blog/zod-defaults',
    image: '/images/blog/zod.jpg',
    imageAlt: 'Starfish on sand',
    tags: ['zod', 'typescript'],
  },
]

const SNIPPETS = [
  {
    id: 'next-cache-bust',
    date: 'Jan 05, 2025',
    title: 'Force cache-bust a fetch in Next.js App Router',
    description:
      "Add `cache: 'no-store'` or a versioned query to bypass cache.",
    href: '/snippets/next-cache-bust',
    tags: ['nextjs'],
  },
  {
    id: 'css-text-balance',
    date: 'Dec 28, 2024',
    title: 'CSS: nicer headings with text-wrap: balance',
    description: 'One-liner to improve multi-line heading rag.',
    href: '/snippets/css-text-balance',
    tags: ['css'],
  },
]

export default function Home() {
  return (
    <>
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden
      >
        <div className="absolute -top-6 h-screen -left-32 -right-8 sm:left-0 sm:-right-6 blur">
          {/* Light */}
          <Image
            src={bgLight}
            alt="Background"
            width={3840}
            height={2160}
            priority
            sizes="100vw"
            className="w-full h-auto dark:hidden"
            placeholder="blur"
          />

          {/* Dark */}
          <Image
            src={bgDark}
            alt="Background (Dark)"
            width={3840}
            height={2160}
            priority
            sizes="100vw"
            className="hidden w-full h-auto dark:block"
            placeholder="blur"
          />
        </div>
      </div>
      <Nav />

      {/* <div className="relative text-neutral-500">
        <h1>Hello World</h1>
    </div> */}
      <Container className="relative text-neutral-500 pt-20 mb-20">
        <Hero />
        <ProjectsSection />
        <BlogHubSection posts={POSTS} snippets={SNIPPETS} />
      </Container>
      <SiteFooter
        authorName="FUA"
        tagline="Crafting solutions that make ideas come alive."
        lastUpdated="July 18, 2025 at 5:20 PM UTC+7"
      />
    </>
  )
}
