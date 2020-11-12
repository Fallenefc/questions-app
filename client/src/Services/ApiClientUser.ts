// API Client Service that makes the GET and the POST requests
// import axios from 'axios'
// import { SERVER_URL } from '../Environment'
// import { QuestionsInterface } from '../Interfaces/Questions';
import api from './AxiosConfig';

// const authHeader = {
//   headers: {
//     'authorization': "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmFjNTY3ODFlMjU4MjM3MzIxMjQwMjEiLCJpYXQiOjE2MDUxMzQwNzEsImV4cCI6MTYwNTIyMDQ3MX0.78jhutlR3t6N5mrx4sJrw3QEt2pJQ_42H6sOe2i4BuI"
//   }
// }

export const logIn = async (username: string, password: string) => {
  try {
    const response: any = await api.post('/login', {
      username: username,
      password: password
    });
    return response;
  } catch (err) {
    console.error(err);
  }
}
