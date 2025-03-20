export function convertSelectorToBits(selector: string): string {
  const decimal = selector.startsWith('0x') ? parseInt(selector.slice(2), 16) : parseInt(selector)
  if (isNaN(decimal)) return '0'.repeat(18)

  const binary = decimal.toString(2).padStart(18, '0')
  return binary
}

export function formatBinaryString(binaryString: string): string {
  if (binaryString.length < 2) return binaryString

  const firstTwo = binaryString.slice(0, 2)
  const rest = binaryString.slice(2).match(/.{1,4}/g) || []

  return [firstTwo, ...rest].join(' ')
}
