import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Sobre() {
  return (
    <>
      <Head>
        <title>Sobre o FinanSim</title>
        <meta
          name="description"
          content="Conheça o FinanSim, um site de simuladores financeiros para planejamento e educação financeira."
        />
      </Head>

      <Header />

      <div className="min-h-screen bg-gray-50 p-8">
        <main className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow">
          <h1 className="text-2xl font-bold mb-4">Sobre o FinanSim</h1>

          <p className="mb-4">
            O FinanSim é um projeto independente criado com o objetivo de
            disponibilizar simuladores financeiros simples, claros e acessíveis
            para auxiliar no planejamento financeiro pessoal.
          </p>

          <p className="mb-4">
            As ferramentas disponíveis no site permitem simular cenários de
            investimentos, aportes mensais e evolução patrimonial, sempre com
            foco educacional e informativo.
          </p>

          <p>
            O FinanSim não realiza recomendações de investimentos e não possui
            vínculo com instituições financeiras.
          </p>
        </main>
      </div>

      <Footer />
    </>
  )
}
