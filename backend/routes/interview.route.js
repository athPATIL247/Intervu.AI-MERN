import express from "express";
import { createInterview, getInterviewById, getLatestInterviews, getUserInterviews } from "../controllers/interview.controller.js";
import isAuthenticated from "../middlewares/auth.middleware.js";

const router = express.Router();

router.route("/my").get(isAuthenticated, getUserInterviews);
router.route("/latest").get(isAuthenticated, getLatestInterviews);
router.route("/create").post(createInterview);
router.route("/:id").get(isAuthenticated, getInterviewById);

export default router;