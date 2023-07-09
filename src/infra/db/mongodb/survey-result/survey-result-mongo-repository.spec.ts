import { ObjectId, type Collection } from 'mongodb'
import { SurveyResultMongoRepository } from './survey-result-mongo-repository'
import { type SurveyModel } from '@/domain/models/survey'
import { type AccountModel } from '@/domain/models/account'
import { MongoHelper } from '../helpers'

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

describe('Survey Result Mongo Repository', () => {
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
      expect(surveyResult.surveyId).toEqual(survey.id)
      expect(surveyResult.answers[0].count).toBe(1)
      expect(surveyResult.answers[0].percent).toBe(100)
      expect(surveyResult.answers[1].count).toBe(0)
      expect(surveyResult.answers[1].percent).toBe(0)
    })
  })

  it('should update survey result if its not new', async () => {
    const sut = makeSut()
    const survey = await makeSurvey()
    const account = await makeAccount()

    await surveyResultCollection.insertOne({
      surveyId: new ObjectId(survey.id),
      accountId: new ObjectId(account.id),
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
    expect(surveyResult.surveyId).toEqual(survey.id)
    expect(surveyResult.answers[0].answer).toBe(survey.answers[1].answer)
    expect(surveyResult.answers[0].count).toBe(1)
    expect(surveyResult.answers[0].percent).toBe(100)
  })
})
