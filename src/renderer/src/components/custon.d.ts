/* eslint-disable @typescript-eslint/no-explicit-any */

interface IUsers {
  name: string
  password: string
  email: string
  _id?: string
}

interface Window {
  api: {
    createUser(users: IUser): void
    listUser(): Promise<IUsers[]>
    updateUser(users: IUsers): void
    deleteUser(_id: string): void
  }
}
