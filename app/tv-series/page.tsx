import MainLayout from '@/components/mainLayout/MainLayout'

export default function TvSeries() {
  const page_name: string = 'tv-series';
  return (
    <main className="mt-4 pb-16">
      <MainLayout page_name={page_name} />
    </main>
  )
}
