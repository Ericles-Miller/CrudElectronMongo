/* eslint-disable @typescript-eslint/no-explicit-any */

interface Window {
  api: {
    createUser(form: any): void
    listUser(): string
  }
}
