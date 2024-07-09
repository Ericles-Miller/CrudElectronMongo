/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useState, useEffect } from 'react'

export function CrudUser() {
  const [users, setUsers] = useState([])
  const [form, setForm] = useState({ nome: '', email: '', senha: '' })
  const [editingId, setEditingId] = useState(null)

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    const response = await window.api.listUser()
    console.log(response)
    // setUsers(response)
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (editingId) {
      console.log('if')
      window.api.createUser(form)
      //await axios.put(`http://localhost:5000/users/${editingId}`, form)
      setEditingId(null)
    } else {
      console.log('else')
      window.api.createUser(form)
    }
    setForm({ nome: '', email: '', senha: '' })
    fetchUsers()
  }

  const handleEdit = (user) => {
    setForm({ nome: user.nome, email: user.email, senha: user.senha })
    setEditingId(user._id)
  }

  const handleDelete = async (id) => {
    // await axios.delete(`http://localhost:5000/users/${id}`)
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
          <li key={user._id}>
            {user.nome} - {user.email}
            <button onClick={() => handleEdit(user)}>Editar</button>
            <button onClick={() => handleDelete(user._id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
