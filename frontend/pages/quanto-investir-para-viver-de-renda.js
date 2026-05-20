import { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function QuantoInvestirParaViverDeRenda() {
  const [rendaMensal, setRendaMensal] = useState(5000)
  const [prazoAnos, setPrazoAnos] = useState(20)
  const [taxa, setTaxa] = useState(9.5) 
  const [tipoTaxa, setTipoTaxa] = useState('anual')
  const [valorInicial, setValorInicial] = useState(10000)
  const [considerarInflacao, setConsiderarInflacao] = useState(true)
  const [inflacao, setInflacao] = useState(4.5) 
  const [resultado, setResultado] = useState(null)

  function formatarMoeda(valor) {
    return valor.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    })
  }

  useEffect(() => {
    let taxaEfetiva = taxa

    if (considerarInflacao) {
      const inf = Number(inflacao) || 0
      if (inf >= taxa) {
        setResultado({
          erro: 'A inflação não pode ser maior ou igual à taxa de retorno. Ajuste os valores para ter um ganho real.',
        })
        return
      }
      taxaEfetiva = taxa - inf
    }

    const taxaMensal =
      tipoTaxa === 'anual'
        ? Math.pow(1 + taxaEfetiva / 100, 1 / 12) - 1
        : taxaEfetiva / 100

    if (taxaMensal <= 0) {
      setResultado({
        erro: 'A taxa real mensal precisa ser maior que zero. Ajuste os números informados.',
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
      erro: null,
    })
  }, [rendaMensal, prazoAnos, taxa, tipoTaxa, valorInicial, considerarInflacao, inflacao])

  return (
    <>
      <Head>
        <title>Quanto investir para Viver de Renda? Simulador Online | FinanSim</title>
        <meta
          name="description"
          content="Calcule quanto patrimônio você precisa acumular para viver de renda passiva todo mês e descubra o seu aporte mensal ideal considerando a inflação."
        />
      </Head>

      <Header />

      <div className="min-h-screen bg-gray-50 p-4 md:p-8">
        <main className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow">
          
          <div className="border-b pb-4 mb-6">
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              Quanto investir para viver de renda?
            </h1>
            <p className="text-gray-600 mt-2 text-sm md:text-base">
              Viver de renda significa construir um patrimônio que trabalhe por você. Junte o valor necessário para cobrir seu custo de vida mensal sem precisar mexer no dinheiro principal.
            </p>
          </div>

          {/* Grid de Inputs e Resultados */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            
            {/* Inputs do Simulador */}
            <div className="bg-gray-50 p-5 rounded-xl border border-gray-100 space-y-4">
              <h2 className="text-xs font-bold uppercase tracking-wider text-gray-400">Seus Objetivos</h2>
              
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-gray-700 mb-1">Renda mensal desejada (R$)</label>
                <input
                  type="number"
                  className="w-full border border-gray-300 rounded-md p-2 bg-white focus:ring-2 focus:ring-blue-500 outline-none font-medium"
                  value={rendaMensal}
                  onChange={e => setRendaMensal(Number(e.target.value))}
                />
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-semibold text-gray-700 mb-1">Em quantos anos quer atingir a meta?</label>
                <input
                  type="number"
                  className="w-full border border-gray-300 rounded-md p-2 bg-white focus:ring-2 focus:ring-blue-500 outline-none font-medium"
                  value={prazoAnos}
                  onChange={e => setPrazoAnos(Number(e.target.value))}
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div className="col-span-2 flex flex-col">
                  <label className="text-sm font-semibold text-gray-700 mb-1">Taxa de rendimento (%)</label>
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
                    <option value="anual">Ao Ano</option>
                    <option value="mensal">Ao Mês</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-semibold text-gray-700 mb-1">Já tem algum valor investido? (R$)</label>
                <input
                  type="number"
                  className="w-full border border-gray-300 rounded-md p-2 bg-white focus:ring-2 focus:ring-blue-500 outline-none font-medium"
                  value={valorInicial}
                  onChange={e => setValorInicial(Number(e.target.value))}
                />
              </div>

              <div className="pt-2 border-t border-gray-200">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="inflacaoCheck"
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    checked={considerarInflacao}
                    onChange={e => setConsiderarInflacao(e.target.checked)}
                  />
                  <label htmlFor="inflacaoCheck" className="text-sm font-medium text-gray-700 cursor-pointer">
                    Descontar a inflação (Cálculo Real)
                  </label>
                </div>
              </div>

              {considerarInflacao && (
                <div className="flex flex-col">
                  <label className="text-sm font-semibold text-gray-700 mb-1">Inflação anual estimada (%)</label>
                  <input
                    type="number"
                    step="0.01"
                    className="w-full border border-gray-300 rounded-md p-2 bg-white focus:ring-2 focus:ring-blue-500 outline-none font-medium"
                    value={inflacao}
                    onChange={e => setInflacao(e.target.value)}
                  />
                </div>
              )}
            </div>

            {/* Resultados */}
            <div className="h-full flex flex-col justify-between">
              {resultado && resultado.erro ? (
                <div className="p-4 border border-red-200 rounded-xl bg-red-50 text-red-700 text-sm font-medium">
                  ⚠️ {resultado.erro}
                </div>
              ) : resultado ? (
                <div className="space-y-4">
                  <h2 className="text-sm font-bold uppercase tracking-wider text-gray-400">O que você precisa fazer:</h2>
                  
                  <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl">
                    <p className="text-xs text-blue-600 font-bold uppercase">Patrimônio Total que Precisa Acumular</p>
                    <p className="text-2xl font-black text-blue-900 tracking-tight mt-1">
                      {formatarMoeda(resultado.patrimonio)}
                    </p>
                    <p className="text-xs text-blue-700/80 mt-1">Esse é o valor necessário para render seus R$ {rendaMensal.toLocaleString('pt-BR')} por mês sem acabar com o dinheiro.</p>
                  </div>

                  <div className="bg-green-50 border border-green-100 p-4 rounded-xl">
                    <p className="text-xs text-green-600 font-bold uppercase">Quanto Investir por Mês</p>
                    <p className="text-2xl font-black text-green-900 tracking-tight mt-1">
                      {formatarMoeda(resultado.aporte)} <span className="text-xs font-normal text-gray-500">/ mês</span>
                    </p>
                  </div>

                  <div className="bg-gray-50 border border-gray-200 p-4 rounded-xl text-sm text-gray-600 space-y-1">
                    <p><strong>Total investido por você:</strong> {formatarMoeda(resultado.totalInvestido)}</p>
                    <p><strong>Total ganho em juros:</strong> {formatarMoeda(Math.max(0, resultado.patrimonio - resultado.totalInvestido))}</p>
                  </div>
                </div>
              ) : null}
            </div>
          </div>

          {/* Conteúdo focado em SEO com escrita humana */}
          <article className="mt-12 border-t pt-8 text-gray-800 space-y-6">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
              Como funciona o plano para viver de renda?
            </h2>
            <p className="leading-relaxed">
              O segredo para viver de renda não é apenas juntar uma quantia alta de dinheiro, mas sim entender como esse patrimônio vai render ao longo do tempo. Quando você investe com foco em renda mensal, os juros gerados pelos seus investimentos servem para pagar suas despesas do dia a dia, mantendo o valor principal intacto na sua conta.
            </p>

            <h3 className="text-xl font-bold text-gray-900 pt-2">
              Conhece a Regra dos 4%?
            </h3>
            <p className="leading-relaxed">
              Essa é uma métrica famosa criada por especialistas norte-americanos. Ela diz que você pode sacar 4% do seu patrimônio acumulado todos os anos para cobrir seus custos, sem o risco de o dinheiro acabar ao longo das décadas.
            </p>
            <p className="leading-relaxed">
              Na prática: se o seu custo de vida é de R$ 5.000 por mês (R$ 60.000 por ano), seguindo essa regra de segurança, você precisaria de um patrimônio acumulado de cerca de <strong>R$ 1.500.000</strong>.
            </p>

            <h3 className="text-xl font-bold text-gray-900 pt-2">
              Por que você DEVE descontar a inflação do cálculo?
            </h3>
            <p className="leading-relaxed">
              Se você fizer uma simulação para 15 ou 20 anos sem considerar a inflação, o cálculo vai te enganar. R$ 5.000 hoje compram muito mais coisas do que R$ 5.000 daqui a duas décadas, porque os preços das coisas sobem.
            </p>
            <p className="leading-relaxed">
              Quando você ativa a opção <strong>"Descontar a inflação"</strong> em nossa calculadora, nós usamos a sua taxa de rendimento real. Isso significa que o valor que o simulador mostra no resultado já vem corrigido com o poder de compra de hoje, deixando seu planejamento muito mais seguro e realista.
            </p>

            {/* Tabela de Exemplos Práticos */}
            <div className="overflow-x-auto my-6 border border-gray-200 rounded-lg">
              <table className="min-w-full divide-y divide-gray-200 text-left text-sm">
                <thead className="bg-gray-50 font-bold text-gray-700">
                  <tr>
                    <th className="px-4 py-3">Renda Desejada</th>
                    <th className="px-4 py-3">Patrimônio Alvo (Rendimento Real de 5% a.a.)</th>
                    <th className="px-4 py-3">Patrimônio Alvo (Rendimento Real de 7% a.a.)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 text-gray-600">
                  <tr>
                    <td className="px-4 py-3 font-semibold text-gray-900">R$ 3.000 / mês</td>
                    <td className="px-4 py-3 text-blue-700 font-medium">R$ 732.189</td>
                    <td className="px-4 py-3 text-blue-700 font-medium">R$ 528.824</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-4 py-3 font-semibold text-gray-900">R$ 5.000 / mês</td>
                    <td className="px-4 py-3 text-blue-700 font-medium">R$ 1.220.316</td>
                    <td className="px-4 py-3 text-blue-700 font-medium">R$ 881.373</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-semibold text-gray-900">R$ 10.000 / mês</td>
                    <td className="px-4 py-3 text-blue-700 font-medium">R$ 2.440.632</td>
                    <td className="px-4 py-3 text-blue-700 font-medium">R$ 1.762.747</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-sm text-gray-500 italic">
              *Nota: Os valores da tabela servem como exemplos baseados em taxas de juros já livres da inflação, simulando carteiras focadas em dividendos de ações ou fundos imobiliários.
            </p>

            {/* Box de Conversão da Planilha */}
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-6 rounded-xl shadow-md mt-8">
              <h4 className="text-lg font-bold mb-2">
                📊 Saia das simulações e monte seu plano real hoje mesmo
              </h4>
              <p className="text-blue-100 text-sm leading-relaxed mb-4">
                Ver os números na tela ajuda, mas para alcançar a independência financeira você precisa acompanhar sua evolução mês a mês. Nós criamos uma <strong>Planilha de Evolução Patrimonial Completa</strong> onde você pode registrar seus investimentos reais (Renda Fixa, Fundos Imobiliários, Ações) e ver exatamente o quão perto está de viver de renda.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                <a
                  href="https://pay.kiwify.com.br/SAMOtee"
                  className="inline-block bg-white text-blue-700 font-bold px-5 py-2.5 rounded-lg text-sm shadow hover:bg-blue-50 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Garantir Planilha de Evolução Patrimonial
                </a>
                <Link href="/juros-compostos" className="text-sm text-blue-100 hover:text-white underline font-medium">
                  Ir para o simulador de juros compostos
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