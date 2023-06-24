import { type Collection, MongoClient, type InsertOneResult } from 'mongodb'

export const MongoHelper = {
  client: null as unknown as MongoClient,
  uri: '' as string,

  async connect (uri: string): Promise<void> {
    this.uri = uri
    this.client = await MongoClient.connect(uri)
  },

  async disconnect (): Promise<void> {
    await this.client.close()
    this.client = null as unknown as MongoClient
  },

  async getCollection (name: string): Promise<Collection> {
    if (!this.client) {
      await this.connect(this.uri)
    }
    return this.client.db().collection(name)
  },

  map<T,>(accountData: T, result: InsertOneResult<Document>): T & { id: string } {
    return { ...accountData, id: result.insertedId.toHexString() }
  }
}
