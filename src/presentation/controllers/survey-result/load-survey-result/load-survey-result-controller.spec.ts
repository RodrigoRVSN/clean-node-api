import { forbidden, serverError } from '@/presentation/helpers/http/http-helpers'
import { LoadSurveyResultController } from './load-survey-result-controller'
import { type LoadSurveyById, type HttpRequest } from './load-survey-result-controller-protocols'
import { mockLoadSurveyById } from '@/presentation/_test'
import { InvalidParamError } from '@/presentation/errors'
import { throwError } from '@/domain/_test/test-helper'

const makeFakeRequest = (): HttpRequest => ({
  params: {
    surveyId: 'any_id'
  }
})

type SutTypes = {
  sut: LoadSurveyResultController
  loadSurveyByIdStub: LoadSurveyById
}

const makeSut = (): SutTypes => {
  const loadSurveyByIdStub = mockLoadSurveyById()

  const sut = new LoadSurveyResultController(loadSurveyByIdStub)

  return { sut, loadSurveyByIdStub }
}

describe('LoadSurveyResult Controller', () => {
  it('should call LoadSurveyById with correct values', async () => {
    const { sut, loadSurveyByIdStub } = makeSut()

    const loadByIdSpy = jest.spyOn(loadSurveyByIdStub, 'loadById')
    await sut.handle(makeFakeRequest())
    expect(loadByIdSpy).toHaveBeenCalledWith('any_id')
  })

  it('should return 403 if LoadSurveyById returns null', async () => {
    const { sut, loadSurveyByIdStub } = makeSut()

    jest.spyOn(loadSurveyByIdStub, 'loadById').mockReturnValueOnce(Promise.resolve(null))
    const httpRequest = await sut.handle(makeFakeRequest())
    expect(httpRequest).toEqual(forbidden(new InvalidParamError('surveyId')))
  })

  it('should return 500 if LoadSurveyById throws', async () => {
    const { sut, loadSurveyByIdStub } = makeSut()

    jest.spyOn(loadSurveyByIdStub, 'loadById').mockImplementation(throwError)
    const httpRequest = await sut.handle(makeFakeRequest())
    expect(httpRequest).toEqual(serverError(new Error()))
  })
})
