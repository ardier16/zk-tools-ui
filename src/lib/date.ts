export function encodePassportDate(date: Date): string {
  const year = date.getUTCFullYear() % 100
  const month = date.getUTCMonth() + 1
  const day = date.getUTCDate()

  return [year, month, day].map(n => n.toString().padStart(2, '0')).join('')
}

export function decodePassportDate(encoded: string): Date | null {
  const [year, month, day] = encoded.match(/.{2}/g) ?? []

  const currentYear = new Date().getFullYear() % 100
  const fullYear = Number(year) > currentYear ? 1900 + Number(year) : 2000 + Number(year)

  const date = new Date(`${fullYear}-${month}-${day}`)
  return isNaN(date.getTime()) ? null : date
}
