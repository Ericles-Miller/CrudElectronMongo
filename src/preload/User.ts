import { MongoClient, ObjectId } from 'mongodb'

interface IUser {
  name: string
  email: string
  password: string
  _id?: string
}

export class User {
  private uri: string
  private dbName: string
  private client: MongoClient

  constructor(uri: string, dbName: string) {
    this.uri = uri
    this.dbName = dbName
    this.client = new MongoClient(this.uri)
  }

  private async getCollection(): Promise<Mongo.Collection<IUser>> {
    try {
      await this.client.connect()

      const db = this.client.db(this.dbName)
      const users = db.collection<IUser>('users')

      return users
    } catch (error) {
      console.error('Erro ao conectar ao banco de dados:', error)
      throw error
    }
  }

  async getUsers(): Promise<IUser[]> {
    const users = await this.getCollection()
    const response = await users.find({}).toArray()

    return response.map((user: IUser) => ({
      _id: user._id?.toString(),
      name: user.name,
      email: user.email,
      password: user.password
    }))
  }

  async addUser(user: IUser): Promise<void> {
    console.log(`Employee.js > addEmployee: ${JSON.stringify(user)}`)

    const users = await this.getCollection()
    await users.insertOne(user)
  }

  async updateUser(id: string, user: IUser): Promise<boolean> {
    console.log(`user.js > updateuser: ${JSON.stringify(user)} --${id}`)

    const users = await this.getCollection()
    const result = await users.updateOne(
      {
        _id: new ObjectId(id)
      },
      {
        $set: user
      }
    )
    return result.modifiedCount > 0
  }

  async deleteUser(id: string): Promise<boolean> {
    console.log(`Employee.js > deleteEmployee: ${id}`)

    const employees = await this.getCollection()
    const result = await employees.deleteOne({ _id: new ObjectId(id) })
    return result.deletedCount > 0
  }
}
