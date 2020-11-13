// API Client Service that makes the GET and the POST requests
import { AxiosResponse } from 'axios'
import { QuestionRaw } from '../Interfaces/Questions';
import api from './AxiosConfig';

// Get /me information

// Makes the API request to the /me endpoint and if the user is authorized, it 
export const getInfo = async () => {
  try {
    const response: AxiosResponse = await api.get('/me');
    return response;
  } catch (err) {
    console.error(err);
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