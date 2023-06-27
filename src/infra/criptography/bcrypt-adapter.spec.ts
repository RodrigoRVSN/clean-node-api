import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt-adapter'

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return await new Promise(resolve => { resolve('mocked_hash') })
  },
  async compare (): Promise<boolean> {
    return await new Promise(resolve => { resolve(true) })
  }
}))

const salt = 12
const makeSut = (): BcryptAdapter => {
  return new BcryptAdapter(salt)
}

describe('Bcrypt Adapter', () => {
  it('should call hash with correct value', async () => {
    const sut = makeSut()

    const compareSpy = jest.spyOn(bcrypt, 'hash')
    await sut.encrypt('any_value')

    expect(compareSpy).toHaveBeenCalledWith('any_value', salt)
  })

  it('should return a valid hash on success', async () => {
    const sut = makeSut()

    const hash = await sut.encrypt('any_value')

    expect(hash).toBe('mocked_hash')
  })

  it('should throw if bcrypt throws', async () => {
    const sut = makeSut()

    jest.spyOn(bcrypt, 'hash').mockImplementation(() => {
      throw new Error('ERROR!')
    })

    const promise = sut.encrypt('any_value')

    await expect(promise).rejects.toThrow('ERROR!')
  })

  it('should call compare with correct value', async () => {
    const sut = makeSut()

    const compareSpy = jest.spyOn(bcrypt, 'compare')
    await sut.compare('any_value', 'any_hash')

    expect(compareSpy).toHaveBeenCalledWith('any_value', 'any_hash')
  })
})
