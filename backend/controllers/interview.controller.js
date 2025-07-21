import { Interview } from "../models/interview.model.js";
import { generateQuestions } from "./gemini.controller.js";

export const getUserInterviews = async (req, res) => {
  try {
    const userId = req.id;
    const interviews = await Interview.find({ createdBy: userId });

    return res.status(200).json({
      success: true,
      message: "User interviews fetched successfully",
      myInterviews: interviews,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch user interviews",
    });
  }
};

export const getLatestInterviews = async (req, res) => {
  try {
    const userId = req.id;
    const interviews = await Interview.find({ createdBy: { $ne: userId } })
      .sort({ createdAt: -1 })
      .limit(10);

    return res.status(200).json({
      success: true,
      message:
        "Latest interviews (excluding current user) fetched successfully",
      latestInterviews: interviews,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error fetching latest interviews",
    });
  }
};

export const createInterview = async (req, res) => {
  try {
    const userId = req.id;
    const { coverImage, finalized, level, role, techstack, type, questions } = req.body;

    if (!level || !questions || !role)
      return res.status(401).json({
        success: false,
        message: "All questions must be answered to create an interview",
      });

    const interview = await Interview.create({
      coverImage,
      finalized,
      level,
      questions,
      role,
      techstack,
      type,
      createdBy: userId,
    });

    return res.status(201).json({
      success: true,
      message: "Interview Created Successfully",
      interview,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to create interview",
    });
  }
};

export const getInterviewById = async (req, res) => {
  try {
    const interview = await Interview.findById(req.params.id);
    if (!interview)
      return res.status(400).json({
        success: false,
        message: "No such interview exists",
      });
    return res.status(200).json({
      success: true,
      message: "Interview fetched successfully",
      interview,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch the interview",
    });
  }
};
