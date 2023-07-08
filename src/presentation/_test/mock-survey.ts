import { mockSurveyModel, mockSurveyModels } from '@/domain/_test'
import { type AddSurvey, type AddSurveyParams } from '../controllers/survey/add-survey/add-survey-controller-protocols'
import { type LoadSurveys, type SurveyModel } from '../controllers/survey/load-surveys/load-surveys-controller-protocols'
import { type LoadSurveyById } from '../controllers/survey-result/save-survey-result/save-survey-result-protocols'

export const mockAddSurvey = (): AddSurvey => {
  class AddSurveyStub implements AddSurvey {
    async add (data: AddSurveyParams): Promise<void> {
      await new Promise(resolve => { resolve(null) })
    }
  }
  return new AddSurveyStub()
}

export const mockLoadSurveys = (): LoadSurveys => {
  class LoadSurveysStub implements LoadSurveys {
    async load (): Promise<SurveyModel[]> {
      return await new Promise(resolve => { resolve(mockSurveyModels()) })
    }
  }
  return new LoadSurveysStub()
}

export const mockLoadSurveyById = (): LoadSurveyById => {
  class LoadSurveyByIdStub implements LoadSurveyById {
    async loadById (id: string): Promise<SurveyModel> {
      return await new Promise(resolve => { resolve(mockSurveyModel()) })
    }
  }
  return new LoadSurveyByIdStub()
}
