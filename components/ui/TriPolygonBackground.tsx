import { clsx } from 'clsx'
import * as React from 'react'

type Props = {
  className?: string
  /** Jarak antar titik (px). Default 36 */
  gap?: number
  /** Ketebalan garis. Default 1 */
  strokeWidth?: number
  /** Derajat kemiringan (skew Y). Default -12 */
  angle?: number
  /** Seberapa tinggi diperbesar untuk bleed. Default 1.35 */
  scale?: number
  /** 0–1: opasitas garis di light mode. Default 0.14 */
  opacityLight?: number
  /** 0–1: opasitas garis di dark mode. Default 0.12 */
  opacityDark?: number
  /** 0–1: jitter acak pada titik (low-poly vibe). Default 0 */
  jitter?: number
  /** Seed untuk jitter agar deterministik */
  seed?: number
}

/**
 * TriPolygonBackground
 * - Pola polygon segitiga (triangular tessellation).
 * - Mendukung tilt, radial mask, dan light/dark via currentColor.
 * - Opsi jitter untuk tampilan low-poly halus (tanpa lib eksternal).
 *
 * Contoh:
 * <div className="relative">
 *   <TriPolygonBackground className="absolute inset-0 text-black/80 dark:text-white/80" jitter={0.18}/>
 *   ...content...
 * </div>
 */
export function TriPolygonBackground({
  className,
  gap = 36,
  strokeWidth = 1,
  angle = -12,
  scale = 1.35,
  opacityLight = 0.14,
  opacityDark = 0.12,
  jitter = 0,
  seed = 7,
}: Props) {
  // pseudo RNG sederhana agar jitter konsisten
  const rand = React.useMemo(() => {
    let s = seed >>> 0
    return () => {
      // xorshift32
      s ^= s << 13
      s ^= s >>> 17
      s ^= s << 5
      return ((s >>> 0) % 1000) / 1000
    }
  }, [seed])

  // utility jitter dalam range [-jitter, +jitter] * gap
  const j = (base: number) => {
    if (jitter <= 0) return base
    const r = (rand() * 2 - 1) * jitter * gap
    return base + r
  }

  const id = React.useId()

  // pattern segitiga: pakai dua segitiga dalam satu tile (up & down)
  // tile ukuran: width = gap, height = gap * sqrt(3)/2 (tinggi segitiga sama sisi)
  const h = (Math.sqrt(3) / 2) * gap

  // titik2 (dengan jitter) dalam satu tile
  const A = { x: j(0), y: j(0) }
  const B = { x: j(gap / 2), y: j(h) }
  const C = { x: j(gap), y: j(0) }
  const D = { x: j(gap / 2), y: j(0) } // mid-top untuk variasi garis (opsional)

  // path untuk dua segitiga (up & down)
  const triUp = `M ${A.x} ${A.y} L ${B.x} ${B.y} L ${C.x} ${C.y} Z`
  const triDown = `M ${A.x} ${A.y} L ${j(gap / 2)} ${j(0)} L ${C.x} ${C.y} Z`

  return (
    <div
      className={clsx(
        'pointer-events-none absolute inset-0 overflow-hidden',
        // radial mask: memudar di tepi
        '[mask-image:radial-gradient(60%_55%_at_50%_40%,black,transparent)]',
        className,
      )}
      aria-hidden
    >
      {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
      <svg
        className="h-[140%] w-[140%] -translate-x-[15%] -translate-y-[10%]"
        viewBox={`0 0 ${gap * 80} ${h * 80}`}
        xmlns="http://www.w3.org/2000/svg"
        style={{ transform: `skewY(${angle}deg) scale(${scale})` }}
      >
        <defs>
          {/* pattern grid segitiga */}
          <pattern
            id={`${id}-tri`}
            width={gap}
            height={h}
            patternUnits="userSpaceOnUse"
          >
            {/* garis polygon: gunakan path dua segitiga agar jadi pola tessellation */}
            <path
              d={triUp}
              fill="none"
              stroke="currentColor"
              strokeWidth={strokeWidth}
              className="opacity-[var(--tri-opacity)]"
            />
            <path
              d={triDown}
              fill="none"
              stroke="currentColor"
              strokeWidth={strokeWidth}
              className="opacity-[var(--tri-opacity)]"
            />
            {/* titik kecil di vertex (opsional; bikin karakter unik) */}
            <circle
              cx={A.x}
              cy={A.y}
              r={Math.max(0.6, strokeWidth * 0.6)}
              fill="currentColor"
              className="opacity-[calc(var(--tri-opacity)*0.9)]"
            />
            <circle
              cx={B.x}
              cy={B.y}
              r={Math.max(0.6, strokeWidth * 0.6)}
              fill="currentColor"
              className="opacity-[calc(var(--tri-opacity)*0.9)]"
            />
            <circle
              cx={C.x}
              cy={C.y}
              r={Math.max(0.6, strokeWidth * 0.6)}
              fill="currentColor"
              className="opacity-[calc(var(--tri-opacity)*0.9)]"
            />
            {/* garis aksen tipis (opsional) */}
            <path
              d={`M ${A.x} ${A.y} L ${D.x} ${D.y}`}
              stroke="currentColor"
              strokeWidth={Math.max(0.5, strokeWidth * 0.7)}
              className="opacity-[calc(var(--tri-opacity)*0.55)]"
            />
          </pattern>

          {/* highlight diagonal lembut supaya nggak flat */}
          <linearGradient id={`${id}-sheen`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.0" />
            <stop offset="65%" stopColor="currentColor" stopOpacity="0.05" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0.0" />
          </linearGradient>
        </defs>

        {/* kontrol opasitas via CSS var (beda light/dark) */}
        <style>{`
          :where(svg){ --tri-opacity: ${opacityLight}; }
          :where(html.dark) svg{ --tri-opacity: ${opacityDark}; }
        `}</style>

        {/* isi */}
        <rect
          x="0"
          y="0"
          width={gap * 80}
          height={h * 80}
          fill={`url(#${id}-tri)`}
        />
        <rect
          x="0"
          y="0"
          width={gap * 80}
          height={h * 80}
          fill={`url(#${id}-sheen)`}
        />
      </svg>
    </div>
  )
}
