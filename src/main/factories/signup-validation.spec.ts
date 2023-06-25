import { CompareFieldsValidation } from '../../presentations/helpers/validators/compare-fields-validation'
import { EmailValidation } from '../../presentations/helpers/validators/email-validation'
import { RequiredFieldValidate } from '../../presentations/helpers/validators/required-field-validation'
import { type Validation } from '../../presentations/helpers/validators/validation'
import { ValidationComposite } from '../../presentations/helpers/validators/validation-composite'
import { type EmailValidator } from '../../presentations/protocols/email-validator'
import { makeSignUpValidation } from './signup-validation'

jest.mock('../../presentations/helpers/validators/validation-composite')

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

describe('SignUpValidation Factory', () => {
  it('should call ValidationCompose with all validation', () => {
    makeSignUpValidation()

    const validations: Validation[] = []

    for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
      validations.push(new RequiredFieldValidate(field))
    }

    validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'))

    validations.push(new EmailValidation('email', makeEmailValidator()))

    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
