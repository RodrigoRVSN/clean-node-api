import { type LoadSurveysRepository } from '@/data/protocols/db/survey/load-surveys-repository'
import { type AddSurveyModel, type AddSurveyRepository } from '@/data/usecases/survey/add-survey/db-add-survey-protocols'
import { type SurveyModel } from '@/domain/models/survey'
import { } from '@/domain/usecases/add-survey'
import { MongoHelper } from '../helpers/mongo-helper'

export class SurveyMongoRepository implements AddSurveyRepository, LoadSurveysRepository {
  async add (surveyData: AddSurveyModel): Promise<void> {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.insertOne(surveyData)
  }

  async loadAll (): Promise<SurveyModel[]> {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    const surveys = await surveyCollection.find().toArray() as unknown as SurveyModel[]
    return surveys
  }
}
