import Link from 'next/link'

import { Card } from '@/components/ui/card'
import MainLayout from '@/layouts/MainLayout'
import { links } from '@/lib/links'

export default function Page() {
  return (
    <MainLayout title='ZK Tools'>
      <div className='flex flex-col gap-6'>
        {links.map(item => (
          <div key={item.title} className='flex flex-col gap-1'>
            <h2 className='font-medium text-md'>{item.title}</h2>
            <div className='grid grid-cols-3 gap-4'>
              {item.items?.map(item => (
                <Link key={item.title} href={item.url}>
                  <Card
                    key={item.title}
                    className='text-lg font-medium p-4 hover:bg-gray-100 cursor-pointer rounded-md'
                  >
                    {item.title}
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </MainLayout>
  )
}
