import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { connectDB } from "./utils/connect.js";
import authRoute from "./routes/auth.route.js"
import intRoute from "./routes/interview.route.js"
import gemRoute from "./routes/gemini.route.js"
import feedbackRoute from "./routes/feedback.route.js"
import isAuthenticated from "./middlewares/auth.middleware.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8007;

app.get("/", (req,res) => res.status(200).json({
    message: "Backend Activated",
    success: true
}))

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(urlencoded({ extended: true }));
// app.use(cors({
//     origin: 'http://localhost:5173',
//     credentials: true
// }));

const allowedOrigins = [
  "https://dashboard.vapi.ai",
  "http://localhost:5173"
];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps, curl, etc.)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true // if you use cookies or authentication
}));

// APIs
app.use("/api/auth",authRoute);
app.use("/api/interview",intRoute);
app.use("/api/gemini",isAuthenticated,gemRoute);
app.use("/api/feedback", feedbackRoute);

app.listen(PORT, () => {
    connectDB(process.env.MONGO_URI);
    console.log(`Server started at PORT ${PORT}`);
})