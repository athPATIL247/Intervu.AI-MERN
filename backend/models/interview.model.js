import mongoose from "mongoose";

const interviewSchema = mongoose.Schema({
    coverImage: {type: String, default: "/logo.svg"},
    finalized: {type: Boolean, default: false},
    level: {type: String, required: true},
    questions: { type: [String], required: true, validate: [arr => arr.length > 0, 'At least one question is required'] },
    role: {type: String, required: true},
    techstack: [{type: String}],
    type: {type: String, enum: ["mixed","behavioral","technical"], default: "mixed"},
    createdBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
}, {timestamps: true})

export const Interview = mongoose.model('Interview',interviewSchema)