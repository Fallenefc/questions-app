// API Client Service that makes the GET and the POST requests
import axios from 'axios'
import { SERVER_URL } from '../Environment'
import { QuestionsInterface } from '../Interfaces/Questions';
import api from './AxiosConfig';

const authHeader = {
  headers: {
    'authorization': "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmFjNTY3ODFlMjU4MjM3MzIxMjQwMjEiLCJpYXQiOjE2MDUxMzQwNzEsImV4cCI6MTYwNTIyMDQ3MX0.78jhutlR3t6N5mrx4sJrw3QEt2pJQ_42H6sOe2i4BuI"
  }
}

// Get /me information

export const getInfo = async () => {
  // try {
  //   const response = await axios.get(`${SERVER_URL}me`, authHeader);
  //   return response;
  // } catch (err) {
  //   console.error(err);
  // }
  try {
    const response = await api.get('/me');
    return response;
  } catch (err) {
    console.error(err);
  }
}

// API Client Service for GET request

export const getQuestions = async () => {
  try {
    const response = await axios.get(`${SERVER_URL}questions`);
    return response;
  } catch (e) {
    console.error(e)
  }
}

// POST request that returns the response so I can get the MongoDB-generated _id for the post, in case I would implement delete or update.
export const postQuestion = async (content: QuestionsInterface) => {
  try {
    console.log('function running')
    const response = await axios.post(`${SERVER_URL}questions`, content);
    return response;
  } catch (err) {
    console.error(err)
  }
}

// API Client Service for toggling the answer

export const toggleAnswerService = async (id: number, type:string) => {
  try {
    console.log('function running')
    const response = await axios.put(`${SERVER_URL}answered/${id}/${type}`);
    return response;
  } catch (err) {
    console.error(err)
  }
}