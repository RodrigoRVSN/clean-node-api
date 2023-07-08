import { mockSurveyResultModel } from '@/domain/_test'
import { type SaveSurveyResult, type SaveSurveyResultParams, type SurveyResultModel } from '../controllers/survey-result/save-survey-result/save-survey-result-protocols'

export const mockSaveSurveyResult = (): SaveSurveyResult => {
  class SaveSurveyResultStub implements SaveSurveyResult {
    async save (data: SaveSurveyResultParams): Promise<SurveyResultModel> {
      return await new Promise(resolve => { resolve(mockSurveyResultModel()) })
    }
  }

  return new SaveSurveyResultStub()
}
