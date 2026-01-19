import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-sm text-gray-600 p-6">
      <div className="max-w-2xl mx-auto text-center space-y-2">
        <p>© {new Date().getFullYear()} FinanSim</p>

        <div className="flex justify-center gap-4">
          <Link href="/sobre" className="hover:underline">
            Sobre
          </Link>

          <Link href="/privacidade" className="hover:underline">
            Privacidade
          </Link>

          <Link href="/termos" className="hover:underline">
            Termos
          </Link>
        </div>
      </div>
    </footer>
  )
}
