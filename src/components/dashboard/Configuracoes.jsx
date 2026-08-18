import { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'

export function Configuracoes() {
  const { user, updateUser } = useAuth()
  const [nome, setNome] = useState(user?.user_metadata?.nome || '')
  const [email, setEmail] = useState(user?.email || '')
  const [senha, setSenha] = useState('')
  const [mensagem, setMensagem] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMensagem('')
    
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
      setMensagem('Nenhuma alteração realizada')
      return
    }

    const { error } = await updateUser(updates)
    if (error) {
      setMensagem('Erro ao atualizar: ' + error.message)
    } else {
      setMensagem('Dados atualizados com sucesso!')
      setSenha('')
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Configurações</h2>
      
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow">
        <div className="mb-4">
          <label className="block mb-2">Nome</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">E-mail</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Nova Senha</label>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            placeholder="Deixe em branco para manter a atual"
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        {mensagem && (
          <p className={`mb-4 ${mensagem.includes('sucesso') ? 'text-green-600' : 'text-red-600'}`}>
            {mensagem}
          </p>
        )}

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Salvar Alterações
        </button>
      </form>
    </div>
  )
}