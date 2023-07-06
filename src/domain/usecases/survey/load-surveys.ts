import { type SurveyModel } from '../../models/survey'

export type LoadSurveys = {
  load: () => Promise<SurveyModel[]>
}
