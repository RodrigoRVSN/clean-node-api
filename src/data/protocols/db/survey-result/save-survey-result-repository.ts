import { type SurveyResultModel } from '@/domain/models/survey-result'
import { type SaveSurveyResultModel } from '@/domain/usecases/survey-result/save-survey-result'

export type SaveSurveyResultRepository = {
  save: (data: SaveSurveyResultModel) => Promise<SurveyResultModel>
}
