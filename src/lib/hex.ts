export function stringToHex(str: string): string {
  const hex = str
    .split('')
    .map(char => char.charCodeAt(0).toString(16))
    .join('')

  return `0x${hex}`
}

export function hexToString(hex: string): string | null {
  return (
    hex
      .replace(/^0x/, '')
      ?.match(/.{2}/g)
      ?.map(byte => String.fromCharCode(parseInt(byte, 16)))
      .join('') ?? null
  )
}

export function hexToDecimal(hex: string): number {
  return parseInt(hex.replace(/^0x/, ''), 16)
}

export function decimalToHex(decimal: number): string {
  return `0x${decimal.toString(16)}`
}
