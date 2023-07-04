import { type AddSurveyModel } from '@/domain/usecases/add-survey'

export type AddSurveyRepository = {
  add: (accountData: AddSurveyModel) => Promise<void>
}
