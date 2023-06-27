import { MissingParamError } from '../../errors'
import { type Validation } from './validation'
import { ValidationComposite } from './validation-composite'

class ValidationStub implements Validation {
  validate (input: any): Error | null {
    return new MissingParamError('field')
  }
}

const makeSut = (): ValidationComposite => {
  const validationStub = new ValidationStub()
  return new ValidationComposite([validationStub])
}

describe('Validation Composite', () => {
  it('should return an error if any validation fails', () => {
    const sut = makeSut()
    const error = sut.validate({ field: 'any_name' })
    expect(error).toEqual(new MissingParamError('field'))
  })
})
