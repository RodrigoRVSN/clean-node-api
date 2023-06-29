import { AddSurveyController } from '../../../../presentation/controllers/survey/add-survey-controller'
import { type Controller } from '../../../../presentation/protocols'
import { makeDbAddSurvey } from '../../usecases/add-survey/db-add-survey-factory'
import { makeLogControllerDecorator } from '../../usecases/decorators/log-controller-decorator-factory'
import { makeAddSurveyValidation } from './add-survey-validation-factory'

export const makeAddSurveyController = (): Controller => {
  const addSurveyController = new AddSurveyController(makeAddSurveyValidation(), makeDbAddSurvey())

  return makeLogControllerDecorator(addSurveyController)
}
