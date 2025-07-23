import express from "express";
import { generateFeedback, getFeedbackById, getFeedbackByInterviewAndUser } from "../controllers/feedback.controller.js";

const router = express.Router();

router.post('/', generateFeedback);
router.get('/:id', getFeedbackById);
router.get('/', getFeedbackByInterviewAndUser);

export default router;