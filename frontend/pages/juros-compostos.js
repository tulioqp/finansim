import Simulator from '../components/Simulator'

export default function Juros() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <main className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-4">Simulador de Juros Compostos</h1>
        <p className="mb-4 text-sm text-gray-600">Calcule montante, rendimento e visualize a evolução mensal.</p>
        <Simulator />
      </main>
    </div>
  )
}
