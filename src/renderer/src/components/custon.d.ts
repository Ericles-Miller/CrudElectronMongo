/* eslint-disable @typescript-eslint/no-explicit-any */

interface Window {
  api: {
    createUser(form: any): void
    listUser(): Promise<string>
    updateUser(id: string): void
  }
}
