import { type Validation } from '@/presentation/protocols/validation'
import { CompareFieldsValidation, EmailValidation, RequiredFieldValidation, ValidationComposite } from '@/validation/validators'
import { makeSignUpValidation } from './signup-validation-factory'
import { mockEmailValidator } from '@/validation/_test'

jest.mock('@/validation/validators/validation-composite')

describe('SignUpValidation Factory', () => {
  it('should call ValidationCompose with all validation', () => {
    makeSignUpValidation()

    const validations: Validation[] = []

    for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
      validations.push(new RequiredFieldValidation(field))
    }

    validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'))

    validations.push(new EmailValidation('email', mockEmailValidator()))

    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
