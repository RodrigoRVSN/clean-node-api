import MockDate from 'mockdate'
import { type LoadSurveyByIdRepository } from './db-load-survey-by-id-protocols'
import { DbLoadSurveyById } from './db-load-survey-by-id'
import { throwError } from '@/domain/_test/test-helper'
import { mockLoadSurveyByIdRepository } from '@/data/_test'
import { mockSurveyModel } from '@/domain/_test'

type SutTypes = {
  sut: DbLoadSurveyById
  loadSurveyByIdRepositoryStub: LoadSurveyByIdRepository
}

const makeSut = (): SutTypes => {
  const loadSurveyByIdRepositoryStub = mockLoadSurveyByIdRepository()
  const sut = new DbLoadSurveyById(loadSurveyByIdRepositoryStub)

  return { sut, loadSurveyByIdRepositoryStub }
}

describe('DbLoadSurveyById', () => {
  beforeAll(() => { MockDate.set(new Date()) })

  afterAll(() => { MockDate.reset() })

  it('should call LoadSurveyByIdRepository', async () => {
    const { sut, loadSurveyByIdRepositoryStub } = makeSut()

    const loadById = jest.spyOn(loadSurveyByIdRepositoryStub, 'loadById')
    await sut.loadById('any_id')
    expect(loadById).toHaveBeenCalledWith('any_id')
  })

  it('should returns a survey if LoadSurveyByIdRepository succeeds', async () => {
    const { sut } = makeSut()

    const survey = await sut.loadById('any_id')
    expect(survey).toEqual(mockSurveyModel())
  })

  it('should throw a error if LoadSurveyByIdRepository throws', async () => {
    const { sut, loadSurveyByIdRepositoryStub } = makeSut()

    jest.spyOn(loadSurveyByIdRepositoryStub, 'loadById').mockImplementationOnce(throwError)
    const promise = sut.loadById('any_id')
    await expect(promise).rejects.toThrow()
  })
})
