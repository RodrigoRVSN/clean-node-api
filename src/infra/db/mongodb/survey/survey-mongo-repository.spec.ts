import { type Collection } from 'mongodb'
import { MongoHelper } from '../helpers/mongo-helper'
import { SurveyMongoRepository } from './survey-mongo-repository'

let surveyCollection: Collection

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
  })

  const makeSut = (): SurveyMongoRepository => {
    return new SurveyMongoRepository()
  }

  describe('add()', () => {
    it('should add a survey on success', async () => {
      const sut = makeSut()

      await sut.add({
        question: 'any_question',
        answers: [{ image: 'any_image', answer: 'any_answer' }, { answer: 'other_answer' }],
        date: new Date()
      })

      const survey = await surveyCollection.findOne({ question: 'any_question' })
      expect(survey).toBeTruthy()
    })
  })

  describe('loadAll()', () => {
    it('should load all surveys on success', async () => {
      await surveyCollection.insertMany([{
        question: 'any_question',
        answers: [{ image: 'any_image', answer: 'any_answer' }, { answer: 'other_answer' }],
        date: new Date()
      }, {
        question: 'other_question',
        answers: [{ image: 'other_image', answer: 'other_answer' }, { answer: 'other_answer' }],
        date: new Date()
      }])

      const sut = makeSut()

      const surveys = await sut.loadAll()

      expect(surveys).toHaveLength(2)
      expect(surveys[0].question).toBe('any_question')
      expect(surveys[1].question).toBe('other_question')
    })

    it('should return a empty list if there are no surveys', async () => {
      const sut = makeSut()

      const surveys = await sut.loadAll()

      expect(surveys).toHaveLength(0)
    })
  })

  describe('loadById()', () => {
    it('should load a survey on success', async () => {
      const { insertedId } = await surveyCollection.insertOne({
        question: 'any_question',
        answers: [{ image: 'any_image', answer: 'any_answer' }],
        date: new Date()
      })

      const sut = makeSut()
      const survey = await sut.loadById(String(insertedId))

      expect(survey).toBeTruthy()
    })
  })
})
