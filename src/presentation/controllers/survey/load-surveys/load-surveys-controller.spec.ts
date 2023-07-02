import { LoadSurveyController } from './load-surveys-controller'
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
  sut: LoadSurveyController
  loadSurveyStub: LoadSurveys
}

const createSut = (): SutTypes => {
  const loadSurveyStub = makeLoadSurveys()
  const sut = new LoadSurveyController(loadSurveyStub)

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
})
