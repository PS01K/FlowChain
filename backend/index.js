// Load configuration FIRST
import { config } from "./config.js";

import express from "express";
import cors from "cors";
import mongoose from "mongoose";

// Now import routes
import registerRoute from "./routes/register.js";
import dashboardRoute from "./routes/dashboard.js";
import analyzeRoute from "./routes/analyze.js";
import queryRoute from "./routes/query.js";

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
const connectDB = async () => {
    try {
        const mongoURI = config.MONGODB_URI || 'mongodb://localhost:27017/flowchain_ai';
        await mongoose.connect(mongoURI);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

connectDB();

// Routes
app.use("/api", registerRoute);
app.use("/api/dashboard", dashboardRoute);
app.use("/api/analyze", analyzeRoute);
app.use("/api/query", queryRoute);

app.get("/api/health", (req, res) => {
    res.json({ status: "Flowchain AI backend running" });
});

app.listen(5000, () => {
    console.log("Backend running on port 5000");
});
