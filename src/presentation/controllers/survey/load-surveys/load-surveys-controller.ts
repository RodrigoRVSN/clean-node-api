import { type Controller, type HttpResponse, type LoadSurveys } from './load-surveys-controller-protocols'

export class LoadSurveyController implements Controller {
  constructor (private readonly loadSurveys: LoadSurveys) { }

  async handle (): Promise<HttpResponse> {
    await this.loadSurveys.load()
    return null as any
  }
}
