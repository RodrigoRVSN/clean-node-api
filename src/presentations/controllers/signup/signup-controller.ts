import { badRequest, ok, serverError } from '../../helpers/http/http-helpers'
import { type HttpRequest, type HttpResponse, type Controller, type AddAccount, type Validation, type Authentication } from './signup-controller-protocols'

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

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) return badRequest(error)

      const { name, email, password } = httpRequest.body

      const account = await this.addAccount.add({ name, email, password })

      await this.authentication.auth({ email, password })

      return ok(account)
    } catch (error) {
      return serverError(error as Error)
    }
  }
}
