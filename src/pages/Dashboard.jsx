import React, { useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../services/supabase'
import { Clientes } from '../components/Clientes'
import { Configuracoes } from '../components/Configuracoes'

export function Dashboard() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('clientes')

  const handleLogout = async () => {
    await signOut()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <h1 className="text-2xl font-bold text-gray-800">📊 Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-600 text-sm hidden sm:inline">
              👤 {user?.email}
            </span>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition text-sm"
            >
              Sair
            </button>
          </div>
        </div>
      </header>

      {/* Navegação */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex gap-2 border-b">
          <button
            onClick={() => setActiveTab('clientes')}
            className={`px-4 py-2 font-medium transition ${
              activeTab === 'clientes' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            📋 Clientes
          </button>
          <button
            onClick={() => setActiveTab('configuracoes')}
            className={`px-4 py-2 font-medium transition ${
              activeTab === 'configuracoes' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            ⚙️ Configurações
          </button>
        </div>
      </div>

      {/* Conteúdo */}
      <main className="max-w-7xl mx-auto px-4 pb-8">
        {activeTab === 'clientes' && <Clientes />}
        {activeTab === 'configuracoes' && <Configuracoes />}
      </main>
    </div>
  )
}