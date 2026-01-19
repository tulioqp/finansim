import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Privacidade() {
  return (
    <>
      <Head>
        <title>Política de Privacidade | FinanSim</title>
        <meta
          name="description"
          content="Política de privacidade do FinanSim."
        />
      </Head>

      <Header />

      <div className="min-h-screen bg-gray-50 p-8">
        <main className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow">
          <h1 className="text-2xl font-bold mb-4">
            Política de Privacidade
          </h1>

          <p className="mb-4">
            O FinanSim respeita a privacidade dos usuários. Não coletamos dados
            pessoais sensíveis nem exigimos cadastro para utilização das
            ferramentas disponíveis no site.
          </p>

          <p className="mb-4">
            Informações de navegação podem ser coletadas de forma anônima para
            fins estatísticos, como melhoria de conteúdo e desempenho do site.
          </p>

          <p>
            Ao utilizar o FinanSim, você concorda com esta política de
            privacidade.
          </p>
        </main>
      </div>

      <Footer />
    </>
  )
}
