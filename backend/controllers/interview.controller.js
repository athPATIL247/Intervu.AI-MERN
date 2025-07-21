import { Interview } from "../models/interview.model.js";
import { getQuestions } from "./gemini.controller.js";

// Normalization function for type
function normalizeType(type) {
  if (!type) return "mixed";
  const t = type.toLowerCase();
  if (t.includes("technical")) return "technical";
  if (t.includes("behavioral")) return "behavioral";
  if (t.includes("mixed")) return "mixed";
  return "mixed"; // fallback
}

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
      .limit(10)
      .select("coverImage createdAt finalized level role techstack type");

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
    console.log(req.body);
    const {
      coverImage,
      finalized,
      level,
      role,
      techstack,
      type,
      userid,
      amount,
    } = req.body;
    if (!level || !role)
      return res.status(401).json({
        success: false,
        message: "All questions must be answered to create an interview",
      });

    // Robust normalization for type
    const normalizedType = normalizeType(type);

    // Use getQuestions directly instead of HTTP request
    const questions = await getQuestions({
      role,
      level,
      techstack,
      type: normalizedType,
      amount,
    });
    if (!questions) {
      console.log("failed fetching questions from gemini");
      return res.status(500).json({
        success: false,
        message: "Gemini failure",
      });
    }

    const interview = await Interview.create({
      coverImage,
      finalized,
      level,
      questions,
      role,
      techstack,
      type: normalizedType,
      createdBy: userid,
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
    const interview = await Interview.findById(req.params.id).select("coverImage createdAt finalized level role techstack type questions");;
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
