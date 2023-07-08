
import MockDate from 'mockdate'
import { DbSaveSurveyResult } from './db-save-survey-result'
import { type SaveSurveyResultParams, type SaveSurveyResultRepository, type SurveyResultModel } from './db-save-survey-result.spec-protocols'
import { throwError } from '@/domain/_test/test-helper'

const makeFakeSurveyResultData = (): SaveSurveyResultParams => ({
  accountId: 'any_account_id',
  surveyId: 'any_survey_id',
  answer: 'any_answer',
  date: new Date()
})

const makeFakeSurveyResult = (): SurveyResultModel => Object.assign({}, makeFakeSurveyResultData(), { id: 'any_id' })

const makeSaveSurveyResultRepository = (): SaveSurveyResultRepository => {
  class SaveSurveyResultRepositoryStub implements SaveSurveyResultRepository {
    async save (data: SaveSurveyResultParams): Promise<SurveyResultModel> {
      return await new Promise(resolve => { resolve(makeFakeSurveyResult()) })
    }
  }

  return new SaveSurveyResultRepositoryStub()
}

type SutTypes = {
  sut: DbSaveSurveyResult
  saveSurveyResultStub: SaveSurveyResultRepository
}

const makeSut = (): SutTypes => {
  const saveSurveyResultStub = makeSaveSurveyResultRepository()
  const sut = new DbSaveSurveyResult(saveSurveyResultStub)

  return { sut, saveSurveyResultStub }
}

describe('DbSaveSurveyResult Usecase', () => {
  beforeAll(() => { MockDate.set(new Date()) })

  afterAll(() => { MockDate.reset() })

  it('should call SaveSurveyResultRepository with correct values', async () => {
    const { sut, saveSurveyResultStub } = makeSut()

    const saveSpy = jest.spyOn(saveSurveyResultStub, 'save')

    await sut.save(makeFakeSurveyResultData())
    expect(saveSpy).toHaveBeenCalledWith(makeFakeSurveyResultData())
  })

  it('should throw if SaveSurveyResultRepository throws', async () => {
    const { sut, saveSurveyResultStub } = makeSut()
    jest.spyOn(saveSurveyResultStub, 'save').mockImplementationOnce(throwError)
    const promise = sut.save(makeFakeSurveyResultData())
    await expect(promise).rejects.toThrow()
  })

  it('should return SurveyResult on success', async () => {
    const { sut } = makeSut()

    const survey = await sut.save(makeFakeSurveyResultData())
    expect(survey).toEqual(makeFakeSurveyResult())
  })
})
