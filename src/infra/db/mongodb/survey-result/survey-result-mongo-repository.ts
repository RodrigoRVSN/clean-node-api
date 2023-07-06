import { type SurveyResultModel } from '@/domain/models/survey-result'
import { MongoHelper } from '../helpers/mongo-helper'
import { type SaveSurveyResultRepository } from '@/data/protocols/db/survey-result/save-survey-result-repository'
import { type SaveSurveyResultModel } from '@/domain/usecases/survey-result/save-survey-result'

export class SurveyResultMongoRepository implements SaveSurveyResultRepository {
  async save (data: SaveSurveyResultModel): Promise<SurveyResultModel> {
    const surveyResultCollection = await MongoHelper.getCollection('surveyResults')
    const res = await surveyResultCollection.findOneAndUpdate({
      surveyId: data.surveyId,
      accountId: data.accountId
    }, {
      $set: {
        answer: data.answer,
        date: data.date
      }
    }, {
      upsert: true,
      returnDocument: 'after'
    })

    return { ...res.value as unknown as SurveyResultModel, id: String(res.value?._id) }
  }
}
