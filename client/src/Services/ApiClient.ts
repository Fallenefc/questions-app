// API Client Service that makes the GET and the POST requests
import axios from 'axios'
import { SERVER_URL } from '../Environment'
import { QuestionsInterface } from '../Interfaces/Questions';

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

export const toggleAnswerService = async (id: number, type:string) => {
  try {
    console.log('function running')
    const response = await axios.put(`${SERVER_URL}answered/${id}/${type}`);
    return response;
  } catch (err) {
    console.error(err)
  }
}