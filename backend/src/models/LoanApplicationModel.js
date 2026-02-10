import mongoose from "mongoose";

const creditAssessmentSchema = new mongoose.Schema(
  {
    passed: {
      type: Boolean,
      required: true,
    },
    monthlyInstallment: {
      type: Number,
      required: true,
    },
    requiredIncome: {
      type: Number,
      required: true,
    },
    actualIncome: {
      type: Number,
      required: true,
    },
    assessedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false },
);

const loanApplicationSchema = new mongoose.Schema(
  {
    applicationId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    applicantName: {
      type: String,
      required: true,
      trim: true,
    },
    monthlyIncome: {
      type: Number,
      required: true,
      min: 0,
    },
    requestedAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    tenorMonths: {
      type: Number,
      required: true,
      min: 1,
    },
    state: {
      type: String,
      enum: ["DRAFT", "ASSESSMENT_PASSED", "APPROVED", "REJECTED"],
      default: "DRAFT",
      required: true,
    },
    creditAssessmentResult: {
      type: creditAssessmentSchema,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

// Indexes for common queries
loanApplicationSchema.index({ state: 1 });
loanApplicationSchema.index({ createdAt: -1 });
loanApplicationSchema.index({ applicantName: 1 });

const LoanApplicationModel = mongoose.model(
  "LoanApplication",
  loanApplicationSchema,
);

export default LoanApplicationModel;
