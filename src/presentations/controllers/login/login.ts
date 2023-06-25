import { type Authentication, type HttpRequest, type HttpResponse, type Controller, type EmailValidator } from './login-protocols'
import { InvalidParamError, MissingParamError } from '../../errors'
import { badRequest, ok, serverError } from '../../helpers/http-helpers'

export class LoginController implements Controller {
  private readonly emailValidator: EmailValidator
  private readonly authentication: Authentication

  constructor (emailValidator: EmailValidator, authentication: Authentication) {
    this.emailValidator = emailValidator
    this.authentication = authentication
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { email, password } = httpRequest.body

      if (!email) {
        return await new Promise((resolve) => { resolve(badRequest(new MissingParamError('email'))) })
      }

      if (!password) {
        return await new Promise((resolve) => { resolve(badRequest(new MissingParamError('password'))) })
      }

      const isValid = this.emailValidator.isValid(email)

      if (!isValid) {
        return await new Promise((resolve) => { resolve(badRequest(new InvalidParamError('email'))) })
      }

      await this.authentication.auth(email, password)
      return ok('')
    } catch (error) {
      return serverError(error as Error)
    }
  }
}
