// app/layout.tsx

import clsx from 'clsx'
import type { Metadata, Viewport } from 'next'
import { JetBrains_Mono, Plus_Jakarta_Sans } from 'next/font/google'
import '@/css/globals.css'
import { UmamiAnalytics } from '@/components/analytics/umami'
import { KBarSearchProvider } from '@/components/search/kbar-provider'
import { SITE_METADATA } from '@/data/site-metadata'
import { ThemeProviders } from './theme-providers'

const FONT_SANS = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-plusjakarta',
  weight: ['200', '300', '400', '500', '600', '700', '800'],
})
const FONT_JB_MONO = JetBrains_Mono({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-jetbrains-mono',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_METADATA.siteUrl),
  title: {
    default: SITE_METADATA.title,
    template: `%s | ${SITE_METADATA.title}`,
  },
  description: SITE_METADATA.description,
  openGraph: {
    title: SITE_METADATA.title,
    description: SITE_METADATA.description,
    url: '/',
    siteName: SITE_METADATA.title,
    images: [SITE_METADATA.socialBanner],
    locale: 'en_US',
    type: 'website',
  },
  alternates: {
    canonical: '/',
    types: { 'application/rss+xml': `${SITE_METADATA.siteUrl}/feed.xml` },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_METADATA.title,
    images: [SITE_METADATA.socialBanner],
  },
  icons: {
    icon: [
      { url: '/static/favicons/favicon.ico', sizes: 'any' },
      {
        url: '/static/favicons/favicon-32x32.png',
        type: 'image/png',
        sizes: '32x32',
      },
      {
        url: '/static/favicons/favicon-16x16.png',
        type: 'image/png',
        sizes: '16x16',
      },
    ],
    // Apple touch icon sebaiknya 180x180 PNG
    apple: [{ url: '/static/favicons/apple-touch-icon.png', sizes: '180x180' }],
    other: [
      {
        rel: 'mask-icon',
        url: '/static/favicons/safari-pinned-tab.svg',
        color: '#5bbad5',
      },
    ],
  },
  manifest: '/static/favicons/site.webmanifest',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang={SITE_METADATA.language} suppressHydrationWarning>
      <body
        className={clsx(
          'w-full overflow-x-hidden scroll-smooth antialiased',
          FONT_JB_MONO.variable,
          FONT_SANS.variable,
        )}
      >
        <ThemeProviders>
          <UmamiAnalytics
            websiteId={SITE_METADATA.analytics.umamiAnalytics.websiteId}
          />
          <KBarSearchProvider configs={SITE_METADATA.search.kbarConfigs}>
            <main className="mb-auto grow">{children}</main>
          </KBarSearchProvider>
        </ThemeProviders>
      </body>
    </html>
  )
}
