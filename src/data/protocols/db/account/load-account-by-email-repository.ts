import { type AccountModel } from '../../../usecases/account/add-account/db-add-account-protocols'

export type LoadAccountByEmailRepository = {
  loadByEmail: (email: string) => Promise<AccountModel | null>
}
