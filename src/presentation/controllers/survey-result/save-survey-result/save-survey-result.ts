import { forbidden, serverError } from '@/presentation/helpers/http/http-helpers'
import { type HttpRequest, type Controller, type HttpResponse, type LoadSurveyById } from './save-survey-result-protocols'
import { InvalidParamError } from '@/presentation/errors'

export class SaveSurveyResultController implements Controller {
  constructor (private readonly loadSurveyById: LoadSurveyById) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const survey = await this.loadSurveyById.loadById(httpRequest.params.surveyId)

      if (!survey) return forbidden(new InvalidParamError('surveyId'))

      return forbidden(new Error())
    } catch (error) {
      return serverError(error as Error)
    }
  }
}
