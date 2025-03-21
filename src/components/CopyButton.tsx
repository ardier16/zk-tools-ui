'use client'

import { CheckIcon, CopyIcon } from 'lucide-react'
import { ComponentProps, useState } from 'react'
import { useCopyToClipboard } from 'react-use'

import { cn } from '@/lib/utils'

export default function CopyButton({
  value,
  className,
  ...rest
}: { value: string } & ComponentProps<'button'>) {
  const [, copyToClipboard] = useCopyToClipboard()
  const [copied, setCopied] = useState(false)

  const copy = () => {
    copyToClipboard(value)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      className={cn('text-md w-fit cursor-pointer text-muted-foreground', className)}
      onClick={copy}
      aria-label='Copy to clipboard'
      title='Copy to clipboard'
      {...rest}
    >
      {copied ? <CheckIcon size={12} /> : <CopyIcon size={12} />}
    </button>
  )
}
