import { type LoadSurveysRepository } from '@/data/protocols/db/survey/load-surveys-repository'
import { type SurveyModel } from '@/domain/models/survey'
import { type AddSurveyParams } from '@/domain/usecases/survey/add-survey'
import { MongoHelper } from '../helpers/mongo-helper'
import { type LoadSurveyByIdRepository } from '@/data/protocols/db/survey/load-survey-by-id-repository'
import { ObjectId } from 'mongodb'
import { type AddSurveyRepository } from '@/data/protocols/db/survey/add-survey-repository'

export class SurveyMongoRepository implements AddSurveyRepository, LoadSurveysRepository, LoadSurveyByIdRepository {
  async add (surveyData: AddSurveyParams): Promise<void> {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.insertOne(surveyData)
  }

  async loadAll (): Promise<SurveyModel[]> {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    const surveys = await surveyCollection.find().toArray() as unknown as SurveyModel[]
    return surveys
  }

  async loadById (id: string): Promise<SurveyModel> {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    const survey = await surveyCollection.findOne({ _id: new ObjectId(id) }) as unknown as SurveyModel
    return survey
  }
}
