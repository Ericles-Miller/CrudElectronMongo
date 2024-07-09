import { ipcMain } from 'electron'

ipcMain.on('createUser', (params: any) => {
  console.log('aaaaa')
  console.log(params)
})

ipcMain.on('listUser', () => {
  console.log('list all users')
  return 'foi'
})
