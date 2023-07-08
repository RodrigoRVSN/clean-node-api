import { type SaveSurveyResultRepository, type SaveSurveyResultParams, type SurveyResultModel, type SaveSurveyResult } from './db-save-survey-result.spec-protocols'

export class DbSaveSurveyResult implements SaveSurveyResult {
  constructor (private readonly saveSurveyResultRepository: SaveSurveyResultRepository) { }

  async save (data: SaveSurveyResultParams): Promise<SurveyResultModel> {
    const survey = await this.saveSurveyResultRepository.save(data)
    return survey
  }
}
