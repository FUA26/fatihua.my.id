'use client'

import type { StatsType } from '@/db/schema'
import { useBlogStats, useUpdateBlogStats } from '@/hooks/use-blog-stats'
import { useEffect } from 'react'

export function ViewsCounter({
  type,
  slug,
  className,
}: {
  type: StatsType
  slug: string
  className?: string
}) {
  let [stats, isLoading] = useBlogStats(type, slug)
  let updateView = useUpdateBlogStats()

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (!isLoading && stats) {
      updateView({ type, slug, views: stats.views + 1 })
    }
  }, [stats, isLoading])

  return (
    <span className={className}>
      {isLoading ? '---' : `${stats.views || 0} views`}
    </span>
  )
}
