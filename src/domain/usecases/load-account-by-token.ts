import { type AccountModel } from '../models/account'

export type LoadAccountByToken = {
  load: (accessToken: string, role?: string) => Promise<AccountModel | null>
}
