import { type AccountModel } from '../../domain/models/account'
import { type AddAccountModel } from '../../domain/usecases/add-account'

export type AddAccountRepository = {
  add: (accountData: AddAccountModel) => Promise<AccountModel>

}
