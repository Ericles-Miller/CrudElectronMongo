/* eslint-disable @typescript-eslint/no-explicit-any */
import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { Employees } from './employees'

export const api = {
  createUser(params: any): void {
    console.log(params, 'entrou no create user - index - preload')
    return ipcRenderer.send('createUser', params)
  },

  listUser(): void {
    return ipcRenderer.send('listUser')
  }
}

const employees = new Employees('mongodb://localhost:27017', 'teste')
const data = employees.getEmployees()

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
