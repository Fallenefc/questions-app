import express from "express";
import { generateExam, getExams } from "./controllers/exams";
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
router.post("/signup", registerUser); // ok!
router.post("/login", userLogIn); // ok!
router.post("/forgotPassword", forgotPassword); // ok!
router.post("/resetPassword", resetPassword); // ok!
router.post("/logout", () => console.log("I am placeholder")); // this wont do anything for now, but I will destroy the token on the client side
router.get("/me", authMiddleware, getUserInfo);

// QUESTION BANK ROUTES
router.get("/questions", authMiddleware, getQuestions); // ok!
router.post("/questions", authMiddleware, postQuestion); // ok!
router.put("/questions/:id", authMiddleware, updateQuestion); // ok!
router.delete("/questions/:id", authMiddleware, deleteQuestion); // ok!

// EXAM ROUTES
// create a verify route
router.post("/exams", authMiddleware, generateExam); // this will create an exam (empty)
router.post('/addQuestion', authMiddleware, () => console.log("I am placeholder")) // this will add a question to the exam
router.delete('/deleteQuestion', authMiddleware, () => console.log("I am placeholder")) // this will delete a question from the exam
router.post('/generateExam', authMiddleware, () => console.log("I am placeholder")) // this will generate an exam after all the questions are added

router.get("/exams", authMiddleware, getExams); // ok
router.delete("/exams", () => console.log("I am placeholder")); // this will delete question from exam
// Exam results
// must create a POST route that sends the completed exam?
router.get("/results", () => console.log("I am placeholder"));

export default router;
