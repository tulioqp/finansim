import { useState } from 'react'
import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Link from 'next/link'

export default function QuantoInvestirParaViverDeRenda() {
  const [rendaMensal, setRendaMensal] = useState(5000)
  const [prazoAnos, setPrazoAnos] = useState(20)
  const [taxa, setTaxa] = useState(8)
  const [tipoTaxa, setTipoTaxa] = useState('anual')
  const [valorInicial, setValorInicial] = useState(0)
  const [considerarInflacao, setConsiderarInflacao] = useState(false)
  const [inflacao, setInflacao] = useState('')
  const [resultado, setResultado] = useState(null)

  function formatarMoeda(valor) {
    return valor.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    })
  }

  function calcular(e) {
    e.preventDefault()

    let taxaEfetiva = taxa

    if (considerarInflacao) {
      if (inflacao === '' || inflacao >= taxa) {
        setResultado({
          erro:
            'A inflação deve ser menor que a taxa de retorno para haver ganho real.',
        })
        return
      }
      taxaEfetiva = taxa - inflacao
    }

    const taxaMensal =
      tipoTaxa === 'anual'
        ? Math.pow(1 + taxaEfetiva / 100, 1 / 12) - 1
        : taxaEfetiva / 100

    if (taxaMensal <= 0) {
      setResultado({
        erro:
          'A taxa real mensal é negativa ou zero. Ajuste os valores informados.',
      })
      return
    }

    const patrimonioNecessario = rendaMensal / taxaMensal

    const n = prazoAnos * 12
    const fvInicial = valorInicial * Math.pow(1 + taxaMensal, n)

    let aporteMensal = 0

    if (fvInicial < patrimonioNecessario) {
      aporteMensal =
        (patrimonioNecessario - fvInicial) /
        ((Math.pow(1 + taxaMensal, n) - 1) / taxaMensal)
    }

    setResultado({
      patrimonio: patrimonioNecessario,
      aporte: aporteMensal,
      totalInvestido: valorInicial + aporteMensal * n,
    })
  }

  return (
    <>
      <Head>
        <title>Quanto investir para viver de renda | FinanSim</title>
        <meta
          name="description"
          content="Descubra quanto patrimônio é necessário para viver de renda e quanto investir por mês considerando juros e inflação."
        />
      </Head>

      <Header />

      <div className="min-h-screen bg-gray-50 p-8">
        <main className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow">
          <h1 className="text-2xl font-bold mb-4">
            Quanto investir para viver de renda?
          </h1>

          <p className="mb-4 text-gray-700">
            Viver de renda significa ter um patrimônio capaz de gerar renda
            suficiente para cobrir suas despesas mensais, sem consumir o
            capital. Nesta simulação, você pode estimar quanto precisa acumular
            e quanto investir por mês para atingir esse objetivo.
          </p>

          <p className="mb-6 text-gray-700">
            Você também pode optar por considerar a inflação, o que ajuda a
            estimar o poder de compra real da renda no futuro.
          </p>

          <form onSubmit={calcular} className="space-y-4 mb-8">
            <div>
              <label className="block text-sm">Renda mensal desejada (R$)</label>
              <input
                type="number"
                className="mt-1 w-full border rounded p-2"
                value={rendaMensal}
                onChange={e => setRendaMensal(Number(e.target.value))}
              />
            </div>

            <div>
              <label className="block text-sm">Prazo para atingir a meta (anos)</label>
              <input
                type="number"
                className="mt-1 w-full border rounded p-2"
                value={prazoAnos}
                onChange={e => setPrazoAnos(Number(e.target.value))}
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2">
                <label className="block text-sm">Taxa de retorno (%)</label>
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
              <label className="block text-sm">Valor inicial investido (R$)</label>
              <input
                type="number"
                className="mt-1 w-full border rounded p-2"
                value={valorInicial}
                onChange={e => setValorInicial(Number(e.target.value))}
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={considerarInflacao}
                onChange={e => setConsiderarInflacao(e.target.checked)}
              />
              <label className="text-sm">
                Considerar inflação (poder de compra real)
              </label>
            </div>

            {considerarInflacao && (
              <div>
                <label className="block text-sm">Inflação anual (%)</label>
                <input
                  type="number"
                  step="0.01"
                  className="mt-1 w-full border rounded p-2"
                  value={inflacao}
                  onChange={e => setInflacao(Number(e.target.value))}
                />
              </div>
            )}

            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Calcular
            </button>
          </form>

          {resultado && (
            <div className="p-4 border rounded mb-8">
              {resultado.erro ? (
                <p className="text-red-600">{resultado.erro}</p>
              ) : (
                <>
                  <p className="mb-2">
                    <strong>Patrimônio necessário:</strong>{' '}
                    {formatarMoeda(resultado.patrimonio)}
                  </p>
                  <p className="mb-2">
                    <strong>Aporte mensal estimado:</strong>{' '}
                    {formatarMoeda(resultado.aporte)}
                  </p>
                  <p>
                    <strong>Total investido:</strong>{' '}
                    {formatarMoeda(resultado.totalInvestido)}
                  </p>
                </>
              )}
            </div>
          )}

          <div className="border-t pt-6 text-sm text-gray-600">
            <p className="mb-2">
              Quer acompanhar a evolução do seu patrimônio com mais detalhes e
              gráfico?
            </p>
            <Link
              href="https://finansimbr.com.br/quanto-investir-por-mes"
              className="text-blue-600 underline"
            >
              Conheça nossa planilha completa de evolução patrimonial
            </Link>
          </div>
        </main>
      </div>

      <Footer />
    </>
  )
}
