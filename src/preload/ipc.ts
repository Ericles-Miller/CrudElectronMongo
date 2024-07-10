/* eslint-disable @typescript-eslint/no-explicit-any */
import { ipcMain } from 'electron'
import { IUsers } from './IUsers'
import { User } from './User'

export const connection = new User('mongodb://localhost:27017', 'teste')

ipcMain.on('createUser', function createUserInData(_, { email, name, password }: IUsers) {
  connection.addUser({ email, name, password })
})

ipcMain.handle('listUser', async function listAllUsers(): Promise<IUsers[]> {
  const users = await connection.getUsers()
  return users
})

ipcMain.on('updateUser', function UpdateUser(_, { email, name, password, _id }: IUsers) {
  console.log(_id, email, name, password, '-- ipc')

  connection.updateUser(_id!, { email, name, password })
})

ipcMain.on('deleteUser', function deleteUser(_, _id: string) {
  connection.deleteUser(_id)
})
