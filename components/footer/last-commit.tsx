import { Link } from '@/components/ui/link'
import { SITE_METADATA } from '@/data/site-metadata'
import type { GithubRepository } from '@/types/data'
import { fetcher } from '@/utils/misc'
import useSWR from 'swr'

export function LastCommit() {
  let siteRepo = SITE_METADATA.siteRepo.replace('https://github.com/', '')
  let { data: repo } = useSWR<GithubRepository>(
    `/api/github?repo=${siteRepo}`,
    fetcher,
  )

  if (!repo?.lastCommit) return null

  // ambil authorName dari owner repo
  let authorName = repo.owner.login

  // Opsi 1: Tahun sekarang
  let year = new Date().getFullYear()

  // Opsi 2: Tahun dari commit terakhir
  // let year = new Date(repo.lastCommit.committedDate).getFullYear()

  // Format last updated (contoh: 19 Sep 2025)
  let lastUpdated = new Date(repo.lastCommit.committedDate).toLocaleDateString(
    'en-US',
    { year: 'numeric', month: 'short', day: 'numeric' },
  )

  return (
    <div className="flex gap-2 justify-between">
      <div className="mx-auto mt-6 flex max-w-6xl w-full items-center justify-between px-4 py-4 text-xs text-zinc-500 dark:text-zinc-500 sm:px-6 lg:px-8">
        <p>
          © {year} {authorName}. All rights reserved.
        </p>
        {lastUpdated && (
          <p className="text-right">
            Last updated by {authorName} on {lastUpdated}
          </p>
        )}
      </div>
    </div>
  )
}
