import { useState } from 'react'
import Link from 'next/link'

export default function Header() {
  const [isCalculadorasOpen, setIsCalculadorasOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="bg-white border-b sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-black text-blue-600 tracking-tight">
          FinanSim
        </Link>

        {/* NAVEGAÇÃO DESKTOP (Telas Médias e Grandes) */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-700">
          <Link href="/" className="hover:text-blue-600 transition-colors">
            Início
          </Link>

          {/* Dropdown Calculadoras */}
          <div 
            className="relative"
            onMouseEnter={() => setIsCalculadorasOpen(true)}
            onMouseLeave={() => setIsCalculadorasOpen(false)}
          >
            <button className="flex items-center hover:text-blue-600 transition-colors py-2">
              Calculadoras
              <svg className={`ml-1 w-4 h-4 transition-transform ${isCalculadorasOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {isCalculadorasOpen && (
              <div className="absolute left-0 w-64 bg-white border border-gray-100 shadow-xl rounded-lg py-2 mt-0">
                <Link href="/juros-compostos" className="block px-4 py-3 hover:bg-blue-50 hover:text-blue-700 transition-colors border-b border-gray-50">
                  <span className="block font-bold">Juros Compostos</span>
                  <span className="text-xs text-gray-500">Simule o poder dos juros sobre juros.</span>
                </Link>
                <Link href="/quanto-investir-por-mes" className="block px-4 py-3 hover:bg-blue-50 hover:text-blue-700 transition-colors border-b border-gray-50">
                  <span className="block font-bold">Quanto Investir por Mês</span>
                  <span className="text-xs text-gray-500">Calcule o aporte para atingir sua meta.</span>
                </Link>
                <Link href="/quanto-investir-para-viver-de-renda" className="block px-4 py-3 hover:bg-blue-50 hover:text-blue-700 transition-colors">
                  <span className="block font-bold">Viver de Renda</span>
                  <span className="text-xs text-gray-500">Descubra quanto você precisa para parar.</span>
                </Link>
              </div>
            )}
          </div>

          {/* Menu Artigos/Blog */}
          <div className="relative group">
            <button className="flex items-center hover:text-blue-600 transition-colors py-2">
              Aprenda
              <svg className="ml-1 w-4 h-4 group-hover:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className="absolute hidden group-hover:block left-0 w-56 bg-white border border-gray-100 shadow-xl rounded-lg py-2">
              <Link href="/quanto-rende-100-mil" className="block px-4 py-2 hover:bg-gray-50">Quanto rende R$ 100 mil?</Link>
              <Link href="#" className="block px-4 py-2 hover:bg-gray-50 text-gray-400 cursor-not-allowed">Guia de Investimentos (em breve)</Link>
              <Link href="#" className="block px-4 py-2 hover:bg-gray-50 text-gray-400 cursor-not-allowed">O que é Selic? (em breve)</Link>
            </div>
          </div>

          <Link href="/sobre" className="hover:text-blue-600 transition-colors">
            Sobre
          </Link>
        </nav>

        {/* Botão de Destaque Desktop */}
        <div className="hidden md:block">
          <a 
            href="https://pay.kiwify.com.br/SAMOtee" 
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 text-white px-5 py-2 rounded-full text-sm font-bold hover:bg-blue-700 transition-shadow shadow-md hover:shadow-lg"
          >
            Baixar Planilha
          </a>
        </div>

        {/* Botão Hambúrguer para Mobile */}
        <div className="md:hidden">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
            className="text-gray-700 hover:text-blue-600 focus:outline-none"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* MENU MOBILE (Exibido apenas em telas pequenas quando aberto) */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 space-y-4 shadow-inner">
          <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="block font-medium text-gray-700 hover:text-blue-600">
            Início
          </Link>
          
          <div className="space-y-2">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Calculadoras</p>
            <Link href="/juros-compostos" onClick={() => setIsMobileMenuOpen(false)} className="block pl-3 text-sm font-medium text-gray-600 hover:text-blue-600">
              - Juros Compostos
            </Link>
            <Link href="/quanto-investir-por-mes" onClick={() => setIsMobileMenuOpen(false)} className="block pl-3 text-sm font-medium text-gray-600 hover:text-blue-600">
              - Quanto Investir por Mês
            </Link>
            <Link href="/quanto-investir-para-viver-de-renda" onClick={() => setIsMobileMenuOpen(false)} className="block pl-3 text-sm font-medium text-gray-600 hover:text-blue-600">
              - Viver de Renda
            </Link>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Artigos</p>
            <Link href="/quanto-rende-100-mil" onClick={() => setIsMobileMenuOpen(false)} className="block pl-3 text-sm font-medium text-gray-600 hover:text-blue-600">
              - Quanto rende R$ 100 mil?
            </Link>
          </div>

          <div className="pt-2">
            <a 
              href="https://pay.kiwify.com.br/SAMOtee"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center bg-blue-600 text-white py-2.5 rounded-lg text-sm font-bold shadow"
            >
              Baixar Planilha
            </a>
          </div>
        </div>
      )}
    </header>
  )
}