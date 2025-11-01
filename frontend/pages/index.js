import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <main className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-4">FinanSim — Simuladores Financeiros</h1>
        <p className="mb-4">MVP: Simulador de Juros Compostos. Rápido, leve e focado em SEO.</p>
        <ul className="list-disc pl-5">
          <li><Link href="/juros-compostos" className="text-blue-600">Simulador de Juros Compostos</Link></li>
        </ul>
      </main>
    </div>
  )
}