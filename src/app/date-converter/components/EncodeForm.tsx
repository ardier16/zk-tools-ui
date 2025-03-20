'use client'

import { useMemo, useState } from 'react'

import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { encodePassportDate } from '@/lib/date'
import { hexToDecimal, stringToHex } from '@/lib/hex'

import ResultItem from './ResultItem'

export default function EncodeForm() {
  const [value, setValue] = useState<string>('')

  const parsedDate = useMemo(() => {
    const timestamp = Number(value) * 1000
    const date = new Date(isNaN(timestamp) ? value : timestamp)
    if (!value || isNaN(date.getTime())) return null

    return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
  }, [value])

  const formattedDate = useMemo(() => {
    return parsedDate?.toISOString().split('T')[0] ?? ''
  }, [parsedDate])

  const encodedValue = useMemo(() => {
    return parsedDate ? encodePassportDate(parsedDate) : ''
  }, [parsedDate])

  const encodedHex = useMemo(() => {
    return parsedDate ? stringToHex(encodedValue) : ''
  }, [parsedDate, encodedValue])

  const encodedDecimal = useMemo(() => {
    return encodedHex ? hexToDecimal(encodedHex).toString() : ''
  }, [encodedHex])

  return (
    <Card className='w-full flex flex-col gap-4 rounded-md p-4'>
      <div className='flex flex-col gap-0.5'>
        <p className='text-md font-medium'>Encode</p>
        <p className='text-xs text-muted-foreground'>Encode date in passport format</p>
      </div>
      <Input
        placeholder='Date or timestamp'
        value={value}
        onChange={e => setValue(e.currentTarget.value)}
      />
      <div className='flex flex-col gap-2'>
        <ResultItem title='Parsed date' value={formattedDate} />
        <ResultItem title='Encoded date' value={encodedValue} />
        <ResultItem title='Encoded date hex' value={encodedHex} />
        <ResultItem title='Encoded date decimal' value={encodedDecimal} />
      </div>
    </Card>
  )
}
