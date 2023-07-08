import { type LoadSurveysRepository } from './db-load-surveys.protocols'
import { DbLoadSurveys } from './db-load-surveys'
import MockDate from 'mockdate'
import { throwError } from '@/domain/_test/test-helper'
import { mockLoadSurveyRepository } from '@/data/_test'
import { mockSurveyModels } from '@/domain/_test'

type SutTypes = {
  sut: DbLoadSurveys
  loadSurveyRepositoryStub: LoadSurveysRepository
}

const makeSut = (): SutTypes => {
  const loadSurveyRepositoryStub = mockLoadSurveyRepository()
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
    expect(surveys).toEqual(mockSurveyModels())
  })

  it('should throws if LoadSurveyRepository throws', async () => {
    const { sut, loadSurveyRepositoryStub } = makeSut()

    jest.spyOn(loadSurveyRepositoryStub, 'loadAll').mockImplementationOnce(throwError)
    const promise = sut.load()
    await expect(promise).rejects.toThrow()
  })
})
