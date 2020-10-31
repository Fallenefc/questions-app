import express from 'express';
import { getQuestions, postQuestion } from './controllers/questions';

const router = express.Router();

// GET, POST Requests
router.get('/questions', getQuestions);
router.post('/questions', postQuestion);

export default router;