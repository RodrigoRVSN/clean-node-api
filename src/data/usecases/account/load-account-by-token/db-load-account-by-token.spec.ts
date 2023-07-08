
import { mockAccountModel } from '@/domain/_test'
import { DbLoadAccountByToken } from './db-load-account-by-token'
import { type Decrypter, type LoadAccountByTokenRepository } from './db-load-account-by-token-protocols'
import { makeDecrypter, mockLoadAccountByTokenRepository } from '@/data/_test'

type SutTypes = {
  sut: DbLoadAccountByToken
  decrypterStub: Decrypter
  loadAccountByTokenRepositoryStub: LoadAccountByTokenRepository
}

const makeSut = (): SutTypes => {
  const decrypterStub = makeDecrypter()
  const loadAccountByTokenRepositoryStub = mockLoadAccountByTokenRepository()
  const sut = new DbLoadAccountByToken(decrypterStub, loadAccountByTokenRepositoryStub)
  return { sut, decrypterStub, loadAccountByTokenRepositoryStub }
}

describe('DbLoadAccountByToken', () => {
  it('should call Decrypter with correct values', async () => {
    const { sut, decrypterStub } = makeSut()

    const decryptSpy = jest.spyOn(decrypterStub, 'decrypt')

    await sut.load('any_token')
    expect(decryptSpy).toHaveBeenCalledWith('any_token')
  })

  it('should return null if Decrypter returns null', async () => {
    const { sut, decrypterStub } = makeSut()

    jest.spyOn(decrypterStub, 'decrypt').mockResolvedValueOnce('')

    const account = await sut.load('any_token', 'any_role')
    expect(account).toBeNull()
  })

  it('should throws if Decrypter throws', async () => {
    const { sut, decrypterStub } = makeSut()

    jest.spyOn(decrypterStub, 'decrypt').mockRejectedValueOnce(new Error())

    const promise = sut.load('any_token', 'any_role')
    await expect(promise).rejects.toThrow()
  })

  it('should call LoadAccountByTokenRepository with correct values', async () => {
    const { sut, loadAccountByTokenRepositoryStub } = makeSut()

    const loadByTokenSpy = jest.spyOn(loadAccountByTokenRepositoryStub, 'loadByToken')

    await sut.load('any_token', 'any_role')
    expect(loadByTokenSpy).toHaveBeenCalledWith('any_token', 'any_role')
  })

  it('should return null if LoadAccountByTokenRepository returns null', async () => {
    const { sut, loadAccountByTokenRepositoryStub } = makeSut()

    jest.spyOn(loadAccountByTokenRepositoryStub, 'loadByToken').mockResolvedValueOnce(null)

    const account = await sut.load('any_token', 'any_role')
    expect(account).toBeNull()
  })

  it('should throws if LoadAccountByTokenRepository throws', async () => {
    const { sut, loadAccountByTokenRepositoryStub } = makeSut()

    jest.spyOn(loadAccountByTokenRepositoryStub, 'loadByToken').mockRejectedValueOnce(new Error())

    const promise = sut.load('any_token', 'any_role')
    await expect(promise).rejects.toThrow()
  })

  it('should return an account on success', async () => {
    const { sut } = makeSut()

    const account = await sut.load('any_token', 'any_role')
    expect(account).toEqual(mockAccountModel())
  })
})
