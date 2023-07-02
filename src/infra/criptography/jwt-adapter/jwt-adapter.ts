import { type Decrypter } from '../../../data/protocols/criptography/decrypter'
import { type Encrypter } from '../../../data/protocols/criptography/encrypter'
import jwt from 'jsonwebtoken'

export class JwtAdapter implements Encrypter, Decrypter {
  private readonly secret: string

  constructor (secret: string) {
    this.secret = secret
  }

  async decrypt (value: string): Promise<string> {
    return String(jwt.verify(value, this.secret))
  }

  async encrypt (value: string): Promise<string> {
    return jwt.sign({ id: value }, this.secret)
  }
}
