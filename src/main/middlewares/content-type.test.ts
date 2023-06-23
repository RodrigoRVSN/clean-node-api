import request from 'supertest'
import app from '../config/app'

describe('Content Type Middleware', () => {
  it('should return default content type as json', async () => {
    app.post('/test_content_type', (_, res) => {
      res.send('')
    })

    await request(app)
      .post('/test_content_type')
      .expect('content-type', /json/)
  })

  it('should return the content type when is forced', async () => {
    app.post('/test_content_type_xml', (_, res) => {
      res.type('xml')
      res.send('')
    })

    await request(app)
      .post('/test_content_type_xml')
      .expect('content-type', /xml/)
  })
})
