import { type Collection, MongoClient, type InsertOneResult } from 'mongodb'
import { type AccountModel } from '../../../../domain/models/account'
import { type AddAccountModel } from '../../../../domain/usecases/add-account'

export const MongoHelper = {
  client: null as unknown as MongoClient,

  async connect (uri: string): Promise<void> {
    this.client = await MongoClient.connect(uri)
  },

  async disconnect (): Promise<void> {
    await this.client.close()
  },

  getCollection (name: string): Collection {
    return this.client.db().collection(name)
  },

  map (accountData: AddAccountModel, result: InsertOneResult<Document>): AccountModel {
    return { ...accountData, id: result.insertedId.toHexString() }
  }
}
