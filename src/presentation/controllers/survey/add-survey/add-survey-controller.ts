import { badRequest, noContent, serverError } from '../../../helpers/http/http-helpers'
import { type Validation, type Controller, type HttpResponse, type AddSurvey } from './add-survey-controller-protocols'

export class AddSurveyController implements Controller {
  constructor (private readonly validation: Validation, private readonly addSurvey: AddSurvey) {
    this.validation = validation
    this.addSurvey = addSurvey
  }

  async handle (request: AddSurveyController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) return badRequest(error)

      await this.addSurvey.add({ ...request, date: new Date() })

      return noContent()
    } catch (error) {
      return serverError(error as Error)
    }
  }
}

export namespace AddSurveyController {
  export type Request = {
    question: string
    answers: Answer[]
  }

  type Answer = {
    image?: string
    answer: string
  }
}
