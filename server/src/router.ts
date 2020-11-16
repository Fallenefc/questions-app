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
  studentGetFullExam,
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
router.get("/me", authMiddleware, getUserInfo);

//

// QUESTION BANK ROUTES

// Get, Post, Update and Delete questions. Pretty straight forward
router.get("/questions", authMiddleware, getQuestions);
router.post("/questions", authMiddleware, postQuestion);
router.put("/questions/:id", authMiddleware, updateQuestion);
router.delete("/questions/:id", authMiddleware, deleteQuestion);

//

// EXAM ROUTES (TEACHER)

// Exam itself routes: Get (all), Get(one), Create and Delete
router.get("/exams", authMiddleware, getExams);
router.get("/singleExam/:examId", authMiddleware, getFullExam);
router.post("/exams", authMiddleware, generateExam);
router.delete("/exams/:examId", authMiddleware, deleteAnExam);
router.post("/startExam", authMiddleware, fetchExamByHashedId);

// Modifying/Adding questions in an exam Routes
router.post("/addQuestion", authMiddleware, addQuestionToExam);
router.post("/deleteQuestion", authMiddleware, deleteQuestionFromExam);

// Generating Exam Routes
router.post("/generateExam", authMiddleware, generateAnExam);

//

// EXAM ROUTES (STUDENT)

// Fetch Exam, Finish Exam and
router.post("/finishExam", authMiddleware, studentFinishedExam);
router.get("/startExam/:id", authMiddleware, studentGetFullExam);

export default router;
