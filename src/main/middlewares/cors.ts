import { type NextFunction, type Request, type Response } from 'express'

export const cors = (_: Request, res: Response, next: NextFunction): void => {
  res.setHeader('access-control-allow-origin', '*')
  res.setHeader('access-control-allow-headers', '*')
  res.setHeader('access-control-allow-methods', '*')

  next()
}
