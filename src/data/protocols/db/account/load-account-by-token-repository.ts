import { type AccountModel } from '../../../usecases/add-account/db-add-account-protocols'

export type LoadAccountByTokenRepository = {
  loadByToken: (accessToken: string, role?: string) => Promise<AccountModel | null>
}
