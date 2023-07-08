import { mockAccountModel } from '@/domain/_test'
import { type AccountModel, type AddAccount, type AddAccountParams } from '../controllers/login/signup/signup-controller-protocols'
import { type Authentication, type AuthenticationParams } from '../controllers/login/login/login-controller-protocols'

export const mockAddAccount = (): AddAccount => {
  class AddAccountStub implements AddAccount {
    async add (account: AddAccountParams): Promise<AccountModel> {
      const fakeAccount = mockAccountModel()

      return await new Promise(resolve => { resolve(fakeAccount) })
    }
  }

  return new AddAccountStub()
}

export const mockAuthentication = (): Authentication => {
  class AuthenticationStub implements Authentication {
    async auth (authentication: AuthenticationParams): Promise<string> {
      return 'any_token'
    }
  }
  return new AuthenticationStub()
}
