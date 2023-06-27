import { type AuthenticationModel, type Authentication } from '../../../domain/usecases/authentication'
import { type HashComparer } from '../../protocols/criptography/hash-comparer'
import { type TokenGenerator } from '../../protocols/criptography/token-generator'
import { type UpdateAccessTokenRepository } from '../../protocols/db/update-access-token-repository'
import { type LoadAccountByEmailRepository } from '../../protocols/load-account-by-email-repository'

export class DbAuthentication implements Authentication {
  private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
  private readonly hashComparerStub: HashComparer
  private readonly tokenGenerator: TokenGenerator
  private readonly updateAccessTokenRepository: UpdateAccessTokenRepository

  constructor (loadAccountByEmailRepository: LoadAccountByEmailRepository, hashComparerStub: HashComparer, tokenGenerator: TokenGenerator, updateAccessTokenRepository: UpdateAccessTokenRepository) {
    this.loadAccountByEmailRepository = loadAccountByEmailRepository
    this.hashComparerStub = hashComparerStub
    this.tokenGenerator = tokenGenerator
    this.updateAccessTokenRepository = updateAccessTokenRepository
  }

  async auth (authentication: AuthenticationModel): Promise<string | null> {
    const account = await this.loadAccountByEmailRepository.load(authentication.email)
    if (!account) return null

    const isValid = await this.hashComparerStub.compare(authentication.password, account.password)
    if (!isValid) return null

    const accessToken = await this.tokenGenerator.generate(account.id)
    await this.updateAccessTokenRepository.update(account.id, accessToken)
    return accessToken
  }
}
