import { type LoadSurveyById } from '@/domain/usecases/load-survey-by-id'
import { type SurveyModel } from '../load-surveys/db-load-surveys.protocols'
import { type LoadSurveyByIdRepository } from '@/data/protocols/db/survey/load-survey-by-id-repository'

export class DbLoadSurveyById implements LoadSurveyById {
  constructor (private readonly loadSurveyByIdRepository: LoadSurveyByIdRepository) { }

  async loadById (id: string): Promise<SurveyModel> {
    await this.loadSurveyByIdRepository.loadById(id)
    return {} as any
  }
}
