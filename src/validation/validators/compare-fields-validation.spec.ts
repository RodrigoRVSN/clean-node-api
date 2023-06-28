import { InvalidParamError } from '../../presentations/errors'
import { CompareFieldsValidation } from './compare-fields-validation'

const makeSut = (): CompareFieldsValidation => {
  return new CompareFieldsValidation('field', 'fieldToCompare')
}

describe('CompareFields Validation', () => {
  it('should return a InvalidParamError if validation fails', () => {
    const sut = makeSut()
    const error = sut.validate({ field: 'any_name', fieldToCompare: 'wrong_name' })
    expect(error).toEqual(new InvalidParamError('fieldToCompare'))
  })

  it('should return null if validation succeeds', () => {
    const sut = makeSut()
    const error = sut.validate({ field: 'any_name', fieldToCompare: 'any_name' })
    expect(error).toBeNull()
  })
})
