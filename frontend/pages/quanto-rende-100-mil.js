import { useState } from 'react'
import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function QuantoRende100Mil() {
  const [taxa, setTaxa] = useState(10)
  const [tipoTaxa, setTipoTaxa] = useState('anual')
  const [resultado, setResultado] = useState(null)

  function calcular(e) {
    e.preventDefault()

    let taxaMensal =
      tipoTaxa === 'anual'
        ? Math.pow(1 + taxa / 100, 1 / 12) - 1
        : taxa / 100

    const rendimentoMensal = 100000 * taxaMensal

    setResultado(rendimentoMensal)
  }

  return (
    <>
      <Head>
        <title>Quanto rende 100 mil reais por mês? | FinanSim</title>
        <meta
          name="description"
          content="Descubra quanto rende 100 mil reais por mês em diferentes taxas de juros e simule cenários de investimento."
        />
      </Head>

      <Header />

      <div className="min-h-screen bg-gray-50 p-8">
        <main className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow space-y-6">

          <h1 className="text-2xl font-bold">
            Quanto rende 100 mil reais por mês?
          </h1>

          <p className="text-gray-700">
            Investir R$ 100.000 pode gerar uma renda mensal interessante,
            dependendo da taxa de juros e do tipo de investimento.
            Nesta simulação, você pode descobrir quanto esse valor rende por mês
            em diferentes cenários.
          </p>

          <form onSubmit={calcular} className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2">
                <label className="block text-sm">Taxa de juros (%)</label>
                <input
                  type="number"
                  step="0.01"
                  className="mt-1 w-full border rounded p-2"
                  value={taxa}
                  onChange={e => setTaxa(Number(e.target.value))}
                />
              </div>

              <div>
                <label className="block text-sm">Tipo</label>
                <select
                  className="mt-1 w-full border rounded p-2"
                  value={tipoTaxa}
                  onChange={e => setTipoTaxa(e.target.value)}
                >
                  <option value="anual">Anual</option>
                  <option value="mensal">Mensal</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Calcular rendimento
            </button>
          </form>

          {resultado !== null && (
            <div className="p-4 border rounded bg-gray-50">
              <p>
                Com uma taxa de <strong>{taxa}% ao {tipoTaxa}</strong>,
                R$ 100.000 rendem aproximadamente:
              </p>

              <p className="text-xl font-bold mt-2">
                {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                }).format(resultado)} por mês
              </p>

              <p className="text-sm text-gray-600 mt-2">
                Valores estimados, sem considerar impostos.
              </p>
            </div>
          )}

          <div className="border-t pt-4 text-sm text-gray-700">
            <p>
              👉 Quer acompanhar a evolução do seu patrimônio mês a mês?
              Criamos uma <strong>planilha completa</strong> para simular aportes,
              juros compostos e crescimento do patrimônio ao longo do tempo.
            </p>

            <p className="mt-2">
              <a
                href="https://pay.kiwify.com.br/SAMOtee"
                className="text-blue-600 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Conheça a planilha de evolução patrimonial
              </a>
            </p>
          </div>

        </main>
      </div>

      <Footer />
    </>
  )
}
