import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'

export function Configuracoes() {
  const { user, updateUser } = useAuth()
  const [nome, setNome] = useState(user?.user_metadata?.nome || '')
  const [email, setEmail] = useState(user?.email || '')
  const [senha, setSenha] = useState('')
  const [mensagem, setMensagem] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMensagem('')
    setLoading(true)

    try {
      const updates = {}
      if (nome !== user?.user_metadata?.nome) {
        updates.data = { nome }
      }
      if (senha) {
        updates.password = senha
      }
      if (email !== user?.email) {
        updates.email = email
      }

      if (Object.keys(updates).length === 0) {
        setMensagem('ℹ️ Nenhuma alteração realizada')
        setLoading(false)
        return
      }

      const { error } = await updateUser(updates)
      if (error) {
        setMensagem('❌ ' + error.message)
      } else {
        setMensagem('✅ Dados atualizados com sucesso!')
        setSenha('')
      }
    } catch (err) {
      setMensagem('❌ Ocorreu um erro. Tente novamente.')
    }

    setLoading(false)
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-6">⚙️ Configurações</h2>
      
      <form onSubmit={handleSubmit} className="max-w-md">
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">Nome</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Seu nome"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">E-mail</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="seu@email.com"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">Nova Senha</label>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Deixe em branco para manter a atual"
            minLength={6}
          />
        </div>

        {mensagem && (
          <div className={`mb-4 p-3 rounded-lg text-sm ${
            mensagem.includes('sucesso') 
              ? 'bg-green-100 text-green-700' 
              : mensagem.includes('atualizados') || mensagem.includes('Nenhuma')
              ? 'bg-blue-100 text-blue-700'
              : 'bg-red-100 text-red-700'
          }`}>
            {mensagem}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? 'Salvando...' : 'Salvar Alterações'}
        </button>
      </form>
    </div>
  )
}