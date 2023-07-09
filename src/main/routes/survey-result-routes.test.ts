import request from 'supertest'
import app from '../config/app'
import { env } from '../config/env'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import { type Collection } from 'mongodb'
import { sign } from 'jsonwebtoken'

let surveyCollection: Collection
let accountCollection: Collection

const makeAccessToken = async (): Promise<string> => {
  const { insertedId: id } = await accountCollection.insertOne({
    name: 'Rodrigo',
    email: 'rodrigo@mail.com',
    password: '123',
    role: 'admin'
  })

  const accessToken = sign({ id }, env.jwtSecret)

  await accountCollection.updateOne({ _id: id }, {
    $set: { accessToken }
  })

  return accessToken
}

describe('Login Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(String(env.mongoUrl))
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.deleteMany({})
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('PUT /surveys/:surveyId/results', () => {
    it('should return 403 on add survey without token', async () => {
      await request(app)
        .put('/api/surveys/any_id/results')
        .send({
          answer: 'any_answer'
        })
        .expect(403)
    })

    it('should return 204 on add survey valid accessToken', async () => {
      const { insertedId } = await surveyCollection.insertOne({
        question: 'any_question',
        answers: [{ image: 'any_image', answer: 'Answer 1' }],
        date: new Date()
      })

      const accessToken = await makeAccessToken()

      await request(app)
        .put(`/api/surveys/${insertedId}/results`)
        .set('x-access-token', accessToken)
        .send({ answer: 'Answer 1' })
        .expect(200)
    })
  })

  describe('GET /surveys/:surveyId/results', () => {
    it('should return 403 on load survey result without accessToken', async () => {
      await request(app)
        .get('/api/surveys/any_id/results')
        .send({
          answer: 'any_answer'
        })
        .expect(403)
    })

    it('should return 200 on add survey valid accessToken', async () => {
      const { insertedId } = await surveyCollection.insertOne({
        question: 'any_question',
        answers: [{ image: 'any_image', answer: 'Answer 1' }],
        date: new Date()
      })

      const accessToken = await makeAccessToken()

      await request(app)
        .put(`/api/surveys/${insertedId}/results`)
        .set('x-access-token', accessToken)
        .send({ answer: 'Answer 1' })
        .expect(200)
    })
  })
})
