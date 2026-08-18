import React from 'react'
import { Link } from 'react-router-dom'

export function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex flex-col items-center justify-center text-white px-4">
      <h1 className="text-5xl font-bold mb-4">🚀 Plataforma de Gestão</h1>
      <p className="text-xl mb-8 text-center max-w-2xl">
        Sistema completo para gerenciar seus clientes de forma simples e eficiente
      </p>
      <div className="flex gap-4">
        <Link 
          to="/login"
          className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition"
        >
          Começar →
        </Link>
      </div>
    </div>
  )
}