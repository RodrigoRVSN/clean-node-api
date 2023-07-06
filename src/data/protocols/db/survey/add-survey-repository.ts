import { type AddSurveyModel } from '@/domain/usecases/survey/add-survey'

export type AddSurveyRepository = {
  add: (accountData: AddSurveyModel) => Promise<void>
}
