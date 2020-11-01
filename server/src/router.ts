import express from 'express';
import { getQuestions, postQuestion, toggleAnswered, updateQuestion } from './controllers/questions';

const router = express.Router();

// GET, POST Requests
router.get('/questions', getQuestions);
router.post('/questions', postQuestion);
router.put('/questions/:id', updateQuestion)
router.put('/answered/:id', toggleAnswered)

export default router;