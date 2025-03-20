'use client'

import { useState } from 'react'

import { Textarea } from '@/components/ui/textarea'

export default function Base64Form() {
  const [value, setValue] = useState('')

  const imageSrc = `data:image/png;base64,${value.replaceAll('"', '')}`

  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-3xl w-full mx-auto'>
      <div className='flex flex-col gap-2'>
        <p className='text-sm font-medium'>Input</p>
        <Textarea
          className='max-w-xl h-60'
          value={value}
          rows={10}
          cols={50}
          placeholder='Paste your base64 string here'
          onChange={e => setValue(e.target.value)}
        />
      </div>

      <div className='flex flex-col gap-2'>
        <p className='text-sm font-medium'>Output</p>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {value && <img className='h-60 w-auto' src={imageSrc} alt='Base64 result' />}
      </div>
    </div>
  )
}
