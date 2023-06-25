import { RequiredFieldValidate } from '../../presentations/helpers/validators/required-field-validation'
import { type Validation } from '../../presentations/helpers/validators/validation'
import { ValidationComposite } from '../../presentations/helpers/validators/validation-composite'
import { makeSignUpValidation } from './signup-validation'

jest.mock('../../presentations/helpers/validators/validation-composite')

describe('SignUpValidation Factory', () => {
  it('should call ValidationCompose with all validation', () => {
    makeSignUpValidation()

    const validations: Validation[] = []

    for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
      validations.push(new RequiredFieldValidate(field))
    }

    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
