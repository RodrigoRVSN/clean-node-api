import { type Decrypter } from '../protocols/criptography/decrypter'
import { type Encrypter } from '../protocols/criptography/encrypter'
import { type HashComparer } from '../protocols/criptography/hash-comparer'
import { type Hasher } from '../protocols/criptography/hasher'

export const makeDecrypter = (): Decrypter => {
  class DecrypterStub implements Decrypter {
    async decrypt (value: string): Promise<string> {
      return await Promise.resolve('any_value')
    }
  }

  return new DecrypterStub()
}

export const makeHasher = (): Hasher => {
  class HasherStub implements Hasher {
    async encrypt (value: string): Promise<string> {
      return await new Promise(resolve => { resolve('hashed_password') })
    }
  }

  return new HasherStub()
}

export const makeHashComparer = (): HashComparer => {
  class HashComparerStub implements HashComparer {
    async compare (value: string, hash: string): Promise<boolean> {
      return await new Promise(resolve => { resolve(true) })
    }
  }

  return new HashComparerStub()
}

export const makeEncrypter = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async encrypt (id: string): Promise<string> {
      return await new Promise(resolve => { resolve('any_token') })
    }
  }

  return new EncrypterStub()
}
