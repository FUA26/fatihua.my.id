'use client'

import { Twemoji } from '@/components/ui/twemoji'
import type { SelectStats, StatsType } from '@/db/schema'
import { useBlogStats, useUpdateBlogStats } from '@/hooks/use-blog-stats'
import clsx from 'clsx'
import { useEffect, useRef, useState } from 'react'

const MAX_REACTIONS = 10 as const

type ReactionKey = 'loves' | 'applauses' | 'bullseyes' | 'ideas'
type ReactionMap = Record<ReactionKey, number>

const ZERO_MAP: ReactionMap = {
  loves: 0,
  applauses: 0,
  bullseyes: 0,
  ideas: 0,
}

const REACTIONS: Array<{ emoji: string; key: ReactionKey }> = [
  { emoji: 'sparkling-heart', key: 'loves' },
  { emoji: 'clapping-hands', key: 'applauses' },
  { emoji: 'bullseye', key: 'bullseyes' },
  { emoji: 'light-bulb', key: 'ideas' },
]

// Paksa nilai jadi number finite (kalau tidak, pakai fallback)
function toNum(v: unknown, fallback = 0): number {
  const n = Number(v)
  return Number.isFinite(n) ? n : fallback
}

export function Reactions({
  type,
  slug,
  className,
}: {
  type: StatsType
  slug: string
  className?: string
}) {
  const [stats, isLoading] = useBlogStats(type, slug)
  const updateReaction = useUpdateBlogStats()

  const [initialReactions, setInitialReactions] =
    useState<ReactionMap>(ZERO_MAP)
  const [reactions, setReactions] = useState<ReactionMap>(ZERO_MAP)

  // Load cache dari localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(`${type}/${slug}`)
      const data = raw ? JSON.parse(raw) : {}
      const next: ReactionMap = {
        loves: toNum(data?.loves, 0),
        applauses: toNum(data?.applauses, 0),
        ideas: toNum(data?.ideas, 0),
        bullseyes: toNum(data?.bullseyes, 0),
      }
      setInitialReactions({ ...next })
      setReactions({ ...next })
    } catch {
      // abaikan
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, slug])

  function handleSave(key: ReactionKey) {
    const base = toNum((stats as any)?.[key], 0)
    const curr = toNum(reactions[key], 0)
    const init = toNum(initialReactions[key], 0)
    // kirim delta ke server
    updateReaction({ type, slug, [key]: base + curr - init } as any)
    // simpan cache
    localStorage.setItem(`${type}/${slug}`, JSON.stringify(reactions))
  }

  return (
    <div className={clsx('flex items-center gap-6', className)}>
      {REACTIONS.map(({ key, emoji }) => {
        const base = toNum((stats as any)?.[key], 0)
        const curr = toNum(reactions[key], 0)
        const init = toNum(initialReactions[key], 0)
        const value = isLoading ? '--' : base + curr - init

        return (
          <Reaction
            key={key}
            path={`${type}/${slug}`}
            react={{ emoji, key }}
            value={value}
            reactions={curr}
            onReact={(v) => setReactions((r) => ({ ...r, [key]: v }))}
            onSave={() => handleSave(key)}
          />
        )
      })}
    </div>
  )
}

function Reaction({
  path,
  react,
  value,
  reactions,
  onReact,
  onSave,
}: {
  path: string
  react: { emoji: string; key: ReactionKey }
  value: string | number
  reactions: number
  onReact: (v: number) => void
  onSave: () => void
}) {
  const { emoji, key } = react
  const [reacting, setReacting] = useState(false)
  const countRef = useRef<HTMLSpanElement>(null)
  let reactingTimeoutId: ReturnType<typeof setTimeout> | undefined

  function handleReact() {
    if (typeof value === 'number') {
      if (reactingTimeoutId) clearTimeout(reactingTimeoutId)
      setReacting(true)

      const safeCurr = toNum(reactions, 0)
      const next = Math.min(MAX_REACTIONS, safeCurr + 1)
      onReact(next)

      if (countRef.current && safeCurr >= MAX_REACTIONS) {
        countRef.current.classList.add('animate-scale-up')
        setTimeout(() => {
          countRef.current?.classList.remove('animate-scale-up')
        }, 150)
      }
    }
  }

  function handleMouseLeave() {
    if (typeof value === 'number' && reacting) {
      reactingTimeoutId = setTimeout(() => {
        setReacting(false)
        onSave()
      }, 1000)
    }
  }

  const displayValue =
    typeof value === 'number' && Number.isFinite(value) ? value : '--'

  return (
    <button
      type="button"
      onClick={handleReact}
      onMouseLeave={handleMouseLeave}
      className="relative flex flex-col items-center justify-center gap-1.5"
      data-umami-event="post-reaction"
      data-umami-event-post={path}
      data-umami-event-react={key}
    >
      <Twemoji emoji={emoji} size="2x" />
      <span className="relative h-6 w-8 overflow-hidden">
        <span
          className={clsx(
            'absolute inset-0',
            'font-semibold text-gray-600 dark:text-gray-300',
            'transition-all',
            reacting ? '-translate-y-6 opacity-0' : 'translate-y-0 opacity-100',
          )}
        >
          {displayValue}
        </span>
        <span
          ref={countRef}
          className={clsx(
            'absolute inset-0',
            'text-gray-500 dark:text-gray-400',
            'transition-all',
            reacting ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0',
          )}
        >
          +{toNum(reactions, 0)}
        </span>
      </span>
    </button>
  )
}
