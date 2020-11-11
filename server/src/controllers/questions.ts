import Questions, {Question, QuestionRaw} from '../models/question'
import {Document} from 'mongoose'

export const getQuestions = async (_: any, res: any): Promise<void> => {
  try {
    const questions = await Questions.find(); // find and provide the query with teacher id (using ownership)
    res.status(200);
    res.send(questions);
  }
  catch (e) {
    console.error(`Error trying to GET: ${e}`)
  }
}

// Added a 400 status code for missing params

export const postQuestion = async (req: any, res: any): Promise<void> => {
  try {
    const newQuestion: QuestionRaw = req.body; // enforce question interface
    if (!newQuestion.stem || !newQuestion.options || newQuestion.options.length < 2 || !newQuestion.correct || !newQuestion.category || !newQuestion.ownership) {
      res.status(400);
      return res.send({
        error: "You are missing one (or more) of the params!"
      })
    }
    const createdQuestion: Document = await Questions.create<QuestionRaw>(newQuestion); // check for mongoose document type
    console.log(`Added to database: ${JSON.stringify(newQuestion)}`)
    res.send(createdQuestion)
  }
  catch (e) {
    console.error(`Error adding an event to the database: ${e}`)
  }
}

export const updateQuestion = async (req: any, res: any): Promise<void> => {
  const id = req.params.id;
  const filter = { _id: id };
  const update = req.body;
  const question = await Questions.findOneAndUpdate(filter, update);
  res.send(question);
  res.status(200);
}