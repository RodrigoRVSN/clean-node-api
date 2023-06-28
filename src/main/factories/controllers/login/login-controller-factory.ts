import { LoginController } from '../../../../presentations/controllers/login/login-controller'
import { type Controller } from '../../../../presentations/protocols'
import { makeDbAuthentication } from '../../usecases/authentication/db-authentication-factory'
import { makeLogControllerDecorator } from '../../usecases/decorators/log-controller-decorator-factory'
import { makeLoginValidation } from './login-validation-factory'

export const makeLoginController = (): Controller => {
  const loginController = new LoginController(makeLoginValidation(), makeDbAuthentication())

  return makeLogControllerDecorator(loginController)
}