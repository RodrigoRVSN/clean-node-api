import { forbidden } from '@/presentation/helpers/http/http-helpers'
import { type HttpRequest, type Controller, type HttpResponse, type LoadSurveyById } from './save-survey-result-protocols'

export class SaveSurveyResultController implements Controller {
  constructor (private readonly loadSurveyById: LoadSurveyById) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    await this.loadSurveyById.loadById(httpRequest.params.surveyId)
    return forbidden(new Error())
  }
}
