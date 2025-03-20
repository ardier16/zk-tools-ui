import MainLayout from '@/layouts/MainLayout'

import DecodeForm from './components/DecodeForm'
import EncodeForm from './components/EncodeForm'

export default function DateConverter() {
  return (
    <MainLayout title='Date Converter'>
      <div className='grid lg:grid-cols-2 grid-cols-1 gap-8 max-w-3xl w-full mx-auto'>
        <EncodeForm />
        <DecodeForm />
      </div>
    </MainLayout>
  )
}
