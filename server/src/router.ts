import express from 'express';
import { deleteQuestion, getQuestions, postQuestion, updateQuestion } from './controllers/questions';
import { forgotPassword, registerUser, resetPassword, userLogIn } from './controllers/users'
import authMiddleware from './middleware/auth';

const router = express.Router();

// USER Auth Routes
router.post('/signup', registerUser); // ok!
router.post('/login', userLogIn); // ok!
router.post('/forgotPassword', forgotPassword);
router.post('/resetPassword', resetPassword);
router.post('/logout', () => console.log('I am placeholder'));
// create a me route?

// QUESTION BANK ROUTES
router.get('/questions', authMiddleware, getQuestions); // ok!
router.post('/questions', authMiddleware, postQuestion); // ok!
router.put('/questions/:id', authMiddleware, updateQuestion); // ok!
router.delete('/questions/:id', authMiddleware, deleteQuestion); // ok!

// EXAM ROUTES
// create a verify route
router.post('/exams', () => console.log('I am placeholder'));
router.get('/exams', () => console.log('I am placeholder'));
router.put('/exams', () => console.log('I am placeholder')); // this is the create exam route
router.delete('/exams', () => console.log('I am placeholder'));
// Exam results
// must create a POST route that sends the completed exam?
router.get('/results', () => console.log('I am placeholder'));

export default router;