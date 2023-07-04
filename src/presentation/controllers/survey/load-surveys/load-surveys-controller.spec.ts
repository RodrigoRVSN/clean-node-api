import { noContent, ok, serverError } from '../../../helpers/http/http-helpers'
import { LoadSurveysController } from './load-surveys-controller'
import { type SurveyModel, type LoadSurveys } from './load-surveys-controller-protocols'
import MockDate from 'mockdate'

const makeFakeSurveys = (): SurveyModel[] => ([{
  id: 'other_id',
  question: 'any_question',
  answers: [{ image: 'any_image', answer: 'any_answer' }],
  date: new Date()
}, {
  id: 'other_id',
  question: 'other_question',
  answers: [{ image: 'other_image', answer: 'other_answer' }],
  date: new Date()
}])

const makeLoadSurveys = (): LoadSurveys => {
  class LoadSurveysStub implements LoadSurveys {
    async load (): Promise<SurveyModel[]> {
      return await new Promise(resolve => { resolve(makeFakeSurveys()) })
    }
  }
  return new LoadSurveysStub()
}

type SutTypes = {
  sut: LoadSurveysController
  loadSurveyStub: LoadSurveys
}

const createSut = (): SutTypes => {
  const loadSurveyStub = makeLoadSurveys()
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
    expect(httpResponse).toEqual(ok(makeFakeSurveys()))
  })

  it('should return 204 when LoadSurveys succeeds without content', async () => {
    const { sut, loadSurveyStub } = createSut()

    jest.spyOn(loadSurveyStub, 'load').mockResolvedValueOnce([])
    const httpResponse = await sut.handle()
    expect(httpResponse).toEqual(noContent())
  })
})