import { type AccountModel } from '../../models/account'

export type AddAccountParams = Omit<AccountModel, 'id'>

export type AddAccount = {
  add: (email: AddAccountParams) => Promise<AccountModel | null>
}
