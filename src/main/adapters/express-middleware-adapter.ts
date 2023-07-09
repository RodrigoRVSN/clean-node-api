import { type NextFunction, type Request, type Response } from 'express'
import { type Controller } from '@/presentation/protocols'

export const adaptMiddleware = (controller: Controller) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const request = {
      accessToken: req.headers?.['x-access-token'],
      ...(req.headers || {})
    }
    const httpResponse = await controller.handle(request)

    if (httpResponse.statusCode === 200) {
      Object.assign(req, httpResponse.body)
      next()
      return
    }

    return res.status(httpResponse.statusCode).json({
      error: httpResponse.body.message
    })
  }
}
