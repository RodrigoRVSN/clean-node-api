import { type Authentication, type HttpResponse, type Controller, type Validation } from './login-controller-protocols'
import { badRequest, ok, serverError, unauthorized } from '../../../helpers/http/http-helpers'

export class LoginController implements Controller {
  private readonly validation: Validation
  private readonly authentication: Authentication

  constructor (validation: Validation, authentication: Authentication) {
    this.validation = validation
    this.authentication = authentication
  }

  async handle (request: LoginController.Request): Promise<HttpResponse> {
    try {
      const { email, password } = request

      const error = this.validation.validate(request)
      if (error) return badRequest(error)

      const accessToken = await this.authentication.auth({ email, password })
      if (!accessToken) return unauthorized()

      return ok({ accessToken })
    } catch (error) {
      return serverError(error as Error)
    }
  }
}

export namespace LoginController {
  export type Request = {
    email: string
    password: string
  }
}
