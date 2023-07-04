import { type Controller } from '@/presentation/protocols'
import { makeDbAddSurvey } from '../../../usecases/survey/add-survey/db-add-survey-factory'
import { makeLogControllerDecorator } from '../../../decorators/log-controller-decorator-factory'
import { makeAddSurveyValidation } from './add-survey-validation-factory'
import { AddSurveyController } from '@/presentation/controllers/survey/add-survey/add-survey-controller'

export const makeAddSurveyController = (): Controller => {
  const addSurveyController = new AddSurveyController(makeAddSurveyValidation(), makeDbAddSurvey())

  return makeLogControllerDecorator(addSurveyController)
}
