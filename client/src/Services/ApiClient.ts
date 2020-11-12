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
  }
}

// // API Client Service for GET request

// export const getQuestions = async () => {
//   try {
//     const response = await axios.get(`${SERVER_URL}questions`);
//     return response;
//   } catch (e) {
//     console.error(e)
//   }
// }

// // POST request that returns the response so I can get the MongoDB-generated _id for the post, in case I would implement delete or update.
// export const postQuestion = async (content: QuestionsInterface) => {
//   try {
//     console.log('function running')
//     const response = await axios.post(`${SERVER_URL}questions`, content);
//     return response;
//   } catch (err) {
//     console.error(err)
//   }
// }

// // API Client Service for toggling the answer

// export const toggleAnswerService = async (id: number, type:string) => {
//   try {
//     console.log('function running')
//     const response = await axios.put(`${SERVER_URL}answered/${id}/${type}`);
//     return response;
//   } catch (err) {
//     console.error(err)
//   }
// }