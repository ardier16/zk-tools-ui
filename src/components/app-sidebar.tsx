import { Separator } from '@radix-ui/react-separator'
import { GalleryVerticalEnd } from 'lucide-react'
import Link from 'next/link'
import * as React from 'react'

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar'

interface SidebarItem {
  title: string
  url: string
  isActive?: boolean
  items?: SidebarItem[]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const items: SidebarItem[] = [
    {
      title: 'Query Proof',
      url: '#',
      items: [
        {
          title: 'Selectors',
          url: '/selectors',
        },
      ],
    },
  ]

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <Link href='/' className='cursor-pointer'>
          <SidebarMenuButton
            size='lg'
            className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
          >
            <div className='bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg'>
              <GalleryVerticalEnd className='size-4' />
            </div>
            <div className='flex flex-col gap-0.5 leading-none'>
              <span className='font-medium'>ZK Tools</span>
            </div>
          </SidebarMenuButton>
        </Link>
      </SidebarHeader>
      <Separator orientation='horizontal' />
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {items.map(item => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items?.map(item => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={item.isActive}>
                      <Link href={item.url}>{item.title}</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
