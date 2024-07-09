/* eslint-disable @typescript-eslint/no-explicit-any */
import { ipcMain } from 'electron'

ipcMain.on('createUser', function createUserInData(events, params: any) {
  console.log(params)
})

ipcMain.handle('listUser', async function listAllUsers(): Promise<string> {
  console.log('list all users')
  return 'foi'
})

ipcMain.on('updateUser', function UpdateUser(events, id: string) {
  console.log(id)
})
