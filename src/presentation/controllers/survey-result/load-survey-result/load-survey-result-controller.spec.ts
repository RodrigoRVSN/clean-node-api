import { LoadSurveyResultController } from './load-survey-result-controller'
import { type HttpRequest } from './load-survey-result-controller-protocols'
import { mockLoadSurveyById } from '@/presentation/_test'

const makeFakeRequest = (): HttpRequest => ({
  params: {
    surveyId: 'any_id'
  }
})

describe('LoadSurveyResult Controller', () => {
  it('should call LoadSurveyById with correct values', async () => {
    const loadSurveyByIdStub = mockLoadSurveyById()

    const sut = new LoadSurveyResultController(loadSurveyByIdStub)

    const loadByIdSpy = jest.spyOn(loadSurveyByIdStub, 'loadById')
    await sut.handle(makeFakeRequest())
    expect(loadByIdSpy).toHaveBeenCalledWith('any_id')
  })
})
