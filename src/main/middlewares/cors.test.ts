import request from 'supertest'
import app from '../config/app'

describe('CORS Middleware', () => {
  it('should parse body as json', async () => {
    app.post('/test_cors', (_, res) => {
      res.send()
    })

    await request(app)
      .post('/test_cors')
      .expect('access-control-allow-origin', '*')
      .expect('access-control-allow-headers', '*')
      .expect('access-control-allow-methods', '*')
  })
})
