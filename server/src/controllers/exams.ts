import Exams, { Exam, ExamRaw } from '../models/exams';

export const getExams = async (req: any, res: any): Promise<void> => {
  try {
    const exams = await Exams.find({ownership: req.user._id}); // find and provide the query with teacher id (using ownership)
    res.status(200);
    res.send(exams);
  }
  catch (e) {
    console.error(`Error trying to GET: ${e}`)
  }
}

export const generateExam = async (req: any, res: any): Promise<void> => {
  try {
    const newExamTitle = req.body.title;

    if (!newExamTitle) {
      res.status(400);
      return res.send({
        error: "You are missing one (or more) of the params!"
      })
    }
    const createdExam = await Exams.create<ExamRaw>({
      title: newExamTitle,
      options: [],
      doneBy: [],
      ownership: req.user._id
    });
    console.log(`Added to database: ${JSON.stringify(createdExam)}`)
    res.send(createdExam)
  }
  catch (e) {
    console.error(`Error adding an event to the database: ${e}`)
  }
}