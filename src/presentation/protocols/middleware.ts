import { type HttpRequest, type HttpResponse } from './http'

export type Midleware = {
  handle: (httpRequest: HttpRequest) => Promise<HttpResponse>
}
