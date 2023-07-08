import { badRequest, ok, serverError, unauthorized } from '../../../helpers/http/http-helpers'
import { type Authentication, type HttpRequest, type Validation } from './login-controller-protocols'
import { LoginController } from './login-controller'
import { mockValidation } from '@/validation/_test'
import { mockAuthentication } from '@/presentation/_test'

const mockRequest = (): HttpRequest => ({
  body: {
    email: 'any_email@mail.com',
    password: 'any_password'
  }
})

type SutTypes = {
  sut: LoginController
  validationStub: Validation
  authenticationStub: Authentication
}

const makeSut = (): SutTypes => {
  const validationStub = mockValidation()
  const authenticationStub = mockAuthentication()
  const sut = new LoginController(validationStub, authenticationStub)
  return { sut, validationStub, authenticationStub }
}

describe('Login Controller', () => {
  it('should call Authentication with correct values', async () => {
    const { sut, authenticationStub } = makeSut()
    const authSpy = jest.spyOn(authenticationStub, 'auth')

    await sut.handle(mockRequest())
    expect(authSpy).toHaveBeenCalledWith({ email: 'any_email@mail.com', password: 'any_password' })
  })

  it('should return 401 if invalid credentials are provided', async () => {
    const { sut, authenticationStub } = makeSut()

    jest.spyOn(authenticationStub, 'auth').mockResolvedValueOnce('')

    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(unauthorized())
  })

  it('should return 500 if Authentication throws', async () => {
    const { sut, authenticationStub } = makeSut()

    jest.spyOn(authenticationStub, 'auth').mockRejectedValueOnce(new Error())

    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  it('should return 200 if valid data is provided', async () => {
    const { sut } = makeSut()

    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok({ accessToken: 'any_token' }))
  })

  it('should return 400 if validation throws', async () => {
    const { sut, validationStub } = makeSut()

    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new Error())
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(badRequest(new Error()))
  })
})
