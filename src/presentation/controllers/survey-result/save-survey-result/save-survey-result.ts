import { forbidden, ok, serverError } from '@/presentation/helpers/http/http-helpers'
import { type HttpRequest, type Controller, type HttpResponse, type LoadSurveyById } from './save-survey-result-protocols'
import { InvalidParamError } from '@/presentation/errors'

export class SaveSurveyResultController implements Controller {
  constructor (private readonly loadSurveyById: LoadSurveyById) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { surveyId } = httpRequest.params
      const { answer } = httpRequest.body

      const survey = await this.loadSurveyById.loadById(surveyId)
      if (!survey) return forbidden(new InvalidParamError('surveyId'))

      const answers = survey.answers.map(a => a.answer)
      if (!answers.includes(answer)) return forbidden(new InvalidParamError('answer'))

      return ok('')
    } catch (error) {
      return serverError(error as Error)
    }
  }
}
