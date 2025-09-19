import { allBlogs, allSnippets } from '@/.contentlayer/generated'
import { Container } from '@/components/ui/container'
import { SpotifyNowPlaying } from '@/components/ui/now-playing'
import bgDark from '@/public/static/images/background-dark.webp'
import bgLight from '@/public/static/images/background-light.webp'
import { allCoreContent } from '@/utils/contentlayer'
import { sortPosts } from '@/utils/misc'
import Image from 'next/image'
import BlogHubSection from './_section/BlogSection'
import ProjectsSection from './_section/ProjectSection'
// import Bento from './_section/bento'
import Hero from './_section/hero'

export default function Home() {
  // console.log(allBlogs)
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

      <Container className="relative text-neutral-500 pt-20 mb-20">
        <Hero />
        <ProjectsSection />
        <BlogHubSection
          posts={sortPosts(allBlogs).slice(0, 3)}
          snippets={allSnippets}
        />
        <SpotifyNowPlaying
          className="w-full justify-center truncate [--artist-color:var(--color-gray-500)] md:max-w-[50%] md:justify-start"
          songEffect="underline"
          showCover
        />
      </Container>
    </>
  )
}
