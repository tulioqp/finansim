import { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function QuantoRende100Mil() {
  const [taxa, setTaxa] = useState(10.75) // Iniciando com uma taxa real simulando a Selic/CDI atual
  const [tipoTaxa, setTipoTaxa] = useState('anual')
  const [resultado, setResultado] = useState(null)

  // Cálculo automático em tempo real ao alterar os inputs
  useEffect(() => {
    let taxaMensal =
      tipoTaxa === 'anual'
        ? Math.pow(1 + taxa / 100, 1 / 12) - 1
        : taxa / 100

    const rendimentoMensal = 100000 * taxaMensal
    setResultado(rendimentoMensal)
  }, [taxa, tipoTaxa])

  return (
    <>
      <Head>
        <title>Quanto rende 100 mil reais por mês? Simulador Online | FinanSim</title>
        <meta
          name="description"
          content="Descubra exatamente quanto rende 100 mil reais por mês no CDI, Poupança, Tesouro Direto e fundos imobiliários. Simule cenários em tempo real."
        />
      </Head>

      <Header />

      <div className="min-h-screen bg-gray-50 p-4 md:p-8">
        <main className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow">
          
          <div className="border-b pb-4 mb-6">
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              Quanto rende 100 mil reais por mês?
            </h1>
            <p className="text-gray-600 mt-2 text-sm md:text-base">
              Investir R$ 100.000 pode gerar uma excelente renda passiva mensal. Altere os parâmetros abaixo para simular o rendimento líquido estimado de acordo com a taxa de juros escolhida.
            </p>
          </div>

          {/* Grid de Ferramenta */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            
            {/* Formulário Interativo */}
            <div className="bg-gray-50 p-5 rounded-xl border border-gray-100 space-y-4">
              <h2 className="text-sm font-bold uppercase tracking-wider text-gray-400">Parâmetros do Cálculo</h2>
              
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-gray-700 mb-1">Taxa de juros (%)</label>
                <input
                  type="number"
                  step="0.01"
                  className="w-full border border-gray-300 rounded-md p-2.5 bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium"
                  value={taxa}
                  onChange={e => setTaxa(Number(e.target.value))}
                />
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-semibold text-gray-700 mb-1">Período da Taxa</label>
                <select
                  className="w-full border border-gray-300 rounded-md p-2.5 bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium"
                  value={tipoTaxa}
                  onChange={e => setTipoTaxa(e.target.value)}
                >
                  <option value="anual">Ao Ano (ex: Taxa Selic / CDI)</option>
                  <option value="mensal">Ao Mês</option>
                </select>
              </div>
            </div>

            {/* Resultado Visual de Alto Impacto */}
            {resultado !== null && (
              <div className="p-6 border border-blue-100 rounded-xl bg-blue-50/50 flex flex-col justify-between h-full">
                <div>
                  <h2 className="text-sm font-bold uppercase tracking-wider text-blue-500 mb-2">Rendimento Estimado</h2>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Com uma taxa de <span className="font-semibold text-gray-900">{taxa}% {tipoTaxa === 'anual' ? 'ao ano' : 'ao mês'}</span>, o montante de R$ 100.000 gera uma renda de:
                  </p>
                  
                  <p className="text-3xl font-black text-blue-600 mt-4 tracking-tight">
                    {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    }).format(resultado)} <span className="text-sm font-normal text-gray-500">/ mês</span>
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-blue-100 text-xs text-gray-500">
                  ⚠️ Não considera descontos de Imposto de Renda (IR) ou eventuais taxas administrativas de custódia.
                </div>
              </div>
            )}
          </div>

          {/* Bloco de Conteúdo Otimizado para SEO */}
          <article className="mt-12 border-t pt-8 text-gray-800 space-y-6">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
              Onde investir 100 mil reais para gerar renda passiva?
            </h2>
            <p className="leading-relaxed">
              A resposta exata para a pergunta "quanto rende 100 mil reais" depende exclusivamente do veículo de investimento escolhido. Diferentes classes de ativos oferecem níveis variados de risco, liquidez e rentabilidade líquida. Veja abaixo os principais cenários do mercado financeiro atual:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
              <div className="p-4 border border-gray-100 rounded-lg bg-gray-50">
                <h3 className="font-bold text-gray-900 text-base mb-1">1. CDI (Certificado de Depósito Interbancário)</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Considerado o benchmark da renda fixa de liquidez diária (contas digitais, CDBs de grandes bancos). Se o CDI estiver em torno de 10,50% ao ano, o rendimento mensal bruto de R$ 100 mil fica próximo de R$ 835,00, restando descontar o Imposto de Renda conforme o tempo de permanência.
                </p>
              </div>
              
              <div className="p-4 border border-gray-100 rounded-lg bg-gray-50">
                <h3 className="font-bold text-gray-900 text-base mb-1">2. Caderneta de Poupança</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  A poupança rende 0,5% ao mês + Taxa Referencial (TR) quando a Selic está acima de 8,5% ao ano. Sob essas condições, R$ 100 mil rendem por volta de R$ 500,00 fixos mensais. Apesar de isenta de IR, costuma perder poder de compra para a inflação no longo prazo.
                </p>
              </div>

              <div className="p-4 border border-gray-100 rounded-lg bg-gray-50">
                <h3 className="font-bold text-gray-900 text-base mb-1">3. Fundos Imobiliários (FIIs)</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Os FIIs distribuem aluguéis mensais diretamente na conta da corretora, que atualmente são isentos de Imposto de Renda para pessoas físicas. Uma carteira diversificada com dividend yield médio estimado em 0,8% ao mês pode gerar aproximadamente R$ 800,00 mensais livres.
                </p>
              </div>

              <div className="p-4 border border-gray-100 rounded-lg bg-gray-50">
                <h3 className="font-bold text-gray-900 text-base mb-1">4. Tesouro Direto (Tesouro Selic)</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  O investimento mais seguro do país. O Tesouro Selic acompanha a taxa básica de juros da economia. Possui fluxo de juros compostos diários e excelente liquidez para quem busca construir ou alocar uma reserva de emergência resiliente.
                </p>
              </div>
            </div>

            <h3 className="text-xl font-bold text-gray-900 pt-2">
              A Importância dos Juros Compostos e Aportes Recorrentes
            </h3>
            <p className="leading-relaxed">
              Embora viver de renda passiva com R$ 100.000 já seja um excelente ponto de partida, o verdadeiro acúmulo de riqueza exponencial acontece quando você reinveste os ganhos e adiciona novos aportes mensais econômicos. 
            </p>
            <p className="leading-relaxed">
              Para planejar os próximos passos de sua jornada até a independência financeira, recomendamos utilizar nossa ferramenta dedicada do <Link href="/juros-compostos" className="text-blue-600 font-semibold hover:underline">Simulador de Juros Compostos</Link>, onde é possível projetar detalhadamente o efeito transformador do tempo sobre o seu capital.
            </p>

            {/* Box Premium de Conversão */}
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-6 rounded-xl shadow-md mt-8">
              <h4 className="text-lg font-bold mb-2">
                🚀 Leve Seu Controle Patrimonial Para o Próximo Nível
              </h4>
              <p className="text-blue-100 text-sm leading-relaxed mb-4">
                Quer parar de fazer simulações isoladas e ter um mapa visual exato de quando você poderá viver de renda? Desenvolvemos uma planilha profissional de evolução patrimonial automatizada. Com ela você gerencia metas, aportes e calcula o crescimento real dos seus investimentos com facilidade.
              </p>
              <div>
                <a
                  href="https://pay.kiwify.com.br/SAMOtee"
                  className="inline-block bg-white text-blue-700 font-bold px-5 py-2.5 rounded-lg text-sm shadow hover:bg-blue-50 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Conhecer a Planilha de Evolução Patrimonial
                </a>
              </div>
            </div>
          </article>

        </main>
      </div>

      <Footer />
    </>
  )
}