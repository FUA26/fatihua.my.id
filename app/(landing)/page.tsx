import Nav from '@/components/header/Nav'
import { Container } from '@/components/ui/container'
import bgDark from '@/public/static/images/background-dark.jpg'
import bgLight from '@/public/static/images/background-light.jpg'
import Image from 'next/image'
import Hero from './_section/hero'

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
      <Container className="relative text-neutral-500 pt-20">
        <Hero />
      </Container>
    </>
  )
}
