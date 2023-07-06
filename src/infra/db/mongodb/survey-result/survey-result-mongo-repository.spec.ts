
import { type Collection } from 'mongodb'
import { MongoHelper } from '../helpers/mongo-helper'
import { SurveyResultMongoRepository } from './survey-result-mongo-repository'
import { type SurveyModel } from '@/domain/models/survey'
import { type AccountModel } from '@/domain/models/account'

let surveyCollection: Collection
let surveyResultCollection: Collection
let accountCollection: Collection

const makeSut = (): SurveyResultMongoRepository => {
  return new SurveyResultMongoRepository()
}

const makeSurvey = async (): Promise<SurveyModel> => {
  const data = {
    question: 'any_question',
    answers: [{ image: 'any_image', answer: 'any_answer' }, { answer: 'other_answer' }],
    date: new Date()
  }
  const { insertedId } = await surveyCollection.insertOne(data)

  return { ...data, id: String(insertedId) }
}

const makeAccount = async (): Promise<AccountModel> => {
  const data = {
    name: 'any_name',
    email: 'any_email@mail.com',
    password: 'any_password'
  }
  const { insertedId } = await accountCollection.insertOne(data)

  return { ...data, id: String(insertedId) }
}

describe('Account Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(String(process.env.MONGO_URL))
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.deleteMany({})
    surveyResultCollection = await MongoHelper.getCollection('surveyResults')
    await surveyResultCollection.deleteMany({})
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('save()', () => {
    it('should add a survey result if its new', async () => {
      const sut = makeSut()
      const survey = await makeSurvey()
      const account = await makeAccount()

      const surveyResult = await sut.save({
        surveyId: survey.id,
        accountId: account.id,
        answer: survey.answers[0].answer,
        date: new Date()
      })

      expect(surveyResult).toBeTruthy()
      expect(surveyResult.id).toBeTruthy()
      expect(surveyResult.answer).toBe(survey.answers[0].answer)
    })
  })

  it('should update survey result if its not new', async () => {
    const sut = makeSut()
    const survey = await makeSurvey()
    const account = await makeAccount()

    const { insertedId } = await surveyResultCollection.insertOne({
      surveyId: survey.id,
      accountId: account.id,
      answer: survey.answers[0].answer,
      date: new Date()
    })

    const surveyResult = await sut.save({
      surveyId: survey.id,
      accountId: account.id,
      answer: survey.answers[1].answer,
      date: new Date()
    })

    expect(surveyResult).toBeTruthy()
    expect(surveyResult.id).toEqual(String(insertedId))
    expect(surveyResult.answer).toBe(survey.answers[1].answer)
  })
})
