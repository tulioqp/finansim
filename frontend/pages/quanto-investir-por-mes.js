import { useState } from 'react'
import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function QuantoInvestirPorMes() {
  const [meta, setMeta] = useState(100000)
  const [prazoAnos, setPrazoAnos] = useState(10)
  const [taxa, setTaxa] = useState(10)
  const [tipoTaxa, setTipoTaxa] = useState('anual')
  const [valorInicial, setValorInicial] = useState(0)
  const [resultado, setResultado] = useState(null)

  function calcular(e) {
    e.preventDefault()

    const n = prazoAnos * 12

    let i =
      tipoTaxa === 'anual'
        ? Math.pow(1 + taxa / 100, 1 / 12) - 1
        : taxa / 100

    const fvInicial = valorInicial * Math.pow(1 + i, n)

    if (fvInicial >= meta) {
      setResultado({
        aporte: 0,
        mensagem:
          'Com o valor inicial informado, a meta já é atingida no prazo.'
      })
      return
    }

    const pmt =
      (meta - fvInicial) /
      ((Math.pow(1 + i, n) - 1) / i)

    setResultado({
      aporte: pmt,
      totalInvestido: valorInicial + pmt * n
    })
  }

  return (
    <>
      <Head>
        <title>Quanto investir por mês para atingir uma meta | FinanSim</title>
        <meta
          name="description"
          content="Descubra quanto investir por mês para alcançar sua meta financeira, considerando taxa de juros e prazo."
        />
      </Head>

      <Header />

      <div className="min-h-screen bg-gray-50 p-8">
        <main className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow">
          <h1 className="text-2xl font-bold mb-4">
            Quanto investir por mês para atingir uma meta
          </h1>

          <p className="mb-6 text-sm text-gray-600">
            Simulação de aporte mensal com capitalização composta.
          </p>

          <form onSubmit={calcular} className="space-y-4">
            <div>
              <label className="block text-sm">Meta financeira (R$)</label>
              <input
                type="number"
                className="mt-1 w-full border rounded p-2"
                value={meta}
                onChange={e => setMeta(Number(e.target.value))}
              />
            </div>

            <div>
              <label className="block text-sm">Prazo (anos)</label>
              <input
                type="number"
                className="mt-1 w-full border rounded p-2"
                value={prazoAnos}
                onChange={e => setPrazoAnos(Number(e.target.value))}
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2">
                <label className="block text-sm">Taxa (%)</label>
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

            <div>
              <label className="block text-sm">Valor inicial (R$)</label>
              <input
                type="number"
                className="mt-1 w-full border rounded p-2"
                value={valorInicial}
                onChange={e => setValorInicial(Number(e.target.value))}
              />
            </div>

            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Calcular
            </button>
          </form>

          {resultado && (
            <div className="mt-6 p-4 border rounded">
              {resultado.mensagem ? (
                <p>{resultado.mensagem}</p>
              ) : (
                <>
                  <p>
                    <strong>Aporte mensal necessário:</strong>{' '}
                    R$ {resultado.aporte.toFixed(2)}
                  </p>
                  <p>
                    <strong>Total investido:</strong>{' '}
                    R$ {resultado.totalInvestido.toFixed(2)}
                  </p>
                </>
              )}
            </div>
          )}
        </main>
      </div>
      <Footer />
    </>
  )
}
