import { type LoadSurveysRepository, type SurveyModel } from './db-load-surveys.protocols'
import { DbLoadSurveys } from './db-load-surveys'
import MockDate from 'mockdate'
import { throwError } from '@/domain/_test/test-helper'

const makeFakeSurveys = (): SurveyModel[] => ([{
  id: 'other_id',
  question: 'any_question',
  answers: [{ image: 'any_image', answer: 'any_answer' }],
  date: new Date()
}, {
  id: 'other_id',
  question: 'other_question',
  answers: [{ image: 'other_image', answer: 'other_answer' }],
  date: new Date()
}])

const makeLoadSurveyRepository = (): LoadSurveysRepository => {
  class LoadSurveysRepositoryStub implements LoadSurveysRepository {
    async loadAll (): Promise<SurveyModel[]> {
      return await new Promise(resolve => { resolve(makeFakeSurveys()) })
    }
  }

  return new LoadSurveysRepositoryStub()
}

type SutTypes = {
  sut: DbLoadSurveys
  loadSurveyRepositoryStub: LoadSurveysRepository
}

const makeSut = (): SutTypes => {
  const loadSurveyRepositoryStub = makeLoadSurveyRepository()
  const sut = new DbLoadSurveys(loadSurveyRepositoryStub)

  return { sut, loadSurveyRepositoryStub }
}

describe('DbLoadSurveys', () => {
  beforeAll(() => { MockDate.set(new Date()) })

  afterAll(() => { MockDate.reset() })

  it('should call LoadSurveyRepository', async () => {
    const { sut, loadSurveyRepositoryStub } = makeSut()

    const loadAllSpy = jest.spyOn(loadSurveyRepositoryStub, 'loadAll')
    await sut.load()
    expect(loadAllSpy).toHaveBeenCalled()
  })

  it('should return a list of surveys on success', async () => {
    const { sut } = makeSut()

    const surveys = await sut.load()
    expect(surveys).toEqual(makeFakeSurveys())
  })

  it('should throws if LoadSurveyRepository throws', async () => {
    const { sut, loadSurveyRepositoryStub } = makeSut()

    jest.spyOn(loadSurveyRepositoryStub, 'loadAll').mockImplementationOnce(throwError)
    const promise = sut.load()
    await expect(promise).rejects.toThrow()
  })
})
