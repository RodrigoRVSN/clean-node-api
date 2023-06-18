import { type AccountModel } from '../../domain/models/account'
import { type AddAccount, type AddAccountModel } from '../../domain/usecases/add-account'
import { type Encrypter } from '../protocols/encrypter'

export class DbAddAccount implements AddAccount {
  private readonly encrypter: Encrypter

  constructor (encrypter: Encrypter) {
    this.encrypter = encrypter
  }

  async add (account: AddAccountModel): Promise<AccountModel> {
    await this.encrypter.encrypt(account.password)
    return await new Promise(resolve => {
      resolve({
        name: 'valid_name',
        email: 'valid_email',
        password: 'valid_password',
        id: 'valid_id'
      })
    })
  }
}
