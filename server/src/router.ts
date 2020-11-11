import express from 'express';
import { getQuestions, postQuestion, updateQuestion } from './controllers/questions';
import { registerUser, userLogIn } from './controllers/users'
import authMiddleware from './middleware/auth';

const router = express.Router();

// USER Auth Routes
router.post('/signup', registerUser); // ok!
router.post('/login', userLogIn); // ok!
router.post('/forgotPassword', () => console.log('I am placeholder'));
router.post('/resetPassword', () => console.log('I am placeholder'));
router.post('/logout', () => console.log('I am placeholder'));

// QUESTION BANK ROUTES
router.get('/questions', authMiddleware, getQuestions); // ok!
router.post('/questions', authMiddleware, postQuestion); // ok!
router.put('/questions/:id', authMiddleware, updateQuestion); // not made yet
router.delete('/questions/:id', authMiddleware, () => console.log('I am placeholder'));

// EXAM ROUTES
// create a verify route
router.post('/exams', () => console.log('I am placeholder'));
router.get('/exams', () => console.log('I am placeholder'));
router.put('/exams', () => console.log('I am placeholder'));
router.delete('/exams', () => console.log('I am placeholder'));
// Exam results
router.get('/results', () => console.log('I am placeholder'));

export default router;