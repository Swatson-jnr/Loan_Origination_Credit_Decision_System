//imports 
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import MongoLoanApplicationRepository from "./src/repositories/MongoLoanApplicationRepository.js";
import createLoanApplicationRoutes from "./src/routes/loanApplicationRoute.js";
import LoanApplicationController from "./src/controllers/LoanApplicationController.js";
import connectDB from "./src/config/db.js";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Initialize repository and controller with MongoDB
const repository = new MongoLoanApplicationRepository();
const controller = new LoanApplicationController(repository);

// Routes
app.use("/api", createLoanApplicationRoutes(controller));

// Health check
app.get("/health", (req, res) => {
  res.json({ 
    status: "ok",
    database: "connected"
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: 'Internal server error'
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
