/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useState, useEffect } from 'react'

interface IUsers {
  nome: string
  senha: string
  email: string
  id?: string
}

export function CrudUser() {
  const [users, setUsers] = useState<IUsers[]>([])
  const [form, setForm] = useState({ nome: '', email: '', senha: '' })
  const [editingId, setEditingId] = useState<string | null>(null)

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    const response = await window.api.listUser()
    setUsers(response)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (editingId) {
      const updatedUser = { ...form, id: editingId }
      window.api.updateUser(updatedUser)
      setEditingId(null)
    } else {
      await window.api.createUser(form)
    }
    setForm({ nome: '', email: '', senha: '' })
    fetchUsers()
  }

  const handleEdit = (user: IUsers) => {
    setForm({ nome: user.nome, email: user.email, senha: user.senha })
    setEditingId(user.id || null)
  }

  const handleDelete = async (id: string) => {
    window.api.deleteUser(id)
    fetchUsers()
  }

  return (
    <div>
      <h1>CRUD de Usuários</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nome"
          placeholder="Nome"
          value={form.nome}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="senha"
          placeholder="Senha"
          value={form.senha}
          onChange={handleChange}
        />
        <button type="submit">{editingId ? 'Atualizar' : 'Adicionar'}</button>
      </form>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.nome} - {user.email}
            <button onClick={() => handleEdit(user)}>Editar</button>
            <button onClick={() => handleDelete(user.id!)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
