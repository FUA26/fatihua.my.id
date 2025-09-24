import { formatDate } from '@/utils/misc'
import { calculateDuration } from '@/utils/timeUtils'
import Image from 'next/image'
import Link from 'next/link'

type WorkRole = {
  role: string
  startDate: string
  endDate?: string
}

type WorkItem = {
  title: string
  roles: WorkRole[]
  startDate: string
  endDate?: string
  src: string
  url: string
  invertLogoOnDark?: boolean // opsional: set true jika logo gelap
}

const worksHistory: WorkItem[] = [
  {
    title: 'Freelance',
    roles: [{ role: 'Fullstack Developer', startDate: '07-31-2023' }],
    startDate: '08-01-2023',
    src: '/static/images/FUA_logo.svg',
    url: 'https://fatihua.com/',
    invertLogoOnDark: false,
  },
  {
    title: 'Machine Vision',
    roles: [
      { role: 'Tech Lead', startDate: '10-31-2023', endDate: '04-30-2024' }, // 04-31 invalid → 04-30
      {
        role: 'Freelance Frontend Developer',
        startDate: '06-01-2023',
        endDate: '08-31-2023',
      },
    ],
    startDate: '08-01-2023',
    src: '/static/images/mv_logo.webp',
    url: 'https://www.machinevision.global/',
    invertLogoOnDark: false,
  },
  {
    title: 'Sepasang Janji',
    roles: [
      { role: 'CO-Founder', startDate: '12-15-2019', endDate: '05-01-2023' },
    ],
    startDate: '09-13-2021', // 13-09-2021 invalid (MM-DD-YYYY) → 09-13-2021
    endDate: '01-31-2023',
    src: '/static/images/sepasang_logo.webp',
    url: 'https://sepasangjanji.com/',
    invertLogoOnDark: false,
  },
  {
    title: 'PT. Majoo Teknologi',
    roles: [
      {
        role: 'Senior Associate Project Manager',
        startDate: '09-15-2021',
        endDate: '06-30-2023',
      },
    ], // 06-31 invalid → 06-30
    startDate: '09-13-2021', // 13-09-2021 → 09-13-2021
    endDate: '01-31-2023',
    src: '/static/images/majoo_logo.webp',
    url: 'https://majoo.id/',
    invertLogoOnDark: false,
  },
  {
    title: 'PT. Vascomm Solusi Teknologi',
    roles: [
      {
        role: 'Fullstack Developer',
        startDate: '01-01-2021',
        endDate: '09-15-2021',
      },
      {
        role: 'System Analyst',
        startDate: '10-10-2020',
        endDate: '01-01-2021',
      },
      { role: 'Web Developer', startDate: '11-30-2018', endDate: '10-10-2020' }, // 11-31 invalid → 11-30
    ],
    startDate: '11-30-2018', // 11-31 invalid → 11-30
    endDate: '09-15-2021',
    src: '/static/images/vascomm_logo.webp',
    url: 'https://vascomm.co.id/',
    invertLogoOnDark: false,
  },
]

export default function SectionWorkList() {
  return (
    <div className="mt-5 rounded-lg bg-zinc-50 shadow transition hover:shadow-lg dark:bg-zinc-900 dark:shadow-black/10">
      <div className="divide-y divide-zinc-200/60 dark:divide-zinc-800/60">
        {worksHistory.map((work) => (
          <section key={work.title} className="px-3 pt-6 md:px-6">
            {/* Header: employer + link */}
            <div className="flex flex-row items-start justify-between md:items-center md:space-x-2">
              <EmployerItem
                src={work.src}
                title={work.title}
                invertOnDark={work.invertLogoOnDark}
              />
              <div className="flex w-fit items-center justify-between space-x-4 md:w-fit">
                <Link
                  href={work.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="rounded px-1 text-sm text-zinc-700 underline-offset-4 transition hover:underline focus:outline-none focus:ring-2 focus:ring-zinc-400 dark:text-zinc-300 dark:focus:ring-zinc-600"
                  aria-label={`${work.title} website`}
                >
                  ↗
                </Link>
              </div>
            </div>

            {/* Roles */}
            <div className="mt-3">
              {work.roles.map((role) => (
                <div
                  key={`${work.title}-${role.role}-${role.startDate}`}
                  className="flex flex-col items-start justify-between py-2 last:pb-6 md:flex-row md:items-center md:space-x-2"
                >
                  <div className="flex w-full items-center justify-between md:w-fit">
                    <span className="text-base text-zinc-900 dark:text-zinc-100 md:pl-[76px]">
                      {role.role}
                    </span>
                  </div>
                  <div className="flex w-full flex-col items-end md:w-fit md:items-start md:space-x-0">
                    <span className="text-sm text-zinc-600 dark:text-zinc-400">
                      {role.endDate
                        ? `${formatDate(role.startDate)} - ${formatDate(role.endDate)}`
                        : `${formatDate(role.startDate)} - Present`}
                    </span>
                    {role.endDate && (
                      <span className="text-sm text-zinc-500 dark:text-zinc-500">
                        {calculateDuration(role.startDate, role.endDate)}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}

type EmployerItemProps = {
  title: string
  src: string
  invertOnDark?: boolean
}

export function EmployerItem({
  title,
  src,
  invertOnDark = false,
}: EmployerItemProps) {
  return (
    <div className="flex-column flex items-center md:flex-row md:space-x-3">
      <div className="hidden h-16 w-16 p-1 md:block">
        <Image
          src={src}
          alt={`${title} logo`}
          width={64}
          height={64}
          className={invertOnDark ? 'dark:invert' : ''}
        />
      </div>
      <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
        {title}
      </h3>
    </div>
  )
}
