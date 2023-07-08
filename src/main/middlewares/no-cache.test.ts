import request from 'supertest'
import app from '../config/app'
import { noCache } from './no-cache'

describe('No Cors Middleware', () => {
  it('should not cache a route', async () => {
    app.post('/test_no-cache', noCache, (_, res) => {
      res.send()
    })

    await request(app)
      .post('/test_no-cache')
      .expect('cache-control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
      .expect('pragma', 'no-cache')
      .expect('expires', '0')
      .expect('surrogate-control', 'no-store')
  })
})
