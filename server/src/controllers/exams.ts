import Exams, { Exam, ExamRaw } from '../models/exams';
import Questions from '../models/question'

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
      questions: [],
      doneBy: [],
      ownership: req.user._id,
      submitted: false
    });
    console.log(`Added to database: ${JSON.stringify(createdExam)}`)
    res.send(createdExam)
  }
  catch (e) {
    console.error(`Error adding an event to the database: ${e}`)
  }
}

// Add Question To Exam:
// It fetches the exam by the exam Id
// Pushes the question Id to the exam questions array
// Updates the exam with the new exam with the pushed element into its array

export const addQuestionToExam = async (req: any, res: any): Promise<void> => {
  try {
    // Request body must include:
    // Exam ID and Option to be pushed
    const currentExam: any = await Exams.findOne({_id: req.body._id}); // This finds the exam in the collection
    currentExam.questions.push(req.body.questionId); // Pushes question Id to the exam questions array

    const update = currentExam;
    const question = await Exams.findByIdAndUpdate({_id: req.body._id}, update);
    res.status(200);
    res.send(question);
  } catch (err) {
    res.status(400);
  }
}