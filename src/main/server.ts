import { MongoHelper } from '../infra/db/mongodb/helpers/mongo-helper'
import { env } from './config/env'

MongoHelper.connect(env.mongoUrl)
  .then(async () => {
    const app = (await import('./config/app')).default

    app.listen(5050, () => { console.log(`🔥 server is running in port ${env.port}`) })
  })
  .catch(console.error)
