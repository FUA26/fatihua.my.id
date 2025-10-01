export function toSafeNumber(v: unknown, fallback = 0): number {
  const n = Number(v)
  return Number.isFinite(n) ? n : fallback
}

export function formatCount(v: unknown): string {
  const n = toSafeNumber(v, 0)
  return n.toLocaleString('id-ID') // atau 'en-US' sesuai preferensi
}
