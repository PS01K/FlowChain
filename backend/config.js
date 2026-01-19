import dotenv from "dotenv";

// Load environment variables immediately
dotenv.config({ path: './.env' });

export const config = {
  MONGODB_URI: process.env.MONGODB_URI,
  GEMINI_API_KEY: process.env.GEMINI_API_KEY,
};