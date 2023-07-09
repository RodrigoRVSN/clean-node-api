import { type LogErrorRepository } from '@/data/protocols/db/log/log-error-repository'
import { ok, serverError } from '@/presentation/helpers/http/http-helpers'
import { type HttpRequest, type HttpResponse, type Controller } from '@/presentation/protocols'
import { LogControllerDecorator } from './log-controller-decorator'
import { mockAccountModel } from '@/domain/_test'
import { mockLogErrorRepository } from '@/data/_test'

const makeController = (): Controller => {
  class ControllerStub implements Controller {
    async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
      return await new Promise(resolve => { resolve(ok(mockAccountModel())) })
    }
  }

  return new ControllerStub()
}

const makeFakeServerError = (): HttpResponse => {
  const fakeError = new Error()
  fakeError.stack = 'any_stack'
  return serverError(fakeError)
}

const mockRequest = (): HttpRequest => ({
  body: {
    name: 'John Doe',
    email: 'any_email@mail.com',
    password: 'any_password',
    passwordConfirmation: 'any_password'
  }
})

type SutTypes = {
  sut: LogControllerDecorator
  controllerStub: Controller
  logErrorRepositoryStub: LogErrorRepository
}

const makeSut = (): SutTypes => {
  const controllerStub = makeController()
  const logErrorRepositoryStub = mockLogErrorRepository()
  const sut = new LogControllerDecorator(controllerStub, logErrorRepositoryStub)

  return { sut, controllerStub, logErrorRepositoryStub }
}

describe('LogControllerDecorator', () => {
  it('should call controller handle', async () => {
    const { controllerStub, sut } = makeSut()

    const handleSpy = jest.spyOn(controllerStub, 'handle')
    await sut.handle(mockRequest())
    expect(handleSpy).toHaveBeenCalledWith(mockRequest())
  })

  it('should return the same response of the controller', async () => {
    const { sut } = makeSut()

    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toStrictEqual(ok(mockAccountModel()))
  })

  it('should call LogErrorRepository with correct error if controller returns a server error', async () => {
    const { sut, controllerStub, logErrorRepositoryStub } = makeSut()

    const logSpy = jest.spyOn(logErrorRepositoryStub, 'logError')

    jest.spyOn(controllerStub, 'handle').mockReturnValueOnce(new Promise((resolve) => { resolve(makeFakeServerError()) }))

    await sut.handle(mockRequest())
    expect(logSpy).toHaveBeenCalledWith('any_stack')
  })
})
