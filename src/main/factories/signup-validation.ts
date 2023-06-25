import { RequiredFieldValidate } from '../../presentations/helpers/validators/required-field-validation'
import { type Validation } from '../../presentations/helpers/validators/validation'
import { ValidationComposite } from '../../presentations/helpers/validators/validation-composite'

export const makeSignUpValidation = (): ValidationComposite => {
  const validations: Validation[] = []

  for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
    validations.push(new RequiredFieldValidate(field))
  }

  return new ValidationComposite(validations)
}
