import { type AccountModel } from '@/domain/models/account'
import { type AddAccountParams } from '@/domain/usecases/account/add-account'

export type AddAccountRepository = {
  add: (accountData: AddAccountParams) => Promise<AccountModel>
}
