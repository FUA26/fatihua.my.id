'use client'

import { cn } from '@/lib/utils'
import { Terminal as TerminalIcon } from 'lucide-react'
import {
  Fragment,
  type HTMLAttributes,
  type ReactElement,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

/* ===== helpers ===== */
function usePrefersReducedMotion() {
  const [prefers, setPrefers] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = () => setPrefers(mq.matches)
    setPrefers(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return prefers
}

export function CreateAppAnimation() {
  const installCmd = 'fua create magic-app'

  // timeline (dalam tick)
  const tickTime = 100
  const timeCommandEnter = installCmd.length
  const timeCommandRun = timeCommandEnter + 3
  const timeCommandEnd = timeCommandRun + 3
  const timeWindowOpen = timeCommandEnd + 1
  const timeEnd = timeWindowOpen + 1

  const prefersReduced = usePrefersReducedMotion()
  const [tick, setTick] = useState(prefersReduced ? timeEnd : 0)
  const timerRef = useRef<number | null>(null)

  // start/stop interval dengan rapi
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (prefersReduced) return
    if (tick >= timeEnd) return
    timerRef.current = window.setInterval(() => {
      setTick((prev) => (prev >= timeEnd ? prev : prev + 1))
    }, tickTime)
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current)
      timerRef.current = null
    }
  }, [tick, prefersReduced])

  // restart saat hover/focus hanya kalau sudah selesai
  const restart = () => {
    if (prefersReduced) return
    if (tick >= timeEnd) setTick(0)
  }

  // ==== build lines ====
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  const lines: ReactElement[] = useMemo(() => {
    const out: ReactElement[] = []

    out.push(
      <span key="command_type" className="text-zinc-900 dark:text-zinc-100">
        {installCmd.substring(0, Math.min(tick, timeCommandEnter))}
        {tick < timeCommandEnter && (
          <span
            className="ml-0.5 inline-block h-4 w-[2px] animate-pulse bg-zinc-900 dark:bg-white align-[-2px]"
            aria-hidden
          />
        )}
      </span>,
    )

    if (tick >= timeCommandEnter) out.push(<span key="space"> </span>)

    if (tick > timeCommandRun) {
      out.push(
        <Fragment key="command_response">
          <span className="font-semibold text-zinc-900 dark:text-zinc-100">
            ┌ Create Impactful Solutions 🪄
          </span>
          <span className="text-zinc-400 dark:text-zinc-500">│</span>
          {tick > timeCommandRun + 1 && (
            <>
              <span className="text-zinc-700 dark:text-zinc-300">
                │ ○ add Passion 🤩
              </span>
              <span className="text-zinc-400 dark:text-zinc-500">│</span>
            </>
          )}
          {tick > timeCommandRun + 2 && (
            <>
              <span className="text-zinc-700 dark:text-zinc-300">
                │ ○ add Innovation 🧠
              </span>
              <span className="text-zinc-400 dark:text-zinc-500">│</span>
            </>
          )}
          {tick > timeCommandRun + 3 && (
            <>
              <span className="text-zinc-700 dark:text-zinc-300">
                │ ○ add Efficiency 🌟
              </span>
              <span className="text-zinc-400 dark:text-zinc-500">│</span>
            </>
          )}
        </Fragment>,
      )
    }

    return out
  }, [tick])

  return (
    <div
      className="relative w-full"
      onMouseEnter={restart}
      onFocus={restart}
      // biome-ignore lint/a11y/noNoninteractiveTabindex: <explanation>
      tabIndex={0}
      aria-label="Terminal animation showcasing app creation"
    >
      {/* preview window (glass) */}
      {tick > timeWindowOpen && (
        <LaunchAppWindow
          className={cn(
            'absolute bottom-5 right-4 z-10 w-[min(380px,50vw)]',
            prefersReduced ? '' : 'animate-in fade-in slide-in-from-top-8',
          )}
        />
      )}

      {/* terminal shell (glass, border halus, menyatu dengan aurora) */}
      <pre
        className={cn(
          'overflow-hidden rounded-xl border font-mono text-[13px]/6',
          'border-zinc-300/80 bg-white/70 backdrop-blur',
          'shadow-[0_1px_0_rgba(0,0,0,0.04),0_10px_30px_rgba(24,24,27,0.08)]',
          'dark:border-white/10 dark:bg-zinc-900/60 dark:shadow-[0_1px_0_rgba(255,255,255,0.04),0_10px_30px_rgba(0,0,0,0.35)]',
        )}
      >
        {/* header bar */}
        <div className="flex items-center justify-between gap-2 border-b px-4 py-2 text-xs text-zinc-700 dark:text-zinc-200 border-zinc-300/70 dark:border-white/10 bg-white/60 dark:bg-zinc-900/60 backdrop-blur">
          <div className="flex gap-1">
            <div className="h-2 w-2 rounded-full bg-zinc-400" />
            <div className="h-2 w-2 rounded-full bg-emerald-400" />
            <div className="h-2 w-2 rounded-full bg-rose-400" />
          </div>
          <div className="flex items-center gap-1">
            <TerminalIcon className="h-4 w-4" />
            <span className="font-semibold">Terminal</span>
          </div>
          <div className="w-12" />
        </div>

        {/* output */}
        <div className="min-h-[200px] bg-gradient-to-b from-white/0 to-white/40 dark:from-transparent dark:to-black/20 text-left [mask-image:linear-gradient(to_bottom,white,transparent)]">
          <code className="grid gap-1 p-4">{lines}</code>
        </div>
      </pre>
    </div>
  )
}

function LaunchAppWindow(props: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={cn(
        'overflow-hidden rounded-xl border shadow-lg',
        'border-zinc-300/80 bg-white/70 backdrop-blur',
        'dark:border-white/10 dark:bg-zinc-900/60',
        props.className,
      )}
    >
      <div className="relative flex h-7 items-center gap-2 border-b px-3 text-xs text-zinc-700 dark:text-zinc-200 border-zinc-300/70 dark:border-white/10 bg-white/60 dark:bg-zinc-900/60">
        <div className="flex gap-1">
          <div className="h-2 w-2 rounded-full bg-zinc-400" />
          <div className="h-2 w-2 rounded-full bg-emerald-400" />
          <div className="h-2 w-2 rounded-full bg-rose-400" />
        </div>
        <div className="mx-auto h-3 w-24 rounded bg-zinc-300/60 dark:bg-white/10" />
      </div>

      <div className="flex flex-col items-center gap-2 p-5 text-sm">
        <span className="text-2xl">🎉</span>
        <h2 className="font-semibold text-zinc-900 dark:text-zinc-100">
          The Magic Happens!
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400">
          Your app just booted up.
        </p>
      </div>
    </div>
  )
}
