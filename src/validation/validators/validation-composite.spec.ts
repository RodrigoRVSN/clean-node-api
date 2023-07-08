import { MissingParamError } from '@/presentation/errors'
import { type Validation } from '@/presentation/protocols/validation'
import { ValidationComposite } from './validation-composite'
import { mockValidation } from '../_test'

type SutTypes = {
  sut: ValidationComposite
  validationStubs: Validation[]
}

const makeSut = (): SutTypes => {
  const validationStubs = [mockValidation(), mockValidation()]
  const sut = new ValidationComposite(validationStubs)
  return { sut, validationStubs }
}

describe('Validation Composite', () => {
  it('should return an error if any validation fails', () => {
    const { sut, validationStubs } = makeSut()
    jest.spyOn(validationStubs[0], 'validate').mockReturnValueOnce(new MissingParamError('field'))

    const error = sut.validate({ field: 'any_name' })
    expect(error).toEqual(new MissingParamError('field'))
  })

  it('should return the first error when more than 1 validation fails', () => {
    const { sut, validationStubs } = makeSut()
    jest.spyOn(validationStubs[0], 'validate').mockReturnValueOnce(new Error())
    jest.spyOn(validationStubs[1], 'validate').mockReturnValueOnce(new MissingParamError('field'))

    const error = sut.validate({ field: 'any_name' })
    expect(error).toEqual(new Error())
  })

  it('should return nothing if all validations succeeds', () => {
    const { sut } = makeSut()

    const error = sut.validate({ field: 'any_name' })
    expect(error).toBeNull()
  })
})
