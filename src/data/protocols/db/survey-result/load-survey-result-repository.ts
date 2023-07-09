import { type SurveyResultModel } from '@/domain/models/survey-result'

export type LoadSurveyResultRepository = {
  loadBySurveyId: (surveyId: string) => Promise<SurveyResultModel | null>
}
