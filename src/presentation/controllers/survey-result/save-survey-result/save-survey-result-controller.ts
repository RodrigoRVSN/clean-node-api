import { forbidden, ok, serverError } from '@/presentation/helpers/http/http-helpers'
import { type Controller, type HttpResponse, type LoadSurveyById, type SaveSurveyResult } from './save-survey-result-controller-protocols'
import { InvalidParamError } from '@/presentation/errors'

export class SaveSurveyResultController implements Controller {
  constructor (private readonly loadSurveyById: LoadSurveyById, private readonly saveSurveyResult: SaveSurveyResult) { }

  async handle (request: SaveSurveyResultController.Request): Promise<HttpResponse> {
    try {
      const { surveyId, accountId, answer } = request

      const survey = await this.loadSurveyById.loadById(surveyId)
      if (!survey) return forbidden(new InvalidParamError('surveyId'))

      const answers = survey.answers.map(a => a.answer)
      if (!answers.includes(answer)) return forbidden(new InvalidParamError('answer'))

      const surveyResult = await this.saveSurveyResult.save({
        accountId: String(accountId),
        surveyId,
        answer,
        date: new Date()
      })
      return ok(surveyResult)
    } catch (error) {
      return serverError(error as Error)
    }
  }
}

export namespace SaveSurveyResultController {
  export type Request = {
    surveyId: string
    answer: string
    accountId: string
  }
}
