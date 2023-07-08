import { mockFakeAuthentication } from '@/domain/_test'
import { DbAuthentication } from './db-authentication'
import { type HashComparer, type LoadAccountByEmailRepository, type Encrypter, type UpdateAccessTokenRepository } from './db-authentication-protocols'
import { makeEncrypter, makeHashComparer, mockLoadAccountByEmailRepository, mockUpdateAccessTokenRepository } from '@/data/_test'

type SutTypes = {
  sut: DbAuthentication
  loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository
  hashComparerStub: HashComparer
  EncrypterStub: Encrypter
  updateAccessTokenRepositoryStub: UpdateAccessTokenRepository
}

const makeSut = (): SutTypes => {
  const loadAccountByEmailRepositoryStub = mockLoadAccountByEmailRepository()
  const hashComparerStub = makeHashComparer()
  const EncrypterStub = makeEncrypter()
  const updateAccessTokenRepositoryStub = mockUpdateAccessTokenRepository()
  const sut = new DbAuthentication(loadAccountByEmailRepositoryStub, hashComparerStub, EncrypterStub, updateAccessTokenRepositoryStub)

  return { sut, loadAccountByEmailRepositoryStub, hashComparerStub, EncrypterStub, updateAccessTokenRepositoryStub }
}

describe('DbAuthentication', () => {
  it('should call the function to loadByEmail the account by email repository with correct email', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()

    const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail')
    await sut.auth(mockFakeAuthentication())

    expect(loadSpy).toHaveBeenLastCalledWith('any_email@mail.com')
  })

  it('should throw if LoadAccountByEmailRepository throws', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()

    jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail').mockRejectedValueOnce(new Error())
    const promise = sut.auth(mockFakeAuthentication())

    await expect(promise).rejects.toThrow()
  })

  it('should return null if LoadAccountByEmailRepository returns null', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()

    jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail').mockResolvedValueOnce(null)
    const accessToken = await sut.auth(mockFakeAuthentication())
    expect(accessToken).toBeNull()
  })

  it('should call HashComparer with correct values', async () => {
    const { sut, hashComparerStub } = makeSut()

    const compareSpy = jest.spyOn(hashComparerStub, 'compare')
    await sut.auth(mockFakeAuthentication())
    expect(compareSpy).toHaveBeenCalledWith('any_password', 'any_password')
  })

  it('should throw if HashComparer throws', async () => {
    const { sut, hashComparerStub } = makeSut()

    jest.spyOn(hashComparerStub, 'compare').mockRejectedValueOnce(new Error())
    const promise = sut.auth(mockFakeAuthentication())

    await expect(promise).rejects.toThrow()
  })

  it('should return null if HashComparer returns false', async () => {
    const { sut, hashComparerStub } = makeSut()

    jest.spyOn(hashComparerStub, 'compare').mockResolvedValueOnce(false)
    const accessToken = await sut.auth(mockFakeAuthentication())
    expect(accessToken).toBeNull()
  })

  it('should call Encrypter with correct id', async () => {
    const { sut, EncrypterStub } = makeSut()

    const generateSpy = jest.spyOn(EncrypterStub, 'encrypt')
    await sut.auth(mockFakeAuthentication())
    expect(generateSpy).toHaveBeenCalledWith('any_id')
  })

  it('should throw if Encrypter throws', async () => {
    const { sut, EncrypterStub } = makeSut()

    jest.spyOn(EncrypterStub, 'encrypt').mockRejectedValueOnce(new Error())
    const promise = sut.auth(mockFakeAuthentication())

    await expect(promise).rejects.toThrow()
  })

  it('should return access token with Token Generator success', async () => {
    const { sut } = makeSut()

    const accessToken = await sut.auth(mockFakeAuthentication())
    expect(accessToken).toBe('any_token')
  })

  it('should call UpdateAccessTokenRepository with correct values', async () => {
    const { sut, updateAccessTokenRepositoryStub } = makeSut()

    const updateSpy = jest.spyOn(updateAccessTokenRepositoryStub, 'updateAccessToken')
    await sut.auth(mockFakeAuthentication())
    expect(updateSpy).toHaveBeenCalledWith('any_id', 'any_token')
  })

  it('should throw if UpdateAccessTokenRepository throws', async () => {
    const { sut, updateAccessTokenRepositoryStub } = makeSut()

    jest.spyOn(updateAccessTokenRepositoryStub, 'updateAccessToken').mockRejectedValueOnce(new Error())
    const promise = sut.auth(mockFakeAuthentication())

    await expect(promise).rejects.toThrow()
  })
})
