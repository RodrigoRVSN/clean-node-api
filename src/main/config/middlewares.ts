import { type Express } from 'express'
import { bodyParser } from '../middlewares/body-parser'
import { cors } from '../middlewares/cors'

export const setupMiddlewares = (app: Express): void => {
  app.use(cors)
  app.use(bodyParser)
}
