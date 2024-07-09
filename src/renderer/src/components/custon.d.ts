/* eslint-disable @typescript-eslint/no-explicit-any */

interface IUsers {
  nome: string
  senha: string
  email: string
  id?: string
}

interface Window {
  api: {
    createUser(users: IUser): void
    listUser(): Promise<IUsers[]>
    updateUser(users: IUsers): void
    deleteUser(id: string): void
  }
}
