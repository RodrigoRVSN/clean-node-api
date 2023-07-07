import request from 'supertest'
import app from '../config/app'
import { env } from '../config/env'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'

describe('Login Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(String(env.mongoUrl))
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  describe('PUT /surveys/:surveyId/results', () => {
    it('should return 403 on add survey without token', async () => {
      await request(app)
        .put('/api/surveys/any_id/results')
        .send({
          question: 'any_question',
          answer: { image: 'any_image', answer: 'any_answer' }
        })
        .expect(403)
    })
  })
})
