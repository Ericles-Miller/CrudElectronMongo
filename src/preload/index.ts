/* eslint-disable @typescript-eslint/no-explicit-any */
import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { IUsers } from './IUsers'
import { User } from './User'

export const api = {
  createUser(user: IUsers): void {
    console.log(user, 'entrou no create user - index - preload')
    return ipcRenderer.send('createUser', user)
  },

  listUser(): Promise<IUsers[]> {
    return ipcRenderer.invoke('listUser')
  },

  updateUser(user: IUsers): void {
    console.log('update user -- index - preload')
    return ipcRenderer.send('updateUser', user)
  },

  deleteUser(id: string): void {
    console.log('delete user -- index - preload')
    return ipcRenderer.send('deleteUser', id)
  }
}

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
