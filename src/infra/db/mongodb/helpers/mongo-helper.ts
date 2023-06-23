import { type Collection, MongoClient, type InsertOneResult } from 'mongodb'

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

  map<T,>(accountData: T, result: InsertOneResult<Document>): T & { id: string } {
    return { ...accountData, id: result.insertedId.toHexString() }
  }
}
