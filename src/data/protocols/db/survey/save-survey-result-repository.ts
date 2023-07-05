import { type SurveyResultModel } from '@/domain/models/survey-result'
import { type SaveSurveyResultModel } from '@/domain/usecases/save-survey-result'

export type SaveSurveyResultRepository = {
  save: (data: SaveSurveyResultModel) => Promise<SurveyResultModel>
}
