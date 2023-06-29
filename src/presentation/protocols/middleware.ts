import { type HttpRequest, type HttpResponse } from './http'

export type Middleware = {
  handle: (httpRequest: HttpRequest) => Promise<HttpResponse>
}
