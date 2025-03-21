interface LinkItem {
  title: string
  url: string
  items?: LinkItem[]
}

export const links: LinkItem[] = [
  {
    title: 'Query Proof',
    url: '#',
    items: [
      {
        title: 'Selectors',
        url: '/selectors',
      },
      {
        title: 'Public signals',
        url: '/pub-signals',
      },
    ],
  },
  {
    title: 'Passport Utilities',
    url: '#',
    items: [
      {
        title: 'Date converter',
        url: '/date-converter',
      },
      {
        title: 'Number converter',
        url: '/number-converter',
      },
      {
        title: 'Base64 to image',
        url: '/base64-to-image',
      },
    ],
  },
]
