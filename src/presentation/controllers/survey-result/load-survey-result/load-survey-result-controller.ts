import { ok } from '@/presentation/helpers/http/http-helpers'
import { type LoadSurveyById, type Controller, type HttpRequest, type HttpResponse } from './load-survey-result-controller-protocols'

export class LoadSurveyResultController implements Controller {
  constructor (private readonly loadSurveyById: LoadSurveyById) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    await this.loadSurveyById.loadById(httpRequest.params.surveyId)
    return ok('')
  }
}
