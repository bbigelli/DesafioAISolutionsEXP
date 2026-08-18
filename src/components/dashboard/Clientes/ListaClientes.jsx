import { useEffect, useState } from 'react'
import { supabase } from '../../../services/supabase'
import { useAuth } from '../../../contexts/AuthContext'

export function ListaClientes() {
  const [clientes, setClientes] = useState([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  useEffect(() => {
    carregarClientes()
  }, [])

  const carregarClientes = async () => {
    const { data, error } = await supabase
      .from('clientes')
      .select('*')
      .eq('user_id', user.id)
      .order('data_cadastro', { ascending: false })

    if (!error && data) {
      setClientes(data)
    }
    setLoading(false)
  }

  const excluirCliente = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este cliente?')) {
      await supabase.from('clientes').delete().eq('id', id)
      carregarClientes()
    }
  }

  if (loading) return <div>Carregando...</div>

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Gestão de Clientes</h2>
      
      <button className="mb-4 bg-green-600 text-white px-4 py-2 rounded">
        + Novo Cliente
      </button>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border">Nome</th>
              <th className="px-4 py-2 border">Telefone</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Data Cadastro</th>
              <th className="px-4 py-2 border">Ações</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map(cliente => (
              <tr key={cliente.id}>
                <td className="px-4 py-2 border">{cliente.nome}</td>
                <td className="px-4 py-2 border">{cliente.telefone}</td>
                <td className="px-4 py-2 border">
                  <span className={`px-2 py-1 rounded text-sm ${
                    cliente.status === 'Ativo' ? 'bg-green-100 text-green-800' : 'bg-gray-100'
                  }`}>
                    {cliente.status}
                  </span>
                </td>
                <td className="px-4 py-2 border">
                  {new Date(cliente.data_cadastro).toLocaleDateString('pt-BR')}
                </td>
                <td className="px-4 py-2 border">
                  <button className="text-blue-600 mr-2">✏️</button>
                  <button 
                    onClick={() => excluirCliente(cliente.id)}
                    className="text-red-600"
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}