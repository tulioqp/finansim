import Head from 'next/head'
import Link from 'next/link'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <>
      <Head>
        <title>FinanSim | Simuladores Financeiros</title>
        <meta
          name="description"
          content="Simuladores financeiros gratuitos para planejamento e investimentos pessoais."
        />
      </Head>

      <Header />

      <div className="min-h-screen bg-gray-50 p-8">
        <main className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow">
          <h1 className="text-2xl font-bold mb-4">
            FinanSim — Simuladores Financeiros
          </h1>

          <p className="mb-4">
            Simuladores simples e gratuitos para ajudar no planejamento
            financeiro.
          </p>

          <ul className="list-disc pl-5">
            <li>
              <Link href="/juros-compostos" className="text-blue-600">
                Simulador de Juros Compostos
              </Link>
            </li>
          </ul>
        </main>
      </div>

      <Footer />
    </>
  )
}
