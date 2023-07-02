import { type LoadAccountByToken } from '../../../domain/usecases/load-account-by-token'
import { type AccountModel } from '../add-account/db-add-account-protocols'
import { type Decrypter } from '../../protocols/criptography/decrypter'

export class DbLoadAccountByToken implements LoadAccountByToken {
  constructor (private readonly decrypter: Decrypter) {}

  async load (accessToken: string, role?: string | undefined): Promise<AccountModel | null> {
    const account = await this.decrypter.decrypt(accessToken)
    if (!account) return null
    return null
  }
}
