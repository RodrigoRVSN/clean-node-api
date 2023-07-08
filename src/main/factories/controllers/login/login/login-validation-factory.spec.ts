
import { ValidationComposite, RequiredFieldValidation, EmailValidation } from '@/validation/validators'
import { type Validation } from '@/presentation/protocols/validation'
import { makeLoginValidation } from './login-validation-factory'
import { mockEmailValidator } from '@/validation/_test'

jest.mock('@/validation/validators/validation-composite.ts')

describe('SignUpValidation Factory', () => {
  it('should call ValidationCompose with all validation', () => {
    makeLoginValidation()

    const validations: Validation[] = []

    for (const field of ['email', 'password']) {
      validations.push(new RequiredFieldValidation(field))
    }

    validations.push(new EmailValidation('email', mockEmailValidator()))

    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
