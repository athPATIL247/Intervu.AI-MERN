import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { connectDB } from "./utils/connect.js";
import authRoute from "./routes/auth.route.js"
import intRoute from "./routes/interview.route.js"
import gemRoute from "./routes/gemini.route.js"
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
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

// APIs
app.use("/api/auth",authRoute);
app.use("/api/interview",isAuthenticated,intRoute);
app.use("/api/gemini",isAuthenticated,gemRoute);

app.listen(PORT, () => {
    connectDB(process.env.MONGO_URI);
    console.log(`Server started at PORT ${PORT}`);
})