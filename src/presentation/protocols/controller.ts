import { type HttpRequest, type HttpResponse } from './http'

export type Controller = {
  handle: (httpRequest: HttpRequest) => Promise<HttpResponse>
}
