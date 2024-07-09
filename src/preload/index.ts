/* eslint-disable @typescript-eslint/no-explicit-any */
import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { Employees } from './employees'

export const api = {
  createUser(params: any): void {
    console.log(params, 'entrou no create user - index - preload')
    return ipcRenderer.send('createUser', params)
  },

  listUser(): Promise<string> {
    return ipcRenderer.invoke('listUser')
  },

  updateUser(id: string): void {
    return ipcRenderer.send('updateUser', id)
  }
}

const employees = new Employees('mongodb://localhost:27017', 'teste')
const data = employees.getEmployees()
console.log(data)

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
