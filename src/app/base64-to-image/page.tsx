import MainLayout from '@/layouts/MainLayout'

import Base64Form from './components/Base64Form'

export default function Base64ToImage() {
  return (
    <MainLayout title='Base64 to Image'>
      <Base64Form />
    </MainLayout>
  )
}
