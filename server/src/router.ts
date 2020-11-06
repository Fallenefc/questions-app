import express from 'express';
import { getQuestions, postQuestion, toggleAnswered, updateQuestion } from './controllers/questions';
import { registerUser, userLogIn } from './controllers/users'

const router = express.Router();

// GET, POST Requests
router.get('/questions', getQuestions);
router.post('/questions', postQuestion);
router.put('/questions/:id', updateQuestion)
router.put('/answered/:id/:boo', toggleAnswered)

// USER Auth Routes
router.post('/signup', registerUser)
router.post('/login', userLogIn)

export default router;