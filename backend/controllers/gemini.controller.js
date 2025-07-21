import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const API_KEY = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

export const generateQuestions = async (req, res) => {
  const {role, level, techstack, type, amount} = req.body;
  try {
    const prompt = `Prepare questions for a job interview.
            The job role is ${role}.
            The job experience level is ${level}.
            The tech stack used in the job is: ${techstack.join(", ")}.
            The focus between behavioural and technical questions should lean towards: ${type}.
            The amount of questions required is: ${amount}.
            Please return only the questions, without any additional text.
            The questions are going to be read by a voice assistant so do not use "/" or "*" or any other special characters which might break the voice assistant.
            Return the questions formatted like this:
            ["Question 1", "Question 2", "Question 3"]

            Thank you! <3`;

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-001" });
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    const questions = JSON.parse(text);

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
