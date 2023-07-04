import { type AccountModel } from '@/data/usecases/account/add-account/db-add-account-protocols'

export type LoadAccountByEmailRepository = {
  loadByEmail: (email: string) => Promise<AccountModel | null>
}
