'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useId, useRef, useState } from 'react'
import { KbarSearchTrigger } from '../search/kbar-trigger'
import { Logo } from '../ui/logo'
import { ModeToggle } from '../ui/toggle-theme'

/** -------------------------------------------------
 *  UX goals
 *  - Mobile: fixed glass bar with drawer
 *  - Desktop: sticky, glass group with menu + CTA; logo fades out after scroll threshold
 *  - No layout shift when logo hides (reserve width)
 *  - Respect prefers-reduced-motion
 *  - Strong a11y: focus styles, ESC to close, body-scroll lock on drawer
 * -------------------------------------------------- */

/* ======================
 * Shared primitives
 * ====================== */

const NAV_ITEMS = [
  { href: '/', label: 'Home' },
  { href: '/blog', label: 'Blogs' },
  { href: '/projects', label: 'Projects' },
  { href: '/about', label: 'About' },
] as const

/* ======================
 * Hooks
 * ====================== */
function useBodyScrollLock(locked: boolean) {
  useEffect(() => {
    const body = document.body
    if (locked) body.classList.add('overflow-hidden')
    else body.classList.remove('overflow-hidden')
    return () => body.classList.remove('overflow-hidden')
  }, [locked])
}

function useEsc(callback: () => void) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') callback()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [callback])
}

function useScrolled(threshold = 88) {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    let ticking = false
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > threshold)
          ticking = false
        })
        ticking = true
      }
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold])
  return scrolled
}

/* ======================
 * Components
 * ====================== */
function GlassGroup({
  children,
  className = '',
}: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={[
        'rounded-full ring-1 backdrop-blur-xl',
        'bg-white/70 dark:bg-zinc-900/60',
        'ring-zinc-900/10 dark:ring-white/10',
        'shadow-[0_1px_0_rgba(0,0,0,0.03)]',
        'motion-safe:transition',
        className,
      ].join(' ')}
    >
      {children}
    </div>
  )
}

function DesktopNav({ scrolled }: { scrolled: boolean }) {
  return (
    <div className="hidden md:block">
      {/* Bar fixed penuh, konten di-center */}
      <div className="fixed inset-x-0 top-0 z-40">
        <div className="mx-auto w-full max-w-7xl px-8 lg:px-10">
          {/* Offset aman dari atas (safe area) */}
          <div className="mt-[max(12px,env(safe-area-inset-top))] flex items-center justify-between pt-3 lg:pt-5">
            <Link
              href="/"
              aria-label="Home"
              className="flex items-center gap-3"
            >
              {/* Reserve width agar tidak shift saat logo hide */}
              <div
                className={[
                  'h-6 w-[120px] lg:w-[140px] flex items-center',
                  'transition-all motion-safe:duration-200 motion-reduce:transition-none',
                  scrolled
                    ? 'opacity-0 -translate-y-1 pointer-events-none'
                    : 'opacity-100 translate-y-0',
                ].join(' ')}
              >
                <Logo className="h-6" />
              </div>
              <span className="sr-only">Home</span>
            </Link>

            <GlassGroup className={scrolled ? 'shadow-md/20' : ''}>
              <div className="flex h-12 items-center gap-4 px-2">
                <ul className="flex items-center gap-1 pl-2">
                  {NAV_ITEMS.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="inline-flex h-9 items-center rounded-md px-3 text-zinc-600 hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-black/10 dark:focus-visible:ring-white/20 transition"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>

                <div className="h-6 w-px bg-zinc-900/10 dark:bg-white/10" />

                <ModeToggle />
                <KbarSearchTrigger />
                <Link
                  href="#get-started"
                  className="inline-flex h-9 items-center rounded-full px-4 bg-zinc-950 text-white hover:bg-black dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-black/20 dark:focus-visible:ring-white/30 shadow-[0_1px_0_rgba(0,0,0,0.04)]"
                >
                  Get Started
                </Link>
              </div>
            </GlassGroup>
          </div>
        </div>
      </div>
    </div>
  )
}

function MobileNav() {
  const [open, setOpen] = useState(false)
  const menuId = useId()
  const panelRef = useRef<HTMLDivElement | null>(null)

  useBodyScrollLock(open)
  useEsc(() => setOpen(false))

  // Close when clicking outside panel (but not backdrop, which closes too)
  useEffect(() => {
    if (!open) return
    const onDown = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', onDown)
    return () => document.removeEventListener('mousedown', onDown)
  }, [open])

  return (
    <div className="fixed inset-x-0 top-3 z-50 px-4 md:hidden">
      <GlassGroup>
        <div className="flex h-12 items-center justify-between rounded-full px-4">
          <Link href="/" aria-label="Home" className="flex items-center gap-2">
            <Logo className="h-5" />
          </Link>

          <button
            type="button"
            onClick={() => setOpen((s) => !s)}
            aria-expanded={open}
            aria-controls={menuId}
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="grid h-9 w-9 place-items-center rounded-full hover:bg-zinc-950/[0.03] dark:hover:bg-white/[0.06] focus:outline-none focus-visible:ring-2 focus-visible:ring-black/20 dark:focus-visible:ring-white/30 transition"
          >
            <span className="sr-only">Toggle menu</span>
            {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
            <svg
              viewBox="0 0 24 24"
              className={[
                'h-5 w-5 text-zinc-900 dark:text-zinc-100 transition-transform motion-safe:duration-200',
                open ? 'rotate-90' : '',
              ].join(' ')}
              xmlns="http://www.w3.org/2000/svg"
            >
              {open ? (
                <path
                  className="fill-current"
                  fillRule="evenodd"
                  d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
                />
              ) : (
                <path
                  className="fill-current"
                  fillRule="evenodd"
                  d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm.75 4.5a.75.75 0 0 0 0 1.5h12.5a.75.75 0 0 0 0-1.5H3.75Z"
                />
              )}
            </svg>
          </button>
        </div>
      </GlassGroup>

      {/* Backdrop */}
      <div
        className={[
          open
            ? 'pointer-events-auto opacity-100'
            : 'pointer-events-none opacity-0',
          'fixed inset-0 z-40 transition-opacity motion-safe:duration-200 bg-black/20 dark:bg-black/40',
        ].join(' ')}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <div
        id={menuId}
        // biome-ignore lint/a11y/useSemanticElements: <explanation>
        role="dialog"
        aria-modal="true"
        ref={panelRef}
        className={[
          open ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0',
          'mt-2 rounded-2xl p-2 relative z-50',
          'bg-white/70 dark:bg-zinc-900/60 ring-1 ring-zinc-900/10 dark:ring-white/10 backdrop-blur-xl',
          'transition motion-safe:duration-200',
        ].join(' ')}
      >
        <ul className="divide-y divide-zinc-900/5 dark:divide-white/10">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={() => setOpen(false)}
                className="block px-3 py-2 text-zinc-700 dark:text-zinc-200 hover:text-zinc-950 dark:hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-black/10 dark:focus-visible:ring-white/20 rounded-md transition"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-2 flex items-center justify-between px-1">
          <button
            type="button"
            className="h-10 rounded-md px-2 text-zinc-700 dark:text-zinc-200 hover:bg-zinc-950/[0.03] dark:hover:bg-white/[0.06] focus:outline-none focus-visible:ring-2 focus-visible:ring-black/10 dark:focus-visible:ring-white/20 transition"
          >
            <span className="font-mono uppercase text-xs">EN</span>
          </button>

          <Link
            href="#get-started"
            className="inline-flex h-10 items-center rounded-full px-4 bg-zinc-950 text-white hover:bg-black dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-black/20 dark:focus-visible:ring-white/30 shadow-[0_1px_0_rgba(0,0,0,0.04)]"
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  )
}

/* ======================
 * Main Nav export
 * ====================== */
export default function Nav() {
  const scrolled = useScrolled(88)
  return (
    <nav className="relative z-50 w-full">
      {/* Mobile */}
      <MobileNav />

      {/* Spacer to avoid overlap with mobile fixed bar */}
      <div className="h-[64px] md:hidden" />

      {/* Desktop */}
      <DesktopNav scrolled={scrolled} />
    </nav>
  )
}
