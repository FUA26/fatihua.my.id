// components/analytics/umami.tsx
'use client'

import Script from 'next/script'

type UmamiAnalyticsProps = {
  websiteId?: string
  /** URL penuh ke script Umami, contoh:
   *  https://umami.example.com/script.js
   *  (Hindari default /stats/script.js jika proxy belum diset)
   */
  src?: string
  /** Opsional: jika pakai custom domain tracking */
  dataDomains?: string
}

export function UmamiAnalytics({
  websiteId,
  src,
  dataDomains,
}: UmamiAnalyticsProps) {
  // Hanya render di production
  if (process.env.NODE_ENV !== 'production') return null

  const id = websiteId || process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID || ''

  const scriptSrc = src || process.env.NEXT_PUBLIC_UMAMI_SRC || ''

  // Jika env/props belum diisi, jangan render (hindari request 404)
  if (!id || !scriptSrc) return null

  return (
    <Script
      src={scriptSrc}
      data-website-id={id}
      // data-host={process.env.NEXT_PUBLIC_UMAMI_HOST} // opsional jika perlu
      {...(dataDomains ? ({ 'data-domains': dataDomains } as any) : {})}
      strategy="afterInteractive"
    />
  )
}
