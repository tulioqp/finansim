import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Simulator from '../components/Simulator'

export default function Juros() {
  return (
    <>
      <Head>
        <title>Simulador de Juros Compostos | FinanSim</title>
        <meta
          name="description"
          content="Simule juros compostos com aporte mensal e acompanhe a evolução do seu investimento."
        />
      </Head>

      <Header />

      <div className="min-h-screen bg-gray-50 p-4 md:p-8">
        <main className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow">
          <h1 className="text-3xl font-extrabold mb-2 text-gray-900">
            Simulador de Juros Compostos
          </h1>

          <p className="mb-6 text-sm text-gray-600">
            Calcule montante, rendimento e visualize a evolução de seus investimentos mês a mês em tempo real.
          </p>

          {/* Renderização do Simulador e Gráfico */}
          <Simulator />

          {/* Seção de Conteúdo Otimizado para SEO */}
          <article className="mt-12 border-t pt-8 text-gray-800">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-4">
              Como Funciona o Cálculo de Juros Compostos?
            </h2>
            <p className="text-base leading-relaxed mb-6">
              Diferente dos juros simples, onde a taxa incide apenas sobre o valor inicial, os 
              <strong> juros compostos</strong> funcionam na lógica de "juros sobre juros". Isso significa 
              que o rendimento de cada período é somado ao capital para o cálculo dos juros do mês seguinte, 
              criando um efeito de crescimento exponencial ao longo do tempo.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">
              A Fórmula dos Juros Compostos com Aportes Mensais
            </h3>
            <p className="mb-4 text-base leading-relaxed">
              Para calcular a evolução de um patrimônio com investimentos recorrentes, utilizamos a fórmula matemática que combina o montante inicial capitalizado e a soma da série de aportes:
            </p>
            
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 font-mono text-center my-6 text-sm md:text-base overflow-x-auto text-gray-700">
              M = P · (1 + i)ⁿ + A · [ ((1 + i)ⁿ - 1) / i ]
            </div>

            <p className="mb-4 text-base">Onde cada variável representa:</p>
            <ul className="list-dist pl-6 space-y-2 mb-6 text-base text-gray-700">
              <li><strong>M (Montante):</strong> O valor total final acumulado.</li>
              <li><strong>P (Principal / Valor Inicial):</strong> O capital que você colocou no primeiro dia.</li>
              <li><strong>A (Aporte Mensal):</strong> O valor fixo investido todos os meses.</li>
              <li><strong>i (Taxa de Juros):</strong> A taxa de rendimento por período (expressa em decimal, ex: 1% = 0,01).</li>
              <li><strong>n (Período):</strong> O número total de meses que o dinheiro ficou rendendo.</li>
            </ul>

            <hr className="my-8 border-gray-200" />

            <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">
              Simulação Prática: O Efeito do Tempo no Patrimônio
            </h3>
            <p className="mb-6 text-base leading-relaxed">
              Veja na tabela abaixo um exemplo prático de como pequenos aportes mensais se comportam ao longo de 10, 20 e 30 anos, considerando uma taxa de juros estimada em <strong>1% ao mês</strong> (aproximadamente 12,68% ao ano):
            </p>

            {/* Tabela Estática para o Google Indexar */}
            <div className="overflow-x-auto my-6 border border-gray-200 rounded-lg">
              <table className="min-w-full divide-y divide-gray-200 text-left text-sm">
                <thead className="bg-gray-50 font-bold text-gray-700">
                  <tr>
                    <th className="px-4 py-3">Aporte Mensal</th>
                    <th className="px-4 py-3">Em 10 anos (120 meses)</th>
                    <th className="px-4 py-3">Em 20 anos (240 meses)</th>
                    <th className="px-4 py-3">Em 30 anos (360 meses)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 text-gray-600">
                  <tr>
                    <td className="px-4 py-3 font-medium text-gray-900">R$ 100 / mês</td>
                    <td className="px-4 py-3 text-green-700 font-medium">R$ 23.003,87</td>
                    <td className="px-4 py-3 text-green-700 font-medium">R$ 98.925,54</td>
                    <td className="px-4 py-3 text-green-700 font-medium">R$ 349.496,41</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-900">R$ 500 / mês</td>
                    <td className="px-4 py-3 text-green-700 font-medium">R$ 115.019,34</td>
                    <td className="px-4 py-3 text-green-700 font-medium">R$ 494.627,72</td>
                    <td className="px-4 py-3 text-green-700 font-medium">R$ 1.747.482,07</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium text-gray-900">R$ 1.000 / mês</td>
                    <td className="px-4 py-3 text-green-700 font-medium">R$ 230.038,69</td>
                    <td className="px-4 py-3 text-green-700 font-medium">R$ 989.255,44</td>
                    <td className="px-4 py-3 text-green-700 font-medium">R$ 3.494.964,13</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <hr className="my-8 border-gray-200" />

            {/* FAQ com perguntas frequentes (Alvo de Rich Snippets) */}
            <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">
              Perguntas Frequentes sobre Juros Compostos
            </h3>
            <div className="space-y-6 mb-6">
              <div>
                <h4 className="font-bold text-gray-900 text-base">Qual a diferença entre juros simples e juros compostos?</h4>
                <p className="text-gray-600 mt-1 text-sm leading-relaxed">
                  Nos juros simples, o rendimento é calculado sempre em cima do valor inicial. Nos juros compostos, o rendimento de cada mês é incorporado ao saldo, fazendo com que os juros do mês seguinte sejam maiores.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-base">Como transformar uma taxa anual em taxa mensal?</h4>
                <p className="text-gray-600 mt-1 text-sm leading-relaxed">
                  Para juros compostos, não basta dividir por 12. A fórmula correta de equivalência é: i_mensal = (1 + i_anual)^(1/12) - 1. Por exemplo, uma taxa de 12% ao ano equivale a cerca de 0,95% ao mês.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-base">Onde encontrar investimentos que rendem juros compostos?</h4>
                <p className="text-gray-600 mt-1 text-sm leading-relaxed">
                  A maioria dos produtos de renda fixa (como Tesouro Direto, CDBs, LCI, LCA) e fundos de investimento utilizam o regime de juros compostos para capitalizar os rendimentos de forma diária ou mensal.
                </p>
              </div>
            </div>
          </article>
        </main>
      </div>

      <Footer />
    </>
  )
}