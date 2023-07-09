import { forbidden, ok, serverError } from '@/presentation/helpers/http/http-helpers'
import { type LoadSurveyById, type Controller, type HttpRequest, type HttpResponse } from './load-survey-result-controller-protocols'
import { InvalidParamError } from '@/presentation/errors'

export class LoadSurveyResultController implements Controller {
  constructor (private readonly loadSurveyById: LoadSurveyById) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const surveyResult = await this.loadSurveyById.loadById(httpRequest.params.surveyId)
      if (!surveyResult) return forbidden(new InvalidParamError('surveyId'))
      return ok('')
    } catch (error) {
      return serverError(error as Error)
    }
  }
}
