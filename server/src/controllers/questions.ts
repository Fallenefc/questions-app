import Questions, {Question, QuestionRaw} from '../models/question'
import {Document} from 'mongoose'

export const getQuestions = async (req: any, res: any): Promise<void> => {
  try {
    const questions = await Questions.find({ownership: req.user._id}); // find and provide the query with teacher id (using ownership)
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
    if (!newQuestion.stem || !newQuestion.options || newQuestion.options.length < 2 || !newQuestion.correct || !newQuestion.category) {
      res.status(400);
      return res.send({
        error: "You are missing one (or more) of the params!"
      })
    }
    const createdQuestion: Document = await Questions.create<QuestionRaw>({
      ...newQuestion,
      ownership: req.user._id
    }); // check for mongoose document type
    console.log(`Added to database: ${JSON.stringify(newQuestion)}`)
    res.send(createdQuestion)
  }
  catch (e) {
    console.error(`Error adding an event to the database: ${e}`)
  }
}

export const updateQuestion = async (req: any, res: any): Promise<void> => {
  try {
    const questionId = req.params.id;
    const filter = { _id: questionId };
    // how to make it not update if those properties are not passed in the body? or maybe wouldnt be needed...
    const update = req.body;
    const question = await Questions.findByIdAndUpdate(filter, update);

    res.send(question);
    res.status(200);

  } catch (err) {
    res.sendStatus(403);
  }
  // const id = req.params.id;
  // const filter = { _id: id };
  // const update = req.body;
  // const question = await Questions.findOneAndUpdate(filter, update);
  // res.send(question);
  // res.status(200);
}

export const deleteQuestion = async (req: any, res: any): Promise<void> => {
  try {
    const questionId: string = req.params.id;
    await Questions.deleteOne({_id: questionId});
    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(403);
  }
}