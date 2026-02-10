import LoanApplicationModel from '../models/LoanApplicationModel.js';
import LoanApplication from '../domain/LoanApplication.js';

class MongoLoanApplicationRepository {
  async save(loanApplication) {
    try {
      const persistenceData = loanApplication.toPersistence();
      
      // Check if application already exists
      const existing = await LoanApplicationModel.findOne({ 
        applicationId: persistenceData.applicationId 
      });

      let savedDoc;
      if (existing) {
        // Update existing
        savedDoc = await LoanApplicationModel.findOneAndUpdate(
          { applicationId: persistenceData.applicationId },
          persistenceData,
          { new: true, runValidators: true }
        );
      } else {
        // Create new
        savedDoc = await LoanApplicationModel.create(persistenceData);
      }

      return new LoanApplication(null, null, null, null, savedDoc);
    } catch (error) {
      throw new Error(`Failed to save loan application: ${error.message}`);
    }
  }

  async findById(id) {
    try {
      const doc = await LoanApplicationModel.findOne({ applicationId: id });
      if (!doc) {
        return null;
      }
      return new LoanApplication(null, null, null, null, doc);
    } catch (error) {
      throw new Error(`Failed to find loan application: ${error.message}`);
    }
  }

  async findAll() {
    try {
      const docs = await LoanApplicationModel.find().sort({ createdAt: -1 });
      return docs.map(doc => new LoanApplication(null, null, null, null, doc));
    } catch (error) {
      throw new Error(`Failed to fetch loan applications: ${error.message}`);
    }
  }

  async exists(id) {
    try {
      const count = await LoanApplicationModel.countDocuments({ applicationId: id });
      return count > 0;
    } catch (error) {
      throw new Error(`Failed to check loan application existence: ${error.message}`);
    }
  }

  async findByState(state) {
    try {
      const docs = await LoanApplicationModel.find({ state }).sort({ createdAt: -1 });
      return docs.map(doc => new LoanApplication(null, null, null, null, doc));
    } catch (error) {
      throw new Error(`Failed to find applications by state: ${error.message}`);
    }
  }

  async deleteById(id) {
    try {
      const result = await LoanApplicationModel.deleteOne({ applicationId: id });
      return result.deletedCount > 0;
    } catch (error) {
      throw new Error(`Failed to delete loan application: ${error.message}`);
    }
  }
}

export default MongoLoanApplicationRepository;