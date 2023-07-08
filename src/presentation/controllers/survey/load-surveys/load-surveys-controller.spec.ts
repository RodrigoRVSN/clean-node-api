import { mockSurveyModels } from '@/domain/_test'
import { noContent, ok, serverError } from '../../../helpers/http/http-helpers'
import { LoadSurveysController } from './load-surveys-controller'
import { type LoadSurveys } from './load-surveys-controller-protocols'
import MockDate from 'mockdate'
import { mockLoadSurveys } from '@/presentation/_test'

type SutTypes = {
  sut: LoadSurveysController
  loadSurveyStub: LoadSurveys
}

const createSut = (): SutTypes => {
  const loadSurveyStub = mockLoadSurveys()
  const sut = new LoadSurveysController(loadSurveyStub)

  return { sut, loadSurveyStub }
}

describe('LoadSurveys Controller', () => {
  beforeAll(() => { MockDate.set(new Date()) })

  afterAll(() => { MockDate.reset() })

  it('should call LoadSurveys', async () => {
    const { sut, loadSurveyStub } = createSut()

    const loadSpy = jest.spyOn(loadSurveyStub, 'load')
    await sut.handle()
    expect(loadSpy).toHaveBeenCalled()
  })

  it('should return 500 when LoadSurveys throws', async () => {
    const { sut, loadSurveyStub } = createSut()

    jest.spyOn(loadSurveyStub, 'load').mockRejectedValueOnce(new Error())
    const httpResponse = await sut.handle()
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  it('should return 200 when LoadSurveys succeeds', async () => {
    const { sut } = createSut()

    const httpResponse = await sut.handle()
    expect(httpResponse).toEqual(ok(mockSurveyModels()))
  })

  it('should return 204 when LoadSurveys succeeds without content', async () => {
    const { sut, loadSurveyStub } = createSut()

    jest.spyOn(loadSurveyStub, 'load').mockResolvedValueOnce([])
    const httpResponse = await sut.handle()
    expect(httpResponse).toEqual(noContent())
  })
})
