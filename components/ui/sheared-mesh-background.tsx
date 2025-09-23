import { clsx } from 'clsx'
import * as React from 'react'

type Props = {
  className?: string
  /** Jarak antar garis (px). Default 28 */
  gap?: number
  /** Kemiringan (deg, + = miring ke kanan). Default -14 */
  angle?: number
  /** Opacity garis (0–1). Default 0.12 di light, 0.10 di dark */
  opacityLight?: number
  opacityDark?: number
  /** Skala tinggi SVG agar pola melebar ke luar container. Default 1.4 */
  scaleY?: number
}

/**
 * ShearedMeshBackground
 * - Pola mesh tipis dengan kemiringan halus.
 * - Memudar di tepi lewat mask radial.
 * - Warna mengikuti `currentColor` (otomatis light/dark).
 *
 * Contoh pakai:
 * <div className="relative">
 *   <ShearedMeshBackground className="absolute inset-0 text-black/80 dark:text-white/80" />
 *   ...content...
 * </div>
 */
export function ShearedMeshBackground({
  className,
  gap = 28,
  angle = -14,
  opacityLight = 0.12,
  opacityDark = 0.1,
  scaleY = 1.4,
}: Props) {
  const id = React.useId()

  return (
    <div
      className={clsx(
        'pointer-events-none absolute inset-0 overflow-hidden',
        // memudar di tepi; ganti ke linear-gradient kalau mau
        '[mask-image:radial-gradient(65%_60%_at_50%_40%,black,transparent)]',
        className,
      )}
      aria-hidden
    >
      {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
      <svg
        className="h-[140%] w-[140%] -translate-x-[15%] -translate-y-[10%]"
        viewBox={`0 0 ${gap * 100} ${gap * 100}`}
        xmlns="http://www.w3.org/2000/svg"
        style={{
          transform: `skewY(${angle}deg) scaleY(${scaleY})`,
        }}
      >
        {/* pattern garis tipis */}
        <defs>
          <pattern
            id={`${id}-mesh`}
            width={gap}
            height={gap}
            patternUnits="userSpaceOnUse"
          >
            {/* garis horizontal */}
            <path
              d={`M 0 ${gap} H ${gap}`}
              stroke="currentColor"
              strokeWidth="1"
              // light/dark opacity beda biar proporsional
              className="opacity-[var(--mesh-opacity)]"
            />
            {/* garis vertikal */}
            <path
              d={`M ${gap} 0 V ${gap}`}
              stroke="currentColor"
              strokeWidth="1"
              className="opacity-[var(--mesh-opacity)]"
            />
            {/* titik halus di pertemuan garis (beda dari grid biasa) */}
            <circle
              cx={gap}
              cy={gap}
              r="0.75"
              fill="currentColor"
              className="opacity-[calc(var(--mesh-opacity)*0.9)]"
            />
          </pattern>

          {/* highlight lembut diagonal (supaya beda feel) */}
          <linearGradient id={`${id}-sheen`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.0" />
            <stop offset="60%" stopColor="currentColor" stopOpacity="0.06" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0.0" />
          </linearGradient>
        </defs>

        {/* variabel CSS untuk kontrol opacity light/dark */}
        <style>{`
          :where(svg) {
            --mesh-opacity: ${opacityLight};
          }
          :where(html.dark) svg {
            --mesh-opacity: ${opacityDark};
          }
        `}</style>

        {/* isi pola */}
        <rect
          x="0"
          y="0"
          width={gap * 100}
          height={gap * 100}
          fill={`url(#${id}-mesh)`}
        />
        {/* lapisan sheen halus supaya tidak flat */}
        <rect
          x="0"
          y="0"
          width={gap * 100}
          height={gap * 100}
          fill={`url(#${id}-sheen)`}
        />
      </svg>
    </div>
  )
}
