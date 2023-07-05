import { type SaveSurveyResultRepository, type SaveSurveyResultModel, type SurveyResultModel, type SaveSurveyResult } from './db-save-survey-result.spec-protocols'

export class DbSaveSurveyResult implements SaveSurveyResult {
  constructor (private readonly saveSurveyResultRepository: SaveSurveyResultRepository) {}

  async save (data: SaveSurveyResultModel): Promise<SurveyResultModel> {
    const survey = await this.saveSurveyResultRepository.save(data)
    return survey
  }
}
