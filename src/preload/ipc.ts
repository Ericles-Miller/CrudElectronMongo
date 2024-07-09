/* eslint-disable @typescript-eslint/no-explicit-any */
import { ipcMain } from 'electron'
import { IUsers } from './IUsers'
import { v4 as uuid } from 'uuid'

const users: IUsers[] = []

ipcMain.on('createUser', function createUserInData(_, { email, name, password }: IUsers) {
  users.push({ email, id: uuid(), name, password })
})

ipcMain.handle('listUser', async function listAllUsers(): Promise<IUsers[]> {
  return users
})

ipcMain.on('updateUser', function UpdateUser(_, { email, name, password, id }: IUsers) {
  users.find((user) => {
    if (user.id === id) {
      user.email = email
      user.name = name
      user.password = password
    }
  })
})

ipcMain.on('deleteUser', function deleteUser(_, id: string) {
  const indexToRemove = users.findIndex((user) => user.id === id)
  if (indexToRemove !== -1) {
    users.splice(indexToRemove, 1)
  }
})
