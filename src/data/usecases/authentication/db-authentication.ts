import { type AuthenticationModel, type Authentication } from '../../../domain/usecases/authentication'
import { type HashComparer } from '../../protocols/criptography/hash-comparer'
import { type LoadAccountByEmailRepository } from '../../protocols/load-account-by-email-repository'

export class DbAuthentication implements Authentication {
  private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
  private readonly hashComparerStub: HashComparer

  constructor (loadAccountByEmailRepository: LoadAccountByEmailRepository, hashComparerStub: HashComparer) {
    this.loadAccountByEmailRepository = loadAccountByEmailRepository
    this.hashComparerStub = hashComparerStub
  }

  async auth (authentication: AuthenticationModel): Promise<string | null> {
    const account = await this.loadAccountByEmailRepository.load(authentication.email)
    if (account) {
      await this.hashComparerStub.compare(authentication.password, account?.password)
    }
    return null
  }
}
