class LoanApplication {
  constructor(applicantName, monthlyIncome, requestedAmount, tenorMonths, existingData = null) {
    if (existingData) {
      // Reconstruct from database
      this._id = existingData._id;
      this.id = existingData.applicationId;
      this.applicantName = existingData.applicantName;
      this.monthlyIncome = existingData.monthlyIncome;
      this.requestedAmount = existingData.requestedAmount;
      this.tenorMonths = existingData.tenorMonths;
      this.state = existingData.state;
      this.creditAssessmentResult = existingData.creditAssessmentResult;
      this.createdAt = existingData.createdAt;
      this.updatedAt = existingData.updatedAt;
    } else {
      // New application
      this.id = this.generateId();
      this.applicantName = applicantName;
      this.monthlyIncome = monthlyIncome;
      this.requestedAmount = requestedAmount;
      this.tenorMonths = tenorMonths;
      this.state = 'DRAFT';
      this.creditAssessmentResult = null;
      this.createdAt = new Date();
      
      this.validate();
    }
  }

  generateId() {
    return `LOAN-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  validate() {
    if (!this.applicantName || this.applicantName.trim().length === 0) {
      throw new Error('Applicant name is required');
    }
    if (this.monthlyIncome <= 0) {
      throw new Error('Monthly income must be greater than zero');
    }
    if (this.requestedAmount <= 0) {
      throw new Error('Requested loan amount must be greater than zero');
    }
    if (this.tenorMonths <= 0 || !Number.isInteger(this.tenorMonths)) {
      throw new Error('Tenor must be a positive integer');
    }
  }

  calculateMonthlyInstallment() {
    return this.requestedAmount / this.tenorMonths;
  }

  performCreditAssessment() {
    if (this.state !== 'DRAFT') {
      throw new Error('Credit assessment can only be performed on draft applications');
    }

    const monthlyInstallment = this.calculateMonthlyInstallment();
    const requiredIncome = monthlyInstallment * 3;
    const passed = this.monthlyIncome >= requiredIncome;

    this.creditAssessmentResult = {
      passed,
      monthlyInstallment,
      requiredIncome,
      actualIncome: this.monthlyIncome,
      assessedAt: new Date()
    };

    if (passed) {
      this.state = 'ASSESSMENT_PASSED';
    } else {
      this.state = 'REJECTED';
    }

    return this.creditAssessmentResult;
  }

  approve() {
    if (this.state !== 'ASSESSMENT_PASSED') {
      throw new Error('Only applications that passed credit assessment can be approved');
    }
    this.state = 'APPROVED';
  }

  reject() {
    if (this.state !== 'ASSESSMENT_PASSED') {
      throw new Error('Only applications that passed credit assessment can be manually rejected');
    }
    this.state = 'REJECTED';
  }

  toJSON() {
    return {
      id: this.id,
      applicantName: this.applicantName,
      monthlyIncome: this.monthlyIncome,
      requestedAmount: this.requestedAmount,
      tenorMonths: this.tenorMonths,
      state: this.state,
      creditAssessmentResult: this.creditAssessmentResult,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }

  toPersistence() {
    return {
      applicationId: this.id,
      applicantName: this.applicantName,
      monthlyIncome: this.monthlyIncome,
      requestedAmount: this.requestedAmount,
      tenorMonths: this.tenorMonths,
      state: this.state,
      creditAssessmentResult: this.creditAssessmentResult
    };
  }
}

export default LoanApplication;