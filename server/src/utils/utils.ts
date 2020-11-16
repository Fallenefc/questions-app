import Questions from '../models/question';

export const examScoreCalculator = async (studentAnswers: any, questionsIdsArray: any) => {

  let correct = 0;
  let total = 0;

  const fetchedQuestions = await Questions.find().where('uuid').in(questionsIdsArray);

  fetchedQuestions.forEach((question: any) => {
    if (studentAnswers[question.uuid] === question.correct) correct++;
    total++
  })

  const result = Math.round((correct / total) * 100);
  return result;
}