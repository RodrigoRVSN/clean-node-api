import request from 'supertest'
import app from '../config/app'
import { env } from '../config/env'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import { type Collection } from 'mongodb'
import { sign } from 'jsonwebtoken'

let surveyCollection: Collection
let accountCollection: Collection

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

  describe('POST /surveys', () => {
    it('should return 403 on add survey without token', async () => {
      await request(app)
        .post('/api/surveys')
        .send({
          question: 'any_question',
          answers: [{ image: 'any_image', answer: 'any_answer' }, { answer: 'other_answer' }]
        })
        .expect(403)
    })

    it('should return 204 on add survey with valid accessToken', async () => {
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

      await request(app)
        .post('/api/surveys')
        .set('x-access-token', accessToken)
        .send({
          question: 'any_question',
          answers: [{ image: 'any_image', answer: 'any_answer' }, { answer: 'other_answer' }]
        })
        .expect(204)
    })

    it.skip('should return 403 on add survey with invalid accessToken', async () => {
      await request(app)
        .post('/api/surveys')
        .set('x-access-token', '123')
        .send({
          question: 'any_question',
          answers: [{ image: 'any_image', answer: 'any_answer' }, { answer: 'other_answer' }]
        })
        .expect(403)
    })
  })
})
