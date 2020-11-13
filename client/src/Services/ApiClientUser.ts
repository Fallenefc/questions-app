// API Client Service that makes the GET and the POST requests
// import axios from 'axios'
// import { SERVER_URL } from '../Environment'
// import { QuestionsInterface } from '../Interfaces/Questions';
import api from './AxiosConfig';

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

export const signUp = async (user: any) => {
  try {
    await api.post('/signup', user);
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}