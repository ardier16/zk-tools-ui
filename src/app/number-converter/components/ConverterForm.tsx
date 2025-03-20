'use client'

import { useState } from 'react'

import { Input } from '@/components/ui/input'

interface ConverterField {
  label: string
  value: string
  fromDecimal: (value: string) => string
  toDecimal: (value: string) => number
}

const converterFields: ConverterField[] = [
  {
    label: 'Decimal',
    value: '',
    fromDecimal: value => value,
    toDecimal: value => (value ? Number(value) : NaN),
  },
  {
    label: 'Hexadecimal',
    value: '',
    fromDecimal: value => parseInt(value).toString(16).toUpperCase(),
    toDecimal: value => parseInt(value, 16),
  },
  {
    label: 'Binary',
    value: '',
    fromDecimal: value => parseInt(value).toString(2),
    toDecimal: value => parseInt(value, 2),
  },
  {
    label: 'Octal',
    value: '',
    fromDecimal: value => parseInt(value).toString(8),
    toDecimal: value => parseInt(value, 8),
  },
]

export default function ConverterForm() {
  const [fields, setFields] = useState<ConverterField[]>(converterFields)

  const updateField = (index: number, value: string) => {
    const newDecimal = fields[index].toDecimal(value)

    setFields(old =>
      old.map((field, i) => ({
        ...field,
        value:
          i === index ? value : isNaN(newDecimal) ? '' : field.fromDecimal(newDecimal.toString()),
      })),
    )
  }

  return (
    <div className='flex flex-col gap-6 max-w-xl w-full mx-auto'>
      {fields.map((field, index) => (
        <div key={field.label} className='flex flex-col gap-1'>
          <p className='text-sm font-medium'>{field.label}</p>
          <Input
            value={field.value}
            placeholder={`Enter ${field.label} value`}
            onChange={e => updateField(index, e.target.value)}
          />
        </div>
      ))}
    </div>
  )
}
