import express from "express";
import cors from "cors";
import registerRoute from "./routes/register.js";

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", registerRoute);

app.get("/api/health", (req, res) => {
    res.json({ status: "Flowchain AI backend running" });
});

app.listen(5000, () => {
    console.log("Backend running on port 5000");
});
