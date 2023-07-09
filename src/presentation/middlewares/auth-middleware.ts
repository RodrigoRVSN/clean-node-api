import { AccessDeniedError } from '../errors'
import { forbidden, ok, serverError } from '../helpers/http/http-helpers'
import { type HttpResponse, type Middleware, type LoadAccountByToken } from './auth-middleware-protocols'

export class AuthMiddleware implements Middleware {
  constructor (
    private readonly loadAccountByToken: LoadAccountByToken,
    private readonly role?: string
  ) { }

  async handle ({ accessToken }: AuthMiddleware.Request): Promise<HttpResponse> {
    try {
      if (!accessToken) return forbidden(new AccessDeniedError())

      const account = await this.loadAccountByToken.load(accessToken, this.role)
      if (!account) return forbidden(new AccessDeniedError())

      return ok({ accountId: account.id })
    } catch (error) {
      return serverError(error as Error)
    }
  }
}

export namespace AuthMiddleware {
  export type Request = {
    accessToken?: string
  }
}
