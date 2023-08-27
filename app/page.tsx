import MainLayout from '@/components/mainLayout/MainLayout'

export default function Movies() {
  const page_name: string = 'movies';
  return (
    <main className="mt-4 pb-16">
      <MainLayout page_name={page_name} />
    </main>
  )
}
