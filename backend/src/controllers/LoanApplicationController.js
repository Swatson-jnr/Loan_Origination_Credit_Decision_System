import LoanApplication from '../domain/LoanApplication.js';

class LoanApplicationController {
  constructor(repository) {
    this.repository = repository;
  }

  async createApplication(req, res) {
    try {
      const { applicantName, monthlyIncome, requestedAmount, tenorMonths } = req.body;

      const loanApplication = new LoanApplication(
        applicantName,
        parseFloat(monthlyIncome),
        parseFloat(requestedAmount),
        parseInt(tenorMonths)
      );

      const saved = await this.repository.save(loanApplication);

      res.status(201).json({
        success: true,
        data: saved.toJSON()
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error.message
      });
    }
  }

  async performCreditAssessment(req, res) {
    try {
      const { id } = req.params;
      const loanApplication = await this.repository.findById(id);

      if (!loanApplication) {
        return res.status(404).json({
          success: false,
          error: 'Loan application not found'
        });
      }

      const result = loanApplication.performCreditAssessment();
      const saved = await this.repository.save(loanApplication);

      res.json({
        success: true,
        data: {
          application: saved.toJSON(),
          assessmentResult: result
        }
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error.message
      });
    }
  }

  async approveApplication(req, res) {
    try {
      const { id } = req.params;
      const loanApplication = await this.repository.findById(id);

      if (!loanApplication) {
        return res.status(404).json({
          success: false,
          error: 'Loan application not found'
        });
      }

      loanApplication.approve();
      const saved = await this.repository.save(loanApplication);

      res.json({
        success: true,
        data: saved.toJSON()
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error.message
      });
    }
  }

  async rejectApplication(req, res) {
    try {
      const { id } = req.params;
      const loanApplication = await this.repository.findById(id);

      if (!loanApplication) {
        return res.status(404).json({
          success: false,
          error: 'Loan application not found'
        });
      }

      loanApplication.reject();
      const saved = await this.repository.save(loanApplication);

      res.json({
        success: true,
        data: saved.toJSON()
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error.message
      });
    }
  }

  async getAllApplications(req, res) {
    try {
      const applications = await this.repository.findAll();
      res.json({
        success: true,
        data: applications.map(app => app.toJSON())
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  async getApplicationById(req, res) {
    try {
      const { id } = req.params;
      const loanApplication = await this.repository.findById(id);

      if (!loanApplication) {
        return res.status(404).json({
          success: false,
          error: 'Loan application not found'
        });
      }

      res.json({
        success: true,
        data: loanApplication.toJSON()
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }
}

export default LoanApplicationController;