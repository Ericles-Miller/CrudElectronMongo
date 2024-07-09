/* eslint-disable @typescript-eslint/no-explicit-any */
import { ipcMain } from 'electron'
import { IUsers } from './IUsers'
import { v4 as uuid } from 'uuid'

const users: IUsers[] = []

ipcMain.on('createUser', function createUserInData(_, { email, nome, senha }: IUsers) {
  users.push({ email, id: uuid(), nome, senha })
})

ipcMain.handle('listUser', async function listAllUsers(): Promise<IUsers[]> {
  return users
})

ipcMain.on('updateUser', function UpdateUser(_, { email, nome, senha, id }: IUsers) {
  users.find((user) => {
    if (user.id === id) {
      user.email = email
      user.nome = nome
      user.senha = senha
    }
  })
})

ipcMain.on('deleteUser', function deleteUser(_, id: string) {
  console.log(id, '--')

  const indexToRemove = users.findIndex((user) => user.id === id)
  if (indexToRemove !== -1) {
    users.splice(indexToRemove, 1)
  }
})
