'use client'

import { CreateAppAnimation } from '@/components/animations/animations'
import { HighlightUnderline } from '@/components/ui/highlight-underline'
import { FileText, Github, Linkedin, Mail } from 'lucide-react'
import Link from 'next/link'

function AvailabilityBadge() {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-zinc-300/80 bg-white/70 px-3 py-1 text-xs text-zinc-600 shadow-sm dark:bg-none">
      {/* Dot + beams */}
      <span className="relative inline-flex h-2.5 w-2.5 items-center justify-center">
        {/* core dot */}
        <span className="block h-2.5 w-2.5 rounded-full bg-emerald-500 shadow-[0_0_0_2px_rgba(16,185,129,0.35)]" />
        {/* rotating beam */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-[-6px] rounded-full blur-[6px] animate-[spin_1.6s_linear_infinite]"
          style={{
            background:
              'conic-gradient(from 0deg, rgba(16,185,129,0), rgba(16,185,129,.55), rgba(16,185,129,0))',
          }}
        />
        {/* soft pulse */}
        <span className="pointer-events-none absolute inset-0 rounded-full ring-2 ring-emerald-400/20 animate-[ping_2s_ease-out_infinite]" />
      </span>
      <span className="font-medium">Available for projects</span>
    </div>
  )
}

export default function Hero() {
  return (
    <section className="relative flex min-h-[84vh] items-center">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 px-6 md:grid-cols-2 md:px-10">
        {/* Left: text */}
        <div>
          {/* badge */}
          <AvailabilityBadge />

          {/* heading */}
          <h1 className="mt-6 text-4xl font-extrabold leading-tight text-zinc-900 dark:text-white sm:text-5xl md:text-6xl">
            Hi, I&apos;m Fatih UA
            <br />
          </h1>

          {/* subheading */}
          <p className="mt-5 max-w-xl text-base leading-relaxed text-zinc-600 dark:text-gray-200 sm:text-lg">
            Experienced and versatile Software Engineer turning <br />
            <HighlightUnderline active={true} className="font-semibold">
              ideas{' '}
            </HighlightUnderline>{' '}
            into{' '}
            <span className="font-bold text-primary-500">
              impactful solutions
            </span>{' '}
            through the power of code.
          </p>

          {/* actions */}
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Link
              href="#about"
              className="inline-flex h-12 items-center rounded-2xl border border-zinc-300 bg-white/80 px-6 text-xs font-semibold tracking-wide text-zinc-700 shadow-[0_1px_0_rgba(0,0,0,0.04),0_8px_20px_rgba(24,24,27,0.06)] backdrop-blur transition hover:border-zinc-400 hover:text-zinc-900 hover:shadow-[0_1px_0_rgba(0,0,0,0.05),0_12px_28px_rgba(24,24,27,0.09)]"
            >
              More About Me
            </Link>

            <Link
              href="#contact"
              className="inline-flex h-12 items-center rounded-2xl border border-zinc-300 bg-white/80 px-6 text-xs font-semibold tracking-wide text-zinc-700 shadow-[0_1px_0_rgba(0,0,0,0.04),0_8px_20px_rgba(24,24,27,0.06)] backdrop-blur transition hover:border-zinc-400 hover:text-zinc-900 hover:shadow-[0_1px_0_rgba(0,0,0,0.05),0_12px_28px_rgba(24,24,27,0.09)]"
            >
              Get in Touch
            </Link>
          </div>
        </div>

        {/* Right: animation */}
        <div className="flex justify-center md:justify-end">
          <CreateAppAnimation />
        </div>
      </div>
    </section>
  )
}
