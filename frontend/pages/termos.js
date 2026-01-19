import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Termos() {
  return (
    <>
      <Head>
        <title>Termos de Uso | FinanSim</title>
        <meta
          name="description"
          content="Termos de uso do FinanSim."
        />
      </Head>

      <Header />

      <div className="min-h-screen bg-gray-50 p-8">
        <main className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow">
          <h1 className="text-2xl font-bold mb-4">
            Termos de Uso
          </h1>

          <p className="mb-4">
            As informações e simuladores disponibilizados no FinanSim têm caráter
            exclusivamente educacional e informativo.
          </p>

          <p className="mb-4">
            Os resultados apresentados são estimativas e não constituem
            recomendação de investimento.
          </p>

          <p>
            O uso do site é de inteira responsabilidade do usuário.
          </p>
        </main>
      </div>

      <Footer />
    </>
  )
}
