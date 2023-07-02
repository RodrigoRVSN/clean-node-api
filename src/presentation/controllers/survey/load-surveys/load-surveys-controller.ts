import { noContent, ok, serverError } from '../../../helpers/http/http-helpers'
import { type Controller, type HttpResponse, type LoadSurveys } from './load-surveys-controller-protocols'

export class LoadSurveyController implements Controller {
  constructor (private readonly loadSurveys: LoadSurveys) { }

  async handle (): Promise<HttpResponse> {
    try {
      const surveys = await this.loadSurveys.load()
      return surveys.length ? ok(surveys) : noContent()
    } catch (error) {
      return serverError(error as Error)
    }
  }
}
