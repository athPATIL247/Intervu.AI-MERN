import mongoose from "mongoose";

const feedbackSchema = mongoose.Schema({
    interviewId: {type: mongoose.Schema.Types.ObjectId, ref: 'Interview'},
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    totalScore: {type: Number, required: true},
    categoryScores: {type: Object, default: {communicationSkills:50,technicalKnowledge:50,problemSolving:50,culturalFit:50, confidenceClarity: 50}},
    strengths: [{type: String}],
    areasForImrpovement: [{type: String}],
    finalAssessment: {type: String}
})

export const Feedback = mongoose.model('Feedback',feedbackSchema);