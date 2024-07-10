/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useState, useEffect } from 'react'

interface IUsers {
  name: string
  password: string
  email: string
  _id?: string
}

export function CrudUser() {
  const [users, setUsers] = useState<IUsers[]>([])
  const [form, setForm] = useState({ name: '', email: '', password: '' })
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
      const updatedUser = { ...form, _id: editingId }

      window.api.updateUser(updatedUser)
      setEditingId(null)
    } else {
      window.api.createUser(form)
    }
    setForm({ name: '', email: '', password: '' })
    fetchUsers()
  }

  const handleEdit = (user: IUsers) => {
    setForm({ name: user.name, email: user.email, password: user.password })
    setEditingId(user._id || null)
  }

  const handleDelete = async (_id: string) => {
    console.log(_id)

    window.api.deleteUser(_id)
    fetchUsers()
  }

  return (
    <div>
      <h1>CRUD de Usuários</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="name"
          value={form.name}
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
          name="password"
          placeholder="password"
          value={form.password}
          onChange={handleChange}
        />
        <button type="submit">{editingId ? 'Atualizar' : 'Adicionar'}</button>
      </form>
      <ul>
        {users.map((user, index) => (
          <li key={index}>
            {user.name} - {user.email}
            <button onClick={() => handleEdit(user)}>Editar</button>
            <button onClick={() => handleDelete(user._id!)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
