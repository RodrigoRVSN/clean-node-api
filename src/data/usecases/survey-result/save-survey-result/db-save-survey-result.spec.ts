
import MockDate from 'mockdate'
import { DbSaveSurveyResult } from './db-save-survey-result'
import { type SaveSurveyResultRepository } from './db-save-survey-result.spec-protocols'
import { throwError } from '@/domain/_test/test-helper'
import { mockSaveSurveyResultParams, mockSurveyResultModel } from '@/domain/_test'
import { mockSaveSurveyResultRepository } from '@/data/_test'

type SutTypes = {
  sut: DbSaveSurveyResult
  saveSurveyResultStub: SaveSurveyResultRepository
}

const makeSut = (): SutTypes => {
  const saveSurveyResultStub = mockSaveSurveyResultRepository()
  const sut = new DbSaveSurveyResult(saveSurveyResultStub)

  return { sut, saveSurveyResultStub }
}

describe('DbSaveSurveyResult Usecase', () => {
  beforeAll(() => { MockDate.set(new Date()) })

  afterAll(() => { MockDate.reset() })

  it('should call SaveSurveyResultRepository with correct values', async () => {
    const { sut, saveSurveyResultStub } = makeSut()

    const saveSpy = jest.spyOn(saveSurveyResultStub, 'save')

    await sut.save(mockSaveSurveyResultParams())
    expect(saveSpy).toHaveBeenCalledWith(mockSaveSurveyResultParams())
  })

  it('should throw if SaveSurveyResultRepository throws', async () => {
    const { sut, saveSurveyResultStub } = makeSut()
    jest.spyOn(saveSurveyResultStub, 'save').mockImplementationOnce(throwError)
    const promise = sut.save(mockSaveSurveyResultParams())
    await expect(promise).rejects.toThrow()
  })

  it('should return SurveyResult on success', async () => {
    const { sut } = makeSut()

    const survey = await sut.save(mockSaveSurveyResultParams())
    expect(survey).toEqual(mockSurveyResultModel())
  })
})
