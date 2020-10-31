import Questions from '../models/question'

export const getQuestions = async (_: any, res: any): Promise<void> => {
  try {
    const questions = await Questions.find();
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
    const newQuestion = req.body;
    if (!newQuestion.stem || !newQuestion.options || newQuestion.options.length < 3 || !newQuestion.correct || !newQuestion.category) {
      res.status(400);
      res.send(`"Error": "You are missing one (or more) of the params!"`)
    }
    const createdQuestion = await Questions.create(newQuestion);
    console.log(`Added to database: ${JSON.stringify(newQuestion)}`)
    res.send(createdQuestion)
  }
  catch (e) {
    console.error(`Error adding an event to the database: ${e}`)
  }
}