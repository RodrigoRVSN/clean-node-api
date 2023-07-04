import { type SurveyModel } from '../models/survey'

export type LoadSurveyById = {
  loadById: (id: string) => Promise<SurveyModel>
}
