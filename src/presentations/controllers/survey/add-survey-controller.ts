import { badRequest, ok } from '../../helpers/http/http-helpers'
import { type Validation, type Controller, type HttpRequest, type HttpResponse } from './add-survey-controller-protocols'

export class AddSurveyController implements Controller {
  constructor (private readonly validation: Validation) {
    this.validation = validation
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const error = this.validation.validate(httpRequest.body)
    if (error) return badRequest(error)
    return await new Promise(resolve => { resolve(ok('')) })
  }
}
