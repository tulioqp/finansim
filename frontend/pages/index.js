import Head from 'next/head'
import Link from 'next/link'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <>
      <Head>
        <title>FinanSim | Simuladores Financeiros Gratuitos</title>
        <meta
          name="description"
          content="Simuladores financeiros gratuitos para planejar investimentos, juros compostos e evolução do patrimônio."
        />
      </Head>

      <Header />

      <div className="min-h-screen bg-gray-50">
        {/* HERO */}
        <section className="bg-white border-b">
          <div className="max-w-4xl mx-auto px-6 py-16 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Planeje seu futuro financeiro com clareza
            </h1>
            <p className="text-gray-600 mb-8">
              Simuladores simples e gratuitos para ajudar você a entender quanto
              investir, quanto rende e como atingir suas metas financeiras.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/juros-compostos"
                className="bg-blue-600 text-white px-6 py-3 rounded text-center"
              >
                Simular Juros Compostos
              </Link>
              <Link
                href="/quanto-investir-por-mes"
                className="border border-blue-600 text-blue-600 px-6 py-3 rounded text-center"
              >
                Quanto Investir por Mês
              </Link>
            </div>
          </div>
        </section>

        {/* SIMULADORES */}
        <section className="max-w-4xl mx-auto px-6 py-16">
          <h2 className="text-2xl font-bold mb-8 text-center">
            Simuladores disponíveis
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              href="/juros-compostos"
              className="bg-white p-6 rounded-lg shadow hover:shadow-md transition"
            >
              <h3 className="font-bold mb-2">Juros Compostos</h3>
              <p className="text-sm text-gray-600">
                Veja como seu dinheiro cresce ao longo do tempo com aportes
                mensais e juros compostos.
              </p>
            </Link>

            <Link
              href="/quanto-investir-por-mes"
              className="bg-white p-6 rounded-lg shadow hover:shadow-md transition"
            >
              <h3 className="font-bold mb-2">Quanto Investir por Mês</h3>
              <p className="text-sm text-gray-600">
                Descubra quanto investir mensalmente para atingir uma meta
                financeira.
              </p>
            </Link>

            <Link
              href="/quanto-rende-100-mil"
              className="bg-white p-6 rounded-lg shadow hover:shadow-md transition"
            >
              <h3 className="font-bold mb-2">Quanto rende R$ 100 mil</h3>
              <p className="text-sm text-gray-600">
                Simule quanto rende 100 mil reais por mês com diferentes taxas.
              </p>
            </Link>

            <Link
              href="/quanto-investir-para-viver-de-renda"
              className="bg-white p-6 rounded-lg shadow hover:shadow-md transition"
            >
              <h3 className="font-bold mb-2">Quanto Investir para Viver de Renda</h3>
              <p className="text-sm text-gray-600">
                Veja quanto precisa investir para viver de renda.
              </p>
            </Link>
          </div>
        </section>

        {/* CTA PLANILHA */}
        <section className="bg-gray-100 border-t">
          <div className="max-w-4xl mx-auto px-6 py-12 text-center">
            <h2 className="text-xl font-bold mb-3">
              Quer acompanhar sua evolução financeira com mais detalhe?
            </h2>
            <p className="text-gray-600 mb-4">
              Conheça nossa planilha em Excel para simular e acompanhar a
              evolução do seu patrimônio mês a mês.
            </p>
            <Link
              href="https://finansimbr.com.br/quanto-investir-por-mes"
              className="text-blue-600 underline"
            >
              Ver planilha de evolução patrimonial
            </Link>
          </div>
        </section>
      </div>

      <Footer />
    </>
  )
}
