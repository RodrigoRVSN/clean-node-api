import { type Validation } from '../../../presentations/protocols/validation'
import { ValidationComposite, EmailValidation, RequiredFieldValidation } from '../../../presentations/helpers/validators'
import { type EmailValidator } from '../../../presentations/protocols/email-validator'
import { makeLoginValidation } from './login-validation'

jest.mock('../../../presentations/helpers/validators/validation-composite')

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
    makeLoginValidation()

    const validations: Validation[] = []

    for (const field of ['email', 'password']) {
      validations.push(new RequiredFieldValidation(field))
    }

    validations.push(new EmailValidation('email', makeEmailValidator()))

    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
