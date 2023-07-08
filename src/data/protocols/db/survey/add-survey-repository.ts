import { type AddSurveyParams } from '@/domain/usecases/survey/add-survey'

export type AddSurveyRepository = {
  add: (accountData: AddSurveyParams) => Promise<void>
}
