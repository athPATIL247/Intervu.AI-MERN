import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const API_KEY = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

const MODEL_PRIORITY = [
  "gemini-2.0-flash-001", // preferred model
  "gemini-pro",           // fallback 1
  "gemini-1.5-flash"      // fallback 2 (if available)
];

// Reusable function to generate questions with fallback logic
export const getQuestions = async ({ role, level = "Intermediate", techstack, type = "mixed", amount = 10 }) => {
  const prompt = `Prepare questions for a job interview.
            The job role is ${role}.
            The job experience level is ${level}.
            The tech stack used in the job is: ${Array.isArray(techstack) ? techstack.join(", ") : techstack}.
            The focus between behavioural and technical questions should lean towards: ${type}.
            The amount of questions required is: ${amount}.
            Please return only the questions, without any additional text.
            The questions are going to be read by a voice assistant so do not use "/" or "*" or any other special characters which might break the voice assistant.
            Return the questions formatted like this:
            ["Question 1", "Question 2", "Question 3"]

            Thank you! <3`;

  let lastError;
  for (const modelName of MODEL_PRIORITY) {
    try {
      const model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContent(prompt);
      const response = result.response;
      const text = response.text();
      const questions = JSON.parse(text);
      return questions;
    } catch (error) {
      lastError = error;
      // Only retry on 503 (Service Unavailable)
      if (error.status !== 503) throw error;
    }
  }
  // If all models fail, throw the last error
  throw lastError;
};

export const generateQuestions = async (req, res) => {
  const { role, level = "Intermediate", techstack, type = "mixed", amount = 10 } = req.body;
  try {
    const questions = await getQuestions({ role, level, techstack, type, amount });
    return res.status(201).json({
      success: true,
      message: "Questions generated successfully",
      questions
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Questions generation failed"
    });
  }
};
