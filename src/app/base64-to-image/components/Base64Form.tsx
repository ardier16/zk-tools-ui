'use client'

import { useState } from 'react'

import { Textarea } from '@/components/ui/textarea'

export default function Base64Form() {
  const [value, setValue] = useState('')

  const imageSrc = `data:image/png;base64,${value.replaceAll('"', '')}`

  return (
    <div className='flex flex-col gap-8'>
      <Textarea
        className='max-w-xl h-60'
        value={value}
        rows={10}
        cols={50}
        placeholder='Paste your base64 string here'
        onChange={e => setValue(e.target.value)}
      />

      <div className='flex flex-col gap-4'>
        <p className='font-mono text-sm text-muted-foreground'>Image preview:</p>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {value && <img className='max-w-md' src={imageSrc} alt='Base64 result' />}
      </div>
    </div>
  )
}
