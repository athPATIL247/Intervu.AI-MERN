import express from "express";
import { createInterview, getInterviewById, getLatestInterviews, getUserInterviews } from "../controllers/interview.controller.js";

const router = express.Router();

router.route("/my").get(getUserInterviews);
router.route("/latest").get(getLatestInterviews);
router.route("/create").post(createInterview);
router.route("/:id").get(getInterviewById);

export default router;