
import { throwError } from '@/domain/_test/test-helper'
import { DbAddSurvey } from './db-add-survey'
import { type AddSurveyRepository } from './db-add-survey-protocols'
import MockDate from 'mockdate'
import { mockAddSurveyRepository } from '@/data/_test'
import { mockAddSurveyParams } from '@/domain/_test'

type SutTypes = {
  sut: DbAddSurvey
  addSurveyRepositoryStub: AddSurveyRepository
}

const makeSut = (): SutTypes => {
  const addSurveyRepositoryStub = mockAddSurveyRepository()
  const sut = new DbAddSurvey(addSurveyRepositoryStub)

  return { sut, addSurveyRepositoryStub }
}

describe('DbAddSurvey Usecase', () => {
  beforeAll(() => { MockDate.set(new Date()) })

  afterAll(() => { MockDate.reset() })

  it('should call AddSurveyRepository with correct values', async () => {
    const { sut, addSurveyRepositoryStub } = makeSut()

    const addSpy = jest.spyOn(addSurveyRepositoryStub, 'add')

    await sut.add(mockAddSurveyParams())
    expect(addSpy).toHaveBeenCalledWith(mockAddSurveyParams())
  })

  it('should throw if AddSurveyRepository throws', async () => {
    const { sut, addSurveyRepositoryStub } = makeSut()
    jest.spyOn(addSurveyRepositoryStub, 'add').mockImplementationOnce(throwError)
    const promise = sut.add(mockAddSurveyParams())
    await expect(promise).rejects.toThrow()
  })
})
