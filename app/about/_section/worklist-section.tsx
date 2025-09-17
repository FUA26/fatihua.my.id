import { formatDate } from '@/utils/misc'
import { calculateDuration } from '@/utils/timeUtils'
import Image from 'next/image'
import Link from 'next/link'

const worksHistory = [
  {
    title: 'Freelance',
    roles: [
      {
        role: 'Fullstack Developer',
        startDate: '07-31-2023',
        endDate: '',
      },
    ],
    startDate: '08-01-2023',
    endDate: '12-09-2021',
    src: '/static/images/FUA_logo.svg',
    url: 'https://fatihua.com/',
  },
  {
    title: 'Machine Vision',
    roles: [
      {
        role: 'Tech Lead',
        startDate: '10-31-2023',
        endDate: '04-31-2024',
      },
      {
        role: 'Freelance Frontend Developer',
        startDate: '06-01-2023',
        endDate: '08-31-2023',
      },
    ],
    startDate: '08-01-2023',
    endDate: '12-09-2021',
    src: '/static/images/MV-logo.webp',
    url: 'https://www.machinevision.global/',
  },
  {
    title: 'Sepasang Janji',
    roles: [
      {
        role: 'CO-Founder',
        startDate: '12-15-2019',
        endDate: '05-01-2023',
      },
    ],
    startDate: '13-09-2021',
    endDate: '01-31-2023',
    src: '/static/images/sepasang_logo.webp',
    url: 'https://sepasangjanji.com/',
  },
  {
    title: 'PT. Majoo Teknologi',
    roles: [
      {
        role: 'Senior Associate Project Manager',
        startDate: '09-15-2021',
        endDate: '06-31-2023',
      },
    ],
    startDate: '13-09-2021',
    endDate: '01-31-2023',
    src: '/static/images/majoo_logo.webp',
    url: 'https://majoo.id/',
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
      {
        role: 'Web Developer',
        startDate: '11-31-2018',
        endDate: '10-10-2020',
      },
    ],
    startDate: '11-31-2018',
    endDate: '09-15-2021',
    src: '/static/images/vascomm_logo.webp',
    url: 'https://vascomm.co.id/',
  },
]

export default function SectionWorkList() {
  return (
    <div className="mt-5 rounded-lg bg-white shadow transition hover:shadow-lg dark:bg-gray-800 dark:shadow-gray-700/25">
      {worksHistory.map((work) => (
        <div
          className="block border-b-2 border-dotted border-foreground/10 transition first-of-type:rounded-t-lg last-of-type:rounded-b-lg last-of-type:border-0 last-of-type:pb-6"
          key={work.title}
          rel="noreferrer noopener"
        >
          <div
            key={work.title}
            className="flex flex-row items-start justify-between px-3 pt-6 md:items-center md:space-x-2 md:px-6"
          >
            <EmployerItem src={work.src} title={work.title} />
            <div className="flex w-fit items-center justify-between space-x-4 hover:animate-pulse md:w-fit">
              <div className="flex items-center space-x-2">
                <Link href={work.url} target="_blank">
                  <span className="text-tertiary mb-1 leading-snug">↗</span>
                </Link>
              </div>
            </div>
          </div>
          {work.roles.map((role) => (
            <div
              key={role.role}
              className="flex flex-col items-start justify-between px-3 py-2 last-of-type:pb-6 md:flex-row md:items-center md:space-x-2"
            >
              <div className="flex w-full items-center justify-between space-x-4 md:w-fit">
                <span className="text-base text-foreground md:pl-[76px]">
                  {role.role}
                </span>
              </div>
              <div className="flex w-full flex-col items-end justify-between pr-4 md:w-fit md:space-x-4">
                <span className="text-sm text-foreground">
                  {role.endDate
                    ? `${formatDate(role.startDate)} - ${formatDate(role.endDate)}`
                    : `${formatDate(role.startDate)} - Present`}
                </span>
                {role.endDate && (
                  <span className="text-sm text-foreground">
                    {calculateDuration(role.startDate, role.endDate)}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

type EmployerItem = {
  title: string
  src: string
}

export function EmployerItem({ title, src }: EmployerItem) {
  return (
    <div className="flex-column flex items-center md:flex-row md:space-x-3">
      <div className="hidden h-16 w-16 p-1 md:block">
        <Image src={src} alt={`${title} logo`} width={64} height={64} />
      </div>
      <h3 className="text-xl font-semibold">{title}</h3>
    </div>
  )
}
