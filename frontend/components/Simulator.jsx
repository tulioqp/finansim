import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
)

const Line = dynamic(() =>
  import('react-chartjs-2').then((mod) => mod.Line),
  { ssr: false }
)

function calcularJuros({ valor, aporte, taxa, meses }) {
  const i = taxa / 100
  const P = valor
  const A = aporte
  const n = meses

  let montante = 0
  let serie = []

  if (i === 0) {
    montante = P + A * n
    for (let t = 1; t <= n; t++) {
      serie.push(Number((P + A * t).toFixed(2)))
    }
  } else {
    montante =
      P * Math.pow(1 + i, n) +
      A * ((Math.pow(1 + i, n) - 1) / i)

    for (let t = 1; t <= n; t++) {
      const m_t =
        P * Math.pow(1 + i, t) +
        A * ((Math.pow(1 + i, t) - 1) / i)

      serie.push(Number(m_t.toFixed(2)))
    }
  }

  const investido = P + A * n
  const rendimento = montante - investido

  return {
    montante: Number(montante.toFixed(2)),
    investido: Number(investido.toFixed(2)),
    rendimento: Number(rendimento.toFixed(2)),
    serie,
    meses: n,
  }
}

export default function Simulator() {
  const [valor, setValor] = useState(1000)
  const [aporte, setAporte] = useState(100)
  const [taxa, setTaxa] = useState(1)
  const [meses, setMeses] = useState(12)

  const [resultado, setResultado] = useState(null)

  useEffect(() => {
    const res = calcularJuros({
      valor: Number(valor),
      aporte: Number(aporte),
      taxa: Number(taxa),
      meses: Number(meses),
    })

    setResultado(res)
  }, [valor, aporte, taxa, meses])

  const data = {
    labels: resultado?.serie.map((_, i) => `Mês ${i + 1}`),
    datasets: [
      {
        label: 'Evolução do investimento',
        data: resultado?.serie,
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        tension: 0.3,
      },
    ],
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Seção de Inputs com Labels */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-700 mb-1">Valor inicial (R$)</label>
          <input
            type="number"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
            className="border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-700 mb-1">Aporte mensal (R$)</label>
          <input
            type="number"
            value={aporte}
            onChange={(e) => setAporte(e.target.value)}
            className="border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-700 mb-1">Taxa de juros (% ao mês)</label>
          <input
            type="number"
            value={taxa}
            onChange={(e) => setTaxa(e.target.value)}
            className="border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-700 mb-1">Período (em meses)</label>
          <input
            type="number"
            value={meses}
            onChange={(e) => setMeses(e.target.value)}
            className="border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
      </div>

      {/* Cards de Resultado */}
      {resultado && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 text-center">
              <p className="text-sm text-blue-600 font-medium">Total Final (Montante)</p>
              <p className="text-xl font-bold text-blue-900">R$ {resultado.montante.toLocaleString('pt-BR')}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 text-center">
              <p className="text-sm text-gray-600 font-medium">Total Investido</p>
              <p className="text-xl font-bold text-gray-900">R$ {resultado.investido.toLocaleString('pt-BR')}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg border border-green-100 text-center">
              <p className="text-sm text-green-600 font-medium">Total em Juros</p>
              <p className="text-xl font-bold text-green-900">R$ {resultado.rendimento.toLocaleString('pt-BR')}</p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <Line data={data} options={{ responsive: true, maintainAspectRatio: true }} />
          </div>
        </div>
      )}
    </div>
  )
}