import MainLayout from '@/layouts/MainLayout'

import ConverterForm from './components/ConverterForm'

export default function NumberConverter() {
  return (
    <MainLayout title='Number Converter'>
      <ConverterForm />
    </MainLayout>
  )
}
