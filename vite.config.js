import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { configDotenv } from "dotenv";

// dotenv.config(); // Explicitly load .env file

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
});
