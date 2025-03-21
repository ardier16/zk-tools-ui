'use client'

import { useMemo, useState } from 'react'

import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { decodePassportDate } from '@/lib/date'
import { decimalToHex, hexToDecimal, hexToString, stringToHex } from '@/lib/hex'

import ResultItem from './ResultItem'

export default function DecodeForm() {
  const [value, setValue] = useState<string>('')

  const normalizedValue = useMemo(() => {
    return value.length === 6 || value.startsWith('0x')
      ? value
      : (hexToString(decimalToHex(BigInt(value))) ?? '')
  }, [value])

  const encodedValue = useMemo(() => {
    return (normalizedValue.startsWith('0x') ? hexToString(normalizedValue) : normalizedValue) ?? ''
  }, [normalizedValue])

  const encodedHex = useMemo(() => {
    return encodedValue ? stringToHex(encodedValue) : ''
  }, [encodedValue])

  const encodedDecimal = useMemo(() => {
    return encodedHex ? hexToDecimal(encodedHex).toString() : ''
  }, [encodedHex])

  const parsedDate = useMemo(() => {
    if (!normalizedValue) return null

    if (normalizedValue.startsWith('0x')) {
      const hexString = hexToString(normalizedValue)
      return hexString ? decodePassportDate(hexString) : null
    }

    return decodePassportDate(normalizedValue)
  }, [normalizedValue])

  const formattedDate = useMemo(() => {
    return parsedDate?.toISOString().split('T')[0] ?? ''
  }, [parsedDate])

  return (
    <Card className='w-full flex flex-col gap-4 rounded-md p-4'>
      <div className='flex flex-col gap-0.5'>
        <p className='text-md font-medium'>Decode</p>
        <p className='text-xs text-muted-foreground'>Decode passport format date</p>
      </div>
      <Input
        placeholder='Passport date or hex'
        value={value}
        onChange={e => setValue(e.currentTarget.value)}
      />
      <div className='flex flex-col gap-2'>
        <ResultItem title='Encoded date' value={encodedValue} />
        <ResultItem title='Encoded hex' value={encodedHex} />
        <ResultItem title='Encoded decimal' value={encodedDecimal} />
        <ResultItem title='Decoded date' value={formattedDate} />
      </div>
    </Card>
  )
}
