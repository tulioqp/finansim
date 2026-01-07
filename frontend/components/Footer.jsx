export default function Footer() {
  return (
    <footer className="mt-12 border-t text-xs text-gray-500">
      <div className="max-w-5xl mx-auto px-6 py-6">
        <p className="mb-2">
          © {new Date().getFullYear()} FinanSim — Simuladores Financeiros
        </p>

        <p>
          Aviso legal: os simuladores e conteúdos deste site têm caráter
          exclusivamente educacional e informativo. Não constituem
          recomendação de investimento ou aconselhamento financeiro.
        </p>
      </div>
    </footer>
  )
}
