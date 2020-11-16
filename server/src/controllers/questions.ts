import Questions, {QuestionRaw} from '../models/question'
import {Document} from 'mongoose'
import {v4 as uuidv4} from 'uuid';
import { Request, Response } from 'express';

export interface AuthRequest extends Request {
  user: any,
  body: any
}

export const getQuestions = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const questions = await Questions.find({ownership: req.user._id}); // find and provide the query with teacher id (using ownership)
    res.status(200);
    res.send(questions);
  }
  catch (e) {
    console.error(`Error trying to GET: ${e}`)
  }
}

export const postQuestion = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const newQuestion: QuestionRaw = req.body; // enforce question interface
    if (!newQuestion.stem || newQuestion.options.length < 2 || newQuestion.correct === undefined || !newQuestion.category) {
      res.status(400);
      res.send({
        error: "You are missing one (or more) of the params!"
      });
      return;
    }
    const hashedId = uuidv4(); // this is not really hashed but I will hash it a later version
    const createdQuestion: Document = await Questions.create<QuestionRaw>({
      ...newQuestion,
      ownership: req.user._id,
      uuid: hashedId
    });
    console.log(`Added to database: ${JSON.stringify(newQuestion)}`)
    res.send(createdQuestion);
  }
  catch (e) {
    console.error(`Error adding an event to the database: ${e}`)
  }
}

export const updateQuestion = async (req: AuthRequest, res: Response): Promise<void> => {
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
}

export const deleteQuestion = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    // search question by id, so just deletes it
    const questionId: string = req.params.id;
    await Questions.deleteOne({_id: questionId});
    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(403);
  }
}
