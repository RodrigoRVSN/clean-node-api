import { mockSurveyResultModel } from '@/domain/_test'
import { type SurveyResultModel } from '../save-survey-result/db-save-survey-result.spec-protocols'
import { DbLoadSurveyResult } from './db-load-survey-result'
import { type LoadSurveyResultRepository } from '@/data/protocols/db/survey-result/load-survey-result-repository'

describe('DbLoadSurveyResult UseCase', () => {
  it('should call LoadSurveyResultRepository with correct values', async () => {
    class LoadSurveyResultRepositoryStub implements LoadSurveyResultRepository {
      async loadBySurveyId (surveyId: string): Promise<SurveyResultModel> {
        return await Promise.resolve(mockSurveyResultModel())
      }
    }

    const loadSurveyResultRepositoryStub = new LoadSurveyResultRepositoryStub()
    const sut = new DbLoadSurveyResult(loadSurveyResultRepositoryStub)

    const loadBySurveyByIdSpy = jest.spyOn(loadSurveyResultRepositoryStub, 'loadBySurveyId')

    await sut.load('any_survey_id')

    expect(loadBySurveyByIdSpy).toHaveBeenCalledWith('any_survey_id')
  })
})
