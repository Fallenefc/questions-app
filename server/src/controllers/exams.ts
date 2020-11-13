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

// FUNCTION TO GET A SINGLE FULL QUESTION FROM THE DATABASE

const getSingleQuestion = async (questionId: string) => {
  try {
    const question = await Questions.findOne({_id: questionId});
    // console.log(question);
    return question;
  } catch (err) {
    console.error(err);
  }
}

export const getFullExam = async (req: any, res: any): Promise<void> => {
  try {
    // Mongoose will return a full model, so I have to use toObject method to transform that model into the object
    const exam: any = (await Exams.findOne({_id: req.params.examId})).toObject();
    // map will return a stream of promises, so I have to wrap it into Promise.all
    exam.questions = await Promise.all(exam.questions.map(async (questionId: any) => {
      const question = await getSingleQuestion(questionId);
      console.log(question);
      return question;
    }))
    res.status(200);
    res.send(exam);
  } catch (err) {
    res.status(400);
  }
}

export const deleteQuestionFromExam = async (req: any, res: any): Promise<void> => {
  try {
    const exam: any = (await Exams.findOne({_id: req.body.examId})).toObject();
    console.log(exam.questions);
    exam.questions = exam.questions.filter((question: any) => question !== req.body.questionId);
    const filteredExam: any = await Exams.findByIdAndUpdate({_id: req.body.examId}, {questions: exam.questions})
    res.status(200);
    res.send(filteredExam);
  } catch (error) {
    res.status(400);
  }
}

export const deleteAnExam = async (req: any, res: any): Promise<void> => {
  try {
    const examId = req.params.examId;
    const deletedExam = await Exams.findByIdAndDelete({_id: examId});
    res.status(200);
    res.send(deletedExam);
  } catch (err) {
    res.status(400);
  }
}