import { useState } from 'react'
import axios from 'axios'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

export default function Simulator() {
  const [valor, setValor] = useState(1000)
  const [aporte, setAporte] = useState(0)
  const [taxa, setTaxa] = useState(1)
  const [meses, setMeses] = useState(12)
  const [resultado, setResultado] = useState(null)
  const [loading, setLoading] = useState(false)

  const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8000'

  async function submit(e) {
    e.preventDefault()
    setLoading(true)
    try {
      const resp = await axios.post(`${API_BASE}/juros-compostos`, {
        valor_inicial: Number(valor),
        aporte: Number(aporte),
        taxa: Number(taxa),
        meses: Number(meses),
      })
      setResultado(resp.data)
    } catch (err) {
      console.error(err)
      alert('Erro ao calcular — ver console')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <form onSubmit={submit} className="space-y-4">
        <div>
          <label className="block text-sm">Valor inicial (R$)</label>
          <input className="mt-1 w-full border rounded p-2" type="number" value={valor} onChange={e => setValor(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm">Aporte mensal (R$)</label>
          <input className="mt-1 w-full border rounded p-2" type="number" value={aporte} onChange={e => setAporte(e.target.value)} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm">Taxa (% ao mês)</label>
            <input className="mt-1 w-full border rounded p-2" type="number" step="0.01" value={taxa} onChange={e => setTaxa(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm">Período (meses)</label>
            <input className="mt-1 w-full border rounded p-2" type="number" value={meses} onChange={e => setMeses(e.target.value)} />
          </div>
        </div>

        <div>
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded" disabled={loading}>
            {loading ? 'Calculando...' : 'Calcular'}
          </button>
        </div>
      </form>

      {resultado && (
        <div className="mt-6">
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="p-4 border rounded">
              <div className="text-sm text-gray-500">Montante</div>
              <div className="text-lg font-bold">R$ {resultado.montante.toLocaleString('pt-BR')}</div>
            </div>
            <div className="p-4 border rounded">
              <div className="text-sm text-gray-500">Investido</div>
              <div className="text-lg font-bold">R$ {resultado.investido.toLocaleString('pt-BR')}</div>
            </div>
            <div className="p-4 border rounded">
              <div className="text-sm text-gray-500">Rendimento</div>
              <div className="text-lg font-bold">R$ {resultado.rendimento.toLocaleString('pt-BR')}</div>
            </div>
          </div>

          <div>
            <Line
              data={{
                labels: Array.from({ length: resultado.meses }, (_, i) => `${i + 1}`),
                datasets: [
                  {
                    label: 'Saldo (R$)',
                    data: resultado.serie,
                    tension: 0.3,
                    fill: false,
                  },
                ],
              }}
            />
          </div>
        </div>
      )}
    </div>
  )
}