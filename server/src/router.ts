import express from "express";
import {
  addQuestionToExam,
  deleteAnExam,
  deleteQuestionFromExam,
  fetchExamByHashedId,
  generateAnExam,
  generateExam,
  getExams,
  getFullExam,
  studentFinishedExam,
} from "./controllers/exams";
import {
  deleteQuestion,
  getQuestions,
  postQuestion,
  updateQuestion,
} from "./controllers/questions";
import {
  forgotPassword,
  getUserInfo,
  registerUser,
  resetPassword,
  userLogIn,
} from "./controllers/users";
import authMiddleware from "./middleware/auth";

const router = express.Router();

// USER Auth Routes
// Login and Signup
router.post("/signup", registerUser);
router.post("/login", userLogIn);

// Forgot password, Reset Password, Logout
router.post("/forgotPassword", forgotPassword);
router.post("/resetPassword", resetPassword);
// router.post("/logout", () => console.log("I am placeholder")); // this wont do anything for now, but I will destroy the token on the client side
router.get("/me", authMiddleware, getUserInfo);

// QUESTION BANK ROUTES
// Get, Post, Update and Delete questions. Pretty straight forward
router.get("/questions", authMiddleware, getQuestions);
router.post("/questions", authMiddleware, postQuestion);
router.put("/questions/:id", authMiddleware, updateQuestion);
router.delete("/questions/:id", authMiddleware, deleteQuestion);

// EXAM ROUTES
// Exam itself routes: Get (all), Get(one), Create and Delete
router.get("/exams", authMiddleware, getExams);
router.get("/singleExam/:examId", authMiddleware, getFullExam);
router.post("/exams", authMiddleware, generateExam);
router.delete("/exams/:examId", authMiddleware, deleteAnExam);


// Modifying/Adding questions in an exam Routes
router.post("/addQuestion", authMiddleware, addQuestionToExam);
router.post("/deleteQuestion", authMiddleware, deleteQuestionFromExam);
router.get("/results", () => console.log("I am placeholder"));

// Generating Exam Routes
router.post("/generateExam", authMiddleware, generateAnExam); // This will set submitted to true
// Makes a GET request without the answers so front end only knows the questions with title, stem and options
router.post('/startExam', authMiddleware, fetchExamByHashedId);
// Make a POST request to submit the completed exam, calculates the score, add score and done on the exam object
router.post('/finishExam', authMiddleware, studentFinishedExam);
// Also returns JSON with the score

export default router;
