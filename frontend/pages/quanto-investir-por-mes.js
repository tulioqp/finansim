import { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function QuantoInvestirPorMes() {
  const [metaPatrimonio, setMetaPatrimonio] = useState(100000)
  const [prazoMeses, setPrazoMeses] = useState(60) // 5 anos
  const [taxa, setTaxa] = useState(1) // 1% ao mês
  const [tipoTaxa, setTipoTaxa] = useState('mensal')
  const [valorInicial, setValorInicial] = useState(5000)
  const [resultado, setResultado] = useState(null)

  function formatarMoeda(valor) {
    return valor.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    })
  }

  useEffect(() => {
    const i = tipoTaxa === 'anual' ? Math.pow(1 + taxa / 100, 1 / 12) - 1 : taxa / 100
    const n = Number(prazoMeses)
    const P = Number(valorInicial)
    const M = Number(metaPatrimonio)

    if (i === 0) {
      if (n <= 0) return
      const aporte = (M - P) / n
      setResultado({ aporte: Math.max(0, aporte), totalInvestido: P + (Math.max(0, aporte) * n), erro: null })
      return
    }

    const valorFuturoInicial = P * Math.pow(1 + i, n)

    if (valorFuturoInicial >= M) {
      setResultado({
        aporte: 0,
        totalInvestido: P,
        metaAtingida: true,
        erro: null
      })
      return
    }

    // Fórmula invertida dos juros compostos para achar o aporte (A)
    const aporteNecessario = (M - valorFuturoInicial) / (((Math.pow(1 + i, n) - 1) / i))

    setResultado({
      aporte: aporteNecessario,
      totalInvestido: P + (aporteNecessario * n),
      metaAtingida: false,
      erro: null
    })
  }, [metaPatrimonio, prazoMeses, taxa, tipoTaxa, valorInicial])

  return (
    <>
      <Head>
        <title>Quanto Investir por Mês para Atingir sua Meta? | FinanSim</title>
        <meta
          name="description"
          content="Calcule o valor exato que você precisa economizar e investir todo mês para alcançar seus objetivos financeiros e sonhos de consumo."
        />
      </Head>

      <Header />

      <div className="min-h-screen bg-gray-50 p-4 md:p-8">
        <main className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow">
          
          <div className="border-b pb-4 mb-6">
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              Calculadora: Quanto investir por mês?
            </h1>
            <p className="text-gray-600 mt-2 text-sm md:text-base">
              Tem um objetivo financeiro em mente? Descubra quanto você precisa poupar e aplicar mensalmente para acumular o valor que precisa dentro do seu prazo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            
            {/* Inputs */}
            <div className="bg-gray-50 p-5 rounded-xl border border-gray-100 space-y-4">
              <h2 className="text-sm font-bold uppercase tracking-wider text-gray-400">Sua Meta</h2>
              
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-gray-700 mb-1">Quanto quer acumular no total? (R$)</label>
                <input
                  type="number"
                  className="w-full border border-gray-300 rounded-md p-2 bg-white focus:ring-2 focus:ring-blue-500 outline-none font-medium"
                  value={metaPatrimonio}
                  onChange={e => setMetaPatrimonio(Number(e.target.value))}
                />
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-semibold text-gray-700 mb-1">Em quantos meses quer atingir a meta?</label>
                <input
                  type="number"
                  className="w-full border border-gray-300 rounded-md p-2 bg-white focus:ring-2 focus:ring-blue-500 outline-none font-medium"
                  value={prazoMeses}
                  onChange={e => setPrazoMeses(Number(e.target.value))}
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div className="col-span-2 flex flex-col">
                  <label className="text-sm font-semibold text-gray-700 mb-1">Taxa de rendimento esperada (%)</label>
                  <input
                    type="number"
                    step="0.01"
                    className="w-full border border-gray-300 rounded-md p-2 bg-white focus:ring-2 focus:ring-blue-500 outline-none font-medium"
                    value={taxa}
                    onChange={e => setTaxa(Number(e.target.value))}
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-sm font-semibold text-gray-700 mb-1">Período</label>
                  <select
                    className="w-full border border-gray-300 rounded-md p-2 bg-white focus:ring-2 focus:ring-blue-500 outline-none font-medium"
                    value={tipoTaxa}
                    onChange={e => setTipoTaxa(e.target.value)}
                  >
                    <option value="mensal">Ao Mês</option>
                    <option value="anual">Ao Ano</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-semibold text-gray-700 mb-1">Já tem algum valor para começar? (R$)</label>
                <input
                  type="number"
                  className="w-full border border-gray-300 rounded-md p-2 bg-white focus:ring-2 focus:ring-blue-500 outline-none font-medium"
                  value={valorInicial}
                  onChange={e => setValorInicial(Number(e.target.value))}
                />
              </div>
            </div>

            {/* Quadro de Resultados */}
            <div className="h-full flex flex-col justify-between">
              {resultado && (
                <div className="space-y-4">
                  <h2 className="text-sm font-bold uppercase tracking-wider text-gray-400">Seu Plano Financeiro</h2>
                  
                  <div className="bg-blue-50 border border-blue-100 p-5 rounded-xl">
                    <p className="text-xs text-blue-600 font-bold uppercase">Aporte Mensal Necessário</p>
                    {resultado.metaAtingida ? (
                      <p className="text-xl font-bold text-blue-950 mt-1">Sua meta já é atingida apenas com o valor inicial!</p>
                    ) : (
                      <p className="text-3xl font-black text-blue-900 tracking-tight mt-1">
                        {formatarMoeda(resultado.aporte)} <span className="text-sm font-normal text-gray-500">/ mês</span>
                      </p>
                    )}
                  </div>

                  <div className="bg-gray-50 border border-gray-200 p-4 rounded-xl text-sm text-gray-600 space-y-2">
                    <p><strong>Total tirado do seu bolso:</strong> {formatarMoeda(resultado.totalInvestido)}</p>
                    <p><strong>Total ganho em juros no período:</strong> {formatarMoeda(Math.max(0, metaPatrimonio - resultado.totalInvestido))}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Conteúdo Otimizado Humano */}
          <article className="mt-12 border-t pt-8 text-gray-800 space-y-6">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
              Como se planejar para alcançar seus objetivos financeiros?
            </h2>
            <p className="leading-relaxed">
              Guardar dinheiro sem uma meta clara é o caminho mais rápido para desanimar e gastar antes da hora. Quando você define exatamente quanto precisa e o prazo que tem para chegar lá, fica muito mais fácil encaixar esse esforço no seu orçamento mensal.
            </p>

            <h3 className="text-xl font-bold text-gray-900 pt-2">
              O poder de começar com um valor inicial
            </h3>
            <p className="leading-relaxed">
              Como você pôde ver na simulação, dar o pontapé inicial com qualquer quantia — seja R$ 1.000 ou R$ 10.000 — muda totalmente o jogo. Esse valor inicial sofre a ação dos juros compostos desde o primeiro dia. No longo prazo, isso diminui drasticamente o valor que você precisa tirar do próprio bolso todos os meses para atingir o mesmo objetivo.
            </p>

            {/* Caixa de Vendas Reestruturada */}
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-6 rounded-xl shadow-md mt-8">
              <h4 className="text-lg font-bold mb-2">
                🚀 Pare de apenas simular e comece a realizar
              </h4>
              <p className="text-blue-100 text-sm leading-relaxed mb-4">
                Saber quanto investir por mês é o primeiro passo. O segundo é ter disciplina para acompanhar esse crescimento. Desenvolvemos uma <strong>Planilha de Evolução Patrimonial Completa</strong> para você organizar suas contas, gerenciar seus investimentos e ver o gráfico do seu dinheiro subindo de forma automática.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                <a
                  href="https://pay.kiwify.com.br/SAMOtee"
                  className="inline-block bg-white text-blue-700 font-bold px-5 py-2.5 rounded-lg text-sm shadow hover:bg-blue-50 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Quero Conhecer a Planilha Completa
                </a>
                <Link href="/juros-compostos" className="text-sm text-blue-100 hover:text-white underline font-medium">
                  Usar Simulador de Juros Compostos
                </Link>
              </div>
            </div>
          </article>

        </main>
      </div>

      <Footer />
    </>
  )
}