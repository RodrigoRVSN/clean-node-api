import { type LoadSurveyResult } from '@/domain/usecases/survey-result/load-survey-result'
import { type SurveyResultModel } from '../save-survey-result/db-save-survey-result.spec-protocols'
import { type LoadSurveyResultRepository } from '@/data/protocols/db/survey-result/load-survey-result-repository'

export class DbLoadSurveyResult implements LoadSurveyResult {
  constructor (private readonly loadSurveyResultRepository: LoadSurveyResultRepository) { }

  async load (surveyId: string): Promise<SurveyResultModel> {
    await this.loadSurveyResultRepository.loadBySurveyId(surveyId)
    return surveyId as any
  }
}
