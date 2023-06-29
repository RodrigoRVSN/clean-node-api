export type AddSurveyModel = {
  question: string
  answers: SurveyAnswer[]
}

export type SurveyAnswer = {
  image: string
  answer: string
}

export type AddSurvey = {
  add: (data: AddSurveyModel) => Promise<void>
}
