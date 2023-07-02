import { type NextFunction, type Request, type Response } from 'express'
import { type Controller, type HttpRequest } from '../../presentation/protocols'

export const adaptMiddleware = (controller: Controller) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const httpRequest: HttpRequest = {
      headers: req.headers
    }
    const httpResponse = await controller.handle(httpRequest)

    if (httpResponse.statusCode === 200) {
      Object.assign(req, httpResponse.body)
      next()
    }

    return res.status(httpResponse.statusCode).json({
      error: httpResponse.body.message
    })
  }
}
