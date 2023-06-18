import { type AccountModel } from '../models/account'

export type AddAccountModel = {
  name: string
  email: string
  password: string
}

export type AddAccount = {
  add: (email: AddAccountModel) => AccountModel
}
