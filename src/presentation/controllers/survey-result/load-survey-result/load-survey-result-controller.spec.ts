import { LoadSurveyResultController } from './load-survey-result-controller'
import { type LoadSurveyById, type HttpRequest } from './load-survey-result-controller-protocols'
import { mockLoadSurveyById } from '@/presentation/_test'

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
})
