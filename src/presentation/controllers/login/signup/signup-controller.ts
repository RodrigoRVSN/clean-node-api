import { EmailInUseError } from '../../../errors'
import { badRequest, forbidden, ok, serverError, unauthorized } from '../../../helpers/http/http-helpers'
import { type HttpResponse, type Controller, type AddAccount, type Validation, type Authentication } from './signup-controller-protocols'

export class SignUpController implements Controller {
  constructor (
    private readonly addAccount: AddAccount,
    private readonly validation: Validation,
    private readonly authentication: Authentication
  ) {
    this.addAccount = addAccount
    this.validation = validation
    this.authentication = authentication
  }

  async handle (request: SignUpController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) return badRequest(error)

      const { name, email, password } = request

      const account = await this.addAccount.add({ name, email, password })

      if (!account) return forbidden(new EmailInUseError())

      const accessToken = await this.authentication.auth({ email, password })
      if (!accessToken) return unauthorized()

      return ok({ accessToken })
    } catch (error) {
      return serverError(error as Error)
    }
  }
}

export namespace SignUpController {
  export type Request = {
    name: string
    email: string
    password: string
    passwordConfirmation: string
  }
}
