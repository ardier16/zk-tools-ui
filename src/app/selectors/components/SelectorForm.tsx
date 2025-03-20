'use client'

import { useState } from 'react'

import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { convertSelectorToBits, formatBinaryString } from '@/lib/selector'
import { cn } from '@/lib/utils'

interface SelectorBit {
  id: number
  name: string
  description: string
}

const SELECTOR_BITS: SelectorBit[] = [
  { id: 0, name: 'Nullifier', description: 'The nullifier of the identity commitment' },
  { id: 1, name: 'Birth Date', description: 'The birth date of the identity' },
  { id: 2, name: 'Expiration Date', description: 'The expiration date of the identity' },
  { id: 3, name: 'Name', description: 'The name of the identity' },
  { id: 4, name: 'Nationality', description: 'Nationality of the identity' },
  { id: 5, name: 'Citizenship', description: 'Citizenship of the identity' },
  { id: 6, name: 'Sex', description: 'Sex of the identity' },
  { id: 7, name: 'Document Number', description: 'Document number of the identity' },
  { id: 8, name: 'Timestamp Lowerbound', description: 'The lowerbound of the timestamp' },
  { id: 9, name: 'Timestamp Upperbound', description: 'The upperbound of the timestamp' },
  {
    id: 10,
    name: 'Identity Counter Lowerbound',
    description: 'The lowerbound of the identity counter',
  },
  {
    id: 11,
    name: 'Identity Counter Upperbound',
    description: 'The upperbound of the identity counter',
  },
  {
    id: 12,
    name: 'Passport Expiration Lowerbound',
    description: 'The lowerbound of the passport expiration',
  },
  {
    id: 13,
    name: 'Passport Expiration Upperbound',
    description: 'The upperbound of the passport expiration',
  },
  { id: 14, name: 'Birth Date Lowerbound', description: 'The lowerbound of the birth date' },
  { id: 15, name: 'Birth Date Upperbound', description: 'The upperbound of the birth date' },
  {
    id: 16,
    name: 'Verify Citizenship Mask as a Whitelist',
    description: 'Verify citizenship mask as a whitelist',
  },
  {
    id: 17,
    name: 'Verify Citizenship Mask as a Blacklist',
    description: 'Verify citizenship mask as a blacklist',
  },
]

export default function SelectorForm() {
  const [selector, setSelector] = useState('0xA101')

  const selectorBits = convertSelectorToBits(selector)
  const selectedBits = SELECTOR_BITS.filter(
    selector => selectorBits.split('').reverse()[selector.id] === '1',
  )

  const toggleSelector = (selector: SelectorBit) => {
    const selected = selectedBits.some(selected => selected.id === selector.id)
    const newSelectorBits = selectorBits
      .split('')
      .reverse()
      .map((bit, index) => (index === selector.id ? (selected ? '0' : '1') : bit))
      .reverse()
      .join('')

    setSelector(`0x${parseInt(newSelectorBits, 2).toString(16).toUpperCase()}`)
  }

  return (
    <div className='flex flex-col gap-8'>
      <div className='flex flex-col gap-4'>
        <Input
          value={selector}
          className='md:text-4xl h-auto max-w-sm mx-auto'
          placeholder='0x1A01 or 1137'
          maxLength={6}
          onChange={e => setSelector(e.target.value)}
        />
        <div className='flex items-center justify-center gap-10'>
          <p className='font-mono text-sm text-muted-foreground'>
            Binary: {formatBinaryString(selectorBits)}
          </p>
          <p className='font-mono text-sm text-muted-foreground'>
            Decimal: {parseInt(selectorBits, 2)}
          </p>
          <p className='font-mono text-sm text-muted-foreground'>
            Hex: 0x{parseInt(selectorBits, 2).toString(16).toUpperCase()}
          </p>
        </div>
      </div>
      <div className='grid auto-rows-min gap-4 md:grid-cols-3'>
        <SelectorsPart
          bits={SELECTOR_BITS.slice(0, 6)}
          selectedBits={selectedBits}
          onCheck={toggleSelector}
        />
        <SelectorsPart
          bits={SELECTOR_BITS.slice(6, 12)}
          selectedBits={selectedBits}
          onCheck={toggleSelector}
        />
        <SelectorsPart
          bits={SELECTOR_BITS.slice(12, 18)}
          selectedBits={selectedBits}
          onCheck={toggleSelector}
        />
      </div>
    </div>
  )
}

function SelectorsPart({
  bits,
  selectedBits,
  onCheck,
}: {
  bits: SelectorBit[]
  selectedBits: SelectorBit[]
  onCheck?: (selector: SelectorBit) => void
}) {
  return (
    <div className='flex flex-col gap-2'>
      {bits.map(selector => (
        <SelectorBitItem
          key={selector.id}
          selector={selector}
          checked={selectedBits.some(selected => selected.id === selector.id)}
          onCheck={() => onCheck?.(selector)}
        />
      ))}
    </div>
  )
}

function SelectorBitItem({
  selector,
  checked,
  onCheck,
}: {
  selector: SelectorBit
  checked: boolean
  onCheck?: () => void
}) {
  return (
    <label
      htmlFor={`selector-${selector.id}`}
      className={cn(
        'items-top flex space-x-2 rounded-lg p-2 hover:bg-muted/50 cursor-pointer',
        !checked && 'opacity-70',
      )}
    >
      <Checkbox id={`selector-${selector.id}`} checked={checked} onCheckedChange={onCheck} />
      <div className='grid gap-1.5 leading-none'>
        <p className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
          {selector.id}. {selector.name}
        </p>
        <p className='text-sm text-muted-foreground'>{selector.description}</p>
      </div>
    </label>
  )
}
