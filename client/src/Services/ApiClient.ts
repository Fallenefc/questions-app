// API Client Service that makes the GET and the POST requests
import { AxiosResponse } from 'axios'
import api from './AxiosConfig';

// Get /me information

// Makes the API request to the /me endpoint and if the user is authorized, it 
export const getInfo = async () => {
  try {
    const response: AxiosResponse = await api.get('/me');
    return response;
  } catch (err) {
    console.error(err);
    return false;
  }
}

export const getApiQuestions = async () => {
  try {
    const response: AxiosResponse = await api.get('/questions');
    return response;
  } catch (err) {
    console.log(err);
  }
}

export const postQuestion = async (questionBody: any) => {
  try {
    console.log(questionBody)
    const response: AxiosResponse = await api.post('/questions', questionBody);
    return response;
  } catch (err) {
    console.error(err)
  }
}

export const deleteQuestion = async (questionId: string) => {
  try {
    await api.delete(`/questions/${questionId}`);
  } catch (err) {
    console.error(err);
  }
}

export const getApiQuizzes = async () => {
  try {
    const response: AxiosResponse = await api.get('/exams');
    return response;
  } catch (err) {
    console.log(err);
  }
}

export const getFullQuiz = async (quizId: string) => {
  try {
    const response: AxiosResponse = await api.get(`/singleExam/${quizId}`)
    return response;
  } catch (err) {
    console.log(err);
  }
}

export const createExam = async (title: string) => {
  try {
    const response: AxiosResponse = await api.post('/exams', {title: title});
    return response.data;
  } catch (err) {
    console.error(err)
  }
}

export const apiAddQuestionToQuiz = async (questionId: string, quizId: string) => {
  try {
    const response: AxiosResponse = await api.post('/addQuestion', {
      questionId: questionId,
      _id: quizId
    })
    console.log(response);
    return questionId;
  } catch (err) {
    console.error(err);
  }
}

export const apiDeleteAnExam = async (examId: string) => {
  try {
    await api.delete(`/exams/${examId}`);
    return true;
  } catch (err) {
    console.error(err);
  }
}

export const apiDeleteQuestionFromExam = async (examId: string, questionId: string) => {
  try {
    await api.post('/deleteQuestion', {
      examId: examId,
      questionId: questionId
    })
    return true;
  } catch (err) {
    console.error(err);
  }
}

export const apiGetFullExamAsAStudent = async (examId: string) => {
  try {
    const response = await api.get(`/startExam/${examId}`);
    return response.data;
  } catch (err) {
    console.error(err);
  }
}

export const submitAnExamAsAStudent = async (examId: string, answers: any, questions: string[]) => {
  try {
    const response = await api.post('/finishExam', {
      hashedId: examId,
      questions: questions,
      answers: answers
    })
    return response;
  } catch (err) {
    console.error(err);
  }
}

export const submitAnExamAsATeacher = async (examId: string) => {
  try {
    const response = await api.post('/generateExam', {
      examId: examId
    });
    return response.data;
  } catch (err) {
    console.error(err);
  }
}