import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-white border-b">
      <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo / Nome */}
        <Link href="/" className="text-xl font-bold text-blue-600">
          FinanSim
        </Link>

        {/* Navegação */}
        <nav className="text-sm space-x-4">
          <Link href="/" className="hover:underline">
            Início
          </Link>
          <Link href="/juros-compostos" className="hover:underline">
            Juros Compostos
          </Link>
          <Link href="/quanto-investir-por-mes" className="hover:underline">
            Quanto Investir por Mês
          </Link>
        </nav>
      </div>
    </header>
  )
}
