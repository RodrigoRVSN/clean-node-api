import { type SaveSurveyResultParams } from '@/domain/usecases/survey-result/save-survey-result'

export type SaveSurveyResultRepository = {
  save: (data: SaveSurveyResultParams) => Promise<void>
}
