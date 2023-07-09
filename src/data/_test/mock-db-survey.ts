import { mockSurveyModel, mockSurveyModels } from '@/domain/_test'
import { type AddSurveyRepository } from '../protocols/db/survey/add-survey-repository'
import { type LoadSurveyByIdRepository } from '../protocols/db/survey/load-survey-by-id-repository'
import { type AddSurveyParams } from '../usecases/survey/add-survey/db-add-survey-protocols'
import { type LoadSurveysRepository, type SurveyModel } from '../usecases/survey/load-surveys/db-load-surveys-protocols'

export const mockAddSurveyRepository = (): AddSurveyRepository => {
  class AddSurveyRepositoryStub implements AddSurveyRepository {
    async add (accountData: AddSurveyParams): Promise<void> {
      await new Promise(resolve => { resolve(null) })
    }
  }

  return new AddSurveyRepositoryStub()
}

export const mockLoadSurveyByIdRepository = (): LoadSurveyByIdRepository => {
  class LoadSurveyByIdRepositoryStub implements LoadSurveyByIdRepository {
    async loadById (id: string): Promise<SurveyModel> {
      return await new Promise(resolve => { resolve(mockSurveyModel()) })
    }
  }

  return new LoadSurveyByIdRepositoryStub()
}

export const mockLoadSurveyRepository = (): LoadSurveysRepository => {
  class LoadSurveysRepositoryStub implements LoadSurveysRepository {
    async loadAll (): Promise<SurveyModel[]> {
      return await new Promise(resolve => { resolve(mockSurveyModels()) })
    }
  }

  return new LoadSurveysRepositoryStub()
}
