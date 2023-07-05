import { type SurveyModel } from '@/domain/models/survey'

export type LoadSurveyByIdRepository = {
  loadById: (id: string) => Promise<SurveyModel>
}
