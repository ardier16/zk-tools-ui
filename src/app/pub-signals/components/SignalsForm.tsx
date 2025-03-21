'use client'

import { useMemo, useState } from 'react'

import CopyButton from '@/components/CopyButton'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { decodePassportDate } from '@/lib/date'
import { decimalToHex, hexToString } from '@/lib/hex'
import { cn } from '@/lib/utils'

interface SignalConverter {
  title: string
  convert: (value: string) => string
}

interface SignalDescriptor {
  index: number
  title: string
  description: string
  converters?: SignalConverter[]
}

const hexConverter: SignalConverter = {
  title: 'Hex',
  convert: value => decimalToHex(BigInt(value)),
}

const dateConverter: SignalConverter = {
  title: 'Date',
  convert: value =>
    decodePassportDate(hexToString(decimalToHex(BigInt(value))) ?? '')
      ?.toISOString()
      .split('T')[0] ?? '–',
}

const timestampConverter: SignalConverter = {
  title: 'Date',
  convert: value => new Date(Number(value) * 1000).toISOString(),
}

const stringConverter: SignalConverter = {
  title: 'String',
  convert: value => hexToString(decimalToHex(BigInt(value))) ?? '–',
}

const SIGNAL_DESCRIPTORS: SignalDescriptor[] = [
  { index: 0, title: 'Nullifier', description: 'The nullifier of the identity commitment' },
  {
    index: 1,
    title: 'Birth Date',
    description: 'The birth date of the identity',
    converters: [dateConverter],
  },
  {
    index: 2,
    title: 'Expiration Date',
    description: 'The expiration date of the identity',
    converters: [dateConverter],
  },
  {
    index: 3,
    title: 'Name',
    description: 'The name of the identity',
    converters: [stringConverter],
  },
  {
    index: 4,
    title: 'Name Residual',
    description: 'The name residual of the identity',
    converters: [stringConverter],
  },
  {
    index: 5,
    title: 'Nationality',
    description: 'The nationality of the identity',
    converters: [stringConverter],
  },
  {
    index: 6,
    title: 'Citizenship',
    description: 'The citizenship of the identity',
    converters: [stringConverter],
  },
  { index: 7, title: 'Sex', description: 'The sex of the identity', converters: [stringConverter] },
  {
    index: 8,
    title: 'Document Number',
    description: 'The document number of the identity',
    converters: [stringConverter],
  },
  {
    index: 9,
    title: 'Event ID',
    description: 'The event ID of the identity',
    converters: [hexConverter],
  },
  {
    index: 10,
    title: 'Event Data',
    description: 'The event data of the identity',
    converters: [hexConverter],
  },
  {
    index: 11,
    title: 'ID State Root',
    description: 'The ID state root of the identity',
    converters: [hexConverter],
  },
  {
    index: 12,
    title: 'Selector',
    description: 'The selector of the identity',
    converters: [hexConverter],
  },
  {
    index: 13,
    title: 'Current Date',
    description: 'The current date',
    converters: [dateConverter, hexConverter],
  },
  {
    index: 14,
    title: 'Timestamp Lowerbound',
    description: 'The lowerbound of the timestamp',
    converters: [timestampConverter],
  },
  {
    index: 15,
    title: 'Timestamp Upperbound',
    description: 'The upperbound of the timestamp',
    converters: [timestampConverter],
  },
  {
    index: 16,
    title: 'Identity Counter Lowerbound',
    description: 'The lowerbound of the identity counter',
  },
  {
    index: 17,
    title: 'Identity Counter Upperbound',
    description: 'The upperbound of the identity counter',
  },
  {
    index: 18,
    title: 'Birth Date Lowerbound',
    description: 'The lowerbound of the birth date',
    converters: [dateConverter, hexConverter],
  },
  {
    index: 19,
    title: 'Birth Date Upperbound',
    description: 'The upperbound of the birth date',
    converters: [dateConverter, hexConverter],
  },
  {
    index: 20,
    title: 'Expiration Date Lowerbound',
    description: 'The lowerbound of the expiration date',
    converters: [dateConverter, hexConverter],
  },
  {
    index: 21,
    title: 'Expiration Date Upperbound',
    description: 'The upperbound of the expiration date',
    converters: [dateConverter, hexConverter],
  },
  {
    index: 22,
    title: 'Citizenship Mask',
    description: 'The citizenship mask',
    converters: [hexConverter, stringConverter],
  },
]

export default function SignalsForm() {
  const [value, setValue] = useState<string>('')
  const [comparing, setComparing] = useState<boolean>(false)
  const [comparedValue, setComparedValue] = useState<string>('')

  const normalizeSignals = (value: string) => {
    if (!value) return []

    return value
      .replace(/\[|\]|\s|"|'/g, '')
      .split(',')
      .map(signal => signal.trim())
  }

  const normalizedSignals = useMemo(() => normalizeSignals(value), [value])
  const normalizedComparedSignals = useMemo(() => normalizeSignals(comparedValue), [comparedValue])

  return (
    <div className='flex flex-col gap-8 max-w-4xl w-full mx-auto'>
      <div className={cn('grid gap-4 mx-auto w-full', comparing ? 'grid-cols-2' : 'grid-cols-1')}>
        <SignalForm
          value={value}
          index={0}
          hasCompare={!comparing}
          onChange={setValue}
          onCompare={() => setComparing(!comparing)}
        />

        {comparing && (
          <SignalForm
            value={comparedValue}
            index={1}
            hasCompare={false}
            onChange={setComparedValue}
          />
        )}
      </div>

      <div className={cn('grid', comparing ? 'grid-cols-2' : 'grid-cols-1', 'gap-4')}>
        {normalizedSignals.length > 0 && (
          <div className='flex flex-col gap-2'>
            <p className='text-md font-medium'>Signals 1 Output</p>
            {normalizedSignals.map((signal, index) => (
              <SignalItem key={index} signal={signal} descriptor={SIGNAL_DESCRIPTORS[index]} />
            ))}
          </div>
        )}

        {comparing && normalizedComparedSignals.length > 0 && (
          <div className='flex flex-col gap-2'>
            <p className='text-md font-medium'>Signals 2 Output</p>
            {normalizedComparedSignals.map((signal, index) => (
              <SignalItem
                key={index}
                signal={signal}
                equal={normalizedSignals[index] === signal}
                descriptor={SIGNAL_DESCRIPTORS[index]}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function SignalForm({
  value,
  index,
  hasCompare,
  onChange,
  onCompare,
}: {
  value: string
  index: number
  hasCompare: boolean
  onChange: (value: string) => void
  onCompare?: () => void
}) {
  return (
    <div className='flex flex-col gap-4 max-w-xl w-full mx-auto'>
      <div className='flex justify-between items-center h-8'>
        <p className='text-md font-medium'>Signals {index + 1} (total: 23)</p>
        {hasCompare && (
          <Button variant='secondary' size='sm' className='w-fit' onClick={onCompare}>
            + Compare
          </Button>
        )}
      </div>
      <Textarea
        value={value}
        className='h-32'
        placeholder='Wrapped in [] or separated by comma'
        onChange={e => onChange(e.target.value)}
      />
    </div>
  )
}

function SignalItem({
  signal,
  descriptor,
  equal,
}: {
  signal: string
  descriptor: SignalDescriptor
  equal?: boolean
}) {
  return (
    <div
      className={cn(
        'flex flex-col gap-0.5 p-2 border border-gray-200 rounded-md',
        equal === false && 'border-red-500 bg-red-50',
        equal === true && 'border-green-500 bg-green-50',
      )}
    >
      <p className='text-xs text-muted-foreground'>
        {descriptor.index}. {descriptor.title}
      </p>
      <p className='font-mono text-sm flex gap-1 items-center'>
        <span className='break-all'>{signal}</span>
        <CopyButton value={signal} />
      </p>
      <div className='flex gap-2'>
        {descriptor.converters?.map(converter => (
          <SignalConverterItem key={converter.title} converter={converter} signal={signal} />
        ))}
      </div>
    </div>
  )
}

function SignalConverterItem({
  converter,
  signal,
}: {
  converter: SignalConverter
  signal: string
}) {
  const converted = useMemo(() => converter.convert(signal), [converter, signal])

  return (
    <div className='flex flex-col text-[10px]'>
      <p className='text-muted-foreground'>{converter.title}:</p>
      <div className='flex items-center gap-1'>
        <p className='font-mono break-all'>{converted}</p>
        <CopyButton value={converted} />
      </div>
    </div>
  )
}
