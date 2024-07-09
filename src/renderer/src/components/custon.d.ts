/* eslint-disable @typescript-eslint/no-explicit-any */

interface IUsers {
  name: string
  password: string
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
