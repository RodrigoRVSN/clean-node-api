import { type HttpResponse } from './http'

export type Controller<T = any> = {
  handle: (request: T) => Promise<HttpResponse>
}
