import CopyButton from '@/components/CopyButton'

export default function ResultItem({ title, value }: { title: string; value: string }) {
  return (
    <div className='flex flex-col gap-0.5'>
      <p className='text-xs text-muted-foreground'>{title}</p>
      <p className='font-mono text-sm flex gap-1 items-center'>
        <span>{value || '–'}</span>
        {!!value && <CopyButton value={value} />}
      </p>
    </div>
  )
}
