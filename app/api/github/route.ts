import { fetchRepoData } from '@/utils/github'
import type { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  let { searchParams: params } = new URL(request.url)
  let repo = params.get('repo')
  if (!repo) {
    return Response.json(
      { message: 'Missing repo parameter' },
      {
        status: 400,
      },
    )
  }
  if (repo === 'undefined' || repo === 'null') {
    return Response.json(null)
  }
  let data = await fetchRepoData({ repo, includeLastCommit: true })
  // console.log(data)
  return Response.json(data)
}
