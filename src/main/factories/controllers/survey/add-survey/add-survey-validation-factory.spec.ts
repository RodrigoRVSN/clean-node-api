
import { ValidationComposite, RequiredFieldValidation } from '@/validation/validators'
import { type Validation } from '@/presentation/protocols/validation'
import { makeAddSurveyValidation } from './add-survey-validation-factory'

jest.mock('@/validation/validators/validation-composite')

describe('AddSurveyValidation Factory', () => {
  it('should call ValidationCompose with all validation', () => {
    makeAddSurveyValidation()

    const validations: Validation[] = []

    for (const field of ['question', 'answers']) {
      validations.push(new RequiredFieldValidation(field))
    }

    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
