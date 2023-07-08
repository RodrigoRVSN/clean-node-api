import { type NextFunction, type Request, type Response } from 'express'

export const noCache = (_: Request, res: Response, next: NextFunction): void => {
  res.setHeader('cache-control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
  res.setHeader('pragma', 'no-cache')
  res.setHeader('expires', '0')
  res.setHeader('surrogate-control', 'no-store')

  next()
}
