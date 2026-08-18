import React, { useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../services/supabase'

export function Clientes() {
  const { user } = useAuth()
  const [clientes, setClientes] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editando, setEditando] = useState(null)
  const [formData, setFormData] = useState({
    nome: '',
    contato: '',
    status: 'Ativo'
  })

  useEffect(() => {
    carregarClientes()
  }, [])

  const carregarClientes = async () => {
    setLoading(true)
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

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (editando) {
      // Editar
      const { error } = await supabase
        .from('clientes')
        .update({ ...formData })
        .eq('id', editando)
      
      if (!error) {
        alert('✅ Cliente atualizado!')
        setShowForm(false)
        setEditando(null)
        setFormData({ nome: '', contato: '', status: 'Ativo' })
        carregarClientes()
      }
    } else {
      // Criar
      const { error } = await supabase
        .from('clientes')
        .insert([{ ...formData, user_id: user.id }])
      
      if (!error) {
        alert('✅ Cliente cadastrado!')
        setShowForm(false)
        setFormData({ nome: '', contato: '', status: 'Ativo' })
        carregarClientes()
      }
    }
  }

  const handleEdit = (cliente) => {
    setEditando(cliente.id)
    setFormData({
      nome: cliente.nome,
      contato: cliente.contato || '',
      status: cliente.status || 'Ativo'
    })
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este cliente?')) {
      const { error } = await supabase
        .from('clientes')
        .delete()
        .eq('id', id)
      
      if (!error) {
        alert('✅ Cliente excluído!')
        carregarClientes()
      }
    }
  }

  const cancelarForm = () => {
    setShowForm(false)
    setEditando(null)
    setFormData({ nome: '', contato: '', status: 'Ativo' })
  }

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-center text-gray-500">Carregando clientes...</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">📋 Lista de Clientes</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
        >
          + Adicionar Cliente
        </button>
      </div>

      {/* Formulário */}
      {showForm && (
        <div className="mb-6 p-4 border rounded-lg bg-gray-50">
          <h3 className="font-bold mb-4">
            {editando ? '✏️ Editar Cliente' : '📝 Novo Cliente'}
          </h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Nome *"
              value={formData.nome}
              onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
              className="px-3 py-2 border rounded"
              required
            />
            <input
              type="text"
              placeholder="Contato"
              value={formData.contato}
              onChange={(e) => setFormData({ ...formData, contato: e.target.value })}
              className="px-3 py-2 border rounded"
            />
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="px-3 py-2 border rounded"
            >
              <option value="Ativo">Ativo</option>
              <option value="Inativo">Inativo</option>
              <option value="Bloqueado">Bloqueado</option>
            </select>
            <div className="md:col-span-3 flex gap-2">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Salvar
              </button>
              <button
                type="button"
                onClick={cancelarForm}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Lista de Clientes */}
      {clientes.length === 0 ? (
        <p className="text-gray-500 text-center py-8">
          Nenhum cliente cadastrado ainda.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="px-4 py-2 text-left text-sm font-semibold">Nome</th>
                <th className="px-4 py-2 text-left text-sm font-semibold">Contato</th>
                <th className="px-4 py-2 text-left text-sm font-semibold">Status</th>
                <th className="px-4 py-2 text-left text-sm font-semibold">Data Cadastro</th>
                <th className="px-4 py-2 text-left text-sm font-semibold">Ações</th>
              </tr>
            </thead>
            <tbody>
              {clientes.map((cliente) => (
                <tr key={cliente.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">{cliente.nome}</td>
                  <td className="px-4 py-2">{cliente.contato || '-'}</td>
                  <td className="px-4 py-2">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      cliente.status === 'Ativo' 
                        ? 'bg-green-100 text-green-800' 
                        : cliente.status === 'Bloqueado'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {cliente.status || 'Ativo'}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-sm">
                    {new Date(cliente.data_cadastro).toLocaleDateString('pt-BR')}
                  </td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleEdit(cliente)}
                      className="text-blue-600 hover:text-blue-800 mr-3"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => handleDelete(cliente.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}