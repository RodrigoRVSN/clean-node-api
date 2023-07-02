import { type LoadAccountByEmailRepository } from '../authentication/db-authentication-protocols'
import { type AccountModel, type AddAccountModel, type AddAccount, type Hasher, type AddAccountRepository } from './db-add-account-protocols'

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccountRepository,
    private readonly loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository
  ) {
    this.hasher = hasher
    this.addAccountRepository = addAccountRepository
    this.loadAccountByEmailRepositoryStub = loadAccountByEmailRepositoryStub
  }

  async add (accountData: AddAccountModel): Promise<AccountModel | null> {
    const account = await this.loadAccountByEmailRepositoryStub.loadByEmail(accountData.email)

    if (account) return null

    const hashedPassword = await this.hasher.encrypt(accountData.password)

    const newAccount = await this.addAccountRepository.add(Object.assign({}, accountData, { password: hashedPassword }))

    return newAccount
  }
}
