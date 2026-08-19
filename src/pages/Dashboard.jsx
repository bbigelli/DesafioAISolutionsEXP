import React, { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../services/supabase'
import { Clientes } from '../components/Clientes'
import { Configuracoes } from '../components/Configuracoes'

export function Dashboard() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('home') // 'home' é a página inicial
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [stats, setStats] = useState({
    total: 0,
    ativos: 0,
    inativos: 0,
    bloqueados: 0
  })
  const [loading, setLoading] = useState(true)

  // Carregar estatísticas ao entrar
  useEffect(() => {
    carregarEstatisticas()
  }, [])

  const carregarEstatisticas = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('clientes')
        .select('status')
        .eq('user_id', user.id)

      if (!error && data) {
        const total = data.length
        const ativos = data.filter(c => c.status === 'Ativo').length
        const inativos = data.filter(c => c.status === 'Inativo').length
        const bloqueados = data.filter(c => c.status === 'Bloqueado').length
        
        setStats({ total, ativos, inativos, bloqueados })
      }
    } catch (error) {
      console.error('Erro ao carregar estatísticas:', error)
    }
    setLoading(false)
  }

  const handleLogout = async () => {
    await signOut()
    navigate('/login')
  }

  const menuItems = [
    { id: 'home', label: 'Início', icon: '🏠' },
    { id: 'clientes', label: 'Clientes', icon: '📋' },
    { id: 'configuracoes', label: 'Configurações', icon: '⚙️' },
  ]

  // Página inicial com resumo
  const HomePage = () => (
    <div>
      {/* Título */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800">👋 Bem-vindo, {user?.user_metadata?.nome || user?.email}!</h2>
        <p className="text-gray-500">Aqui está o resumo da sua base de clientes.</p>
      </div>

      {/* Cards de Estatísticas */}
      {loading ? (
        <div className="text-center py-12">Carregando estatísticas...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total de Clientes</p>
                <p className="text-3xl font-bold text-gray-800">{stats.total}</p>
              </div>
              <div className="text-4xl">👥</div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Ativos</p>
                <p className="text-3xl font-bold text-green-600">{stats.ativos}</p>
              </div>
              <div className="text-4xl">✅</div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-yellow-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Inativos</p>
                <p className="text-3xl font-bold text-yellow-600">{stats.inativos}</p>
              </div>
              <div className="text-4xl">⏸️</div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-red-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Bloqueados</p>
                <p className="text-3xl font-bold text-red-600">{stats.bloqueados}</p>
              </div>
              <div className="text-4xl">🚫</div>
            </div>
          </div>
        </div>
      )}

      {/* Ações Rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div 
          onClick={() => setActiveTab('clientes')}
          className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition cursor-pointer"
        >
          <div className="flex items-center gap-4">
            <div className="text-4xl">📋</div>
            <div>
              <h3 className="font-bold text-gray-800">Gerenciar Clientes</h3>
              <p className="text-gray-500 text-sm">Adicione, edite ou remova clientes</p>
            </div>
          </div>
        </div>

        <div 
          onClick={() => setActiveTab('configuracoes')}
          className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition cursor-pointer"
        >
          <div className="flex items-center gap-4">
            <div className="text-4xl">⚙️</div>
            <div>
              <h3 className="font-bold text-gray-800">Configurações</h3>
              <p className="text-gray-500 text-sm">Atualize seus dados pessoais</p>
            </div>
          </div>
        </div>
      </div>

      {/* Dica / Call to Action */}
      {stats.total === 0 && !loading && (
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
          <p className="text-blue-700">
            🎯 Você ainda não tem clientes cadastrados. 
            <button 
              onClick={() => setActiveTab('clientes')}
              className="ml-2 text-blue-600 font-bold hover:underline"
            >
              Cadastre seu primeiro cliente agora!
            </button>
          </p>
        </div>
      )}
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-white shadow-lg transition-all duration-300 flex flex-col`}>
        <div className="p-4 border-b flex items-center gap-3">
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-gray-600 hover:text-gray-800"
          >
            {sidebarOpen ? '◀' : '▶'}
          </button>
          {sidebarOpen && (
            <span className="font-bold text-gray-800 text-lg">📊 Gestão</span>
          )}
        </div>

        <nav className="flex-1 p-4">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition mb-1 ${
                activeTab === item.id
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              {sidebarOpen && <span>{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
              {user?.email?.charAt(0).toUpperCase()}
            </div>
            {sidebarOpen && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800 truncate">
                  {user?.user_metadata?.nome || user?.email}
                </p>
                <p className="text-xs text-gray-500 truncate">{user?.email}</p>
              </div>
            )}
          </div>
          {sidebarOpen && (
            <button
              onClick={handleLogout}
              className="w-full mt-3 text-red-500 hover:text-red-700 text-sm flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-red-50 transition"
            >
              🚪 Sair
            </button>
          )}
        </div>
      </aside>

      {/* Conteúdo Principal */}
      <main className="flex-1 overflow-auto">
        <div className="p-6">
          {activeTab === 'home' && <HomePage />}
          {activeTab === 'clientes' && <Clientes />}
          {activeTab === 'configuracoes' && <Configuracoes />}
        </div>
      </main>
    </div>
  )
}