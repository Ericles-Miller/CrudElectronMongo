// import { MongoClient, ObjectId } from 'mongodb'

// interface IUser {
//   name: string
//   position: string
//   salary: number
// }

// export class User {
//   private uri: string
//   private dbName: string
//   private client: MongoClient

//   constructor(uri: string, dbName: string) {
//     this.uri = uri
//     this.dbName = dbName
//     this.client = new MongoClient(this.uri)
//   }

//   private async getCollection(): Promise<Mongo.Collection<IUser>> {
//     try {
//       await this.client.connect()

//       const db = this.client.db(this.dbName)
//       const employees = db.collection<IUser>('employees')
//       console.log('funfou')
//       return employees
//     } catch (error) {
//       console.error('Erro ao conectar ao banco de dados:', error)
//       throw error
//     }
//   }

//   async getEmployees(): Promise<IUser[]> {
//     console.log(`Employees.js > getEmployees`)

//     const employees = await this.getCollection()
//     const res = await employees.find({}).toArray()

//     return res.map((employee: IUser) => ({
//       id: employee._id.toHexString(),
//       name: employee.name,
//       position: employee.position,
//       salary: employee.salary
//     }))
//   }

//   async addEmployee(employee: IUser): Promise<void> {
//     console.log(`Employee.js > addEmployee: ${JSON.stringify(employee)}`)

//     const employees = await this.getCollection()
//     await employees.insertOne(employee)
//   }

//   async updateEmployee(id: string, employee: IUser): Promise<boolean> {
//     console.log(`Employee.js > updateEmployee: ${JSON.stringify(employee)}`)

//     const employees = await this.getCollection()
//     const result = await employees.updateOne(
//       {
//         _id: new ObjectId(id)
//       },
//       {
//         $set: employee
//       }
//     )
//     return result.modifiedCount > 0
//   }

//   async deleteEmployee(id: string): Promise<boolean> {
//     console.log(`Employee.js > deleteEmployee: ${id}`)

//     const employees = await this.getCollection()
//     const result = await employees.deleteOne({ _id: new ObjectId(id) })
//     return result.deletedCount > 0
//   }
// }
