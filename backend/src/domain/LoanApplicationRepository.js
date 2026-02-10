class LoanApplicationRepository {
  constructor() {
    this.applications = new Map();
  }

  save(loanApplication) {
    this.applications.set(loanApplication.id, loanApplication);
    return loanApplication;
  }

  findById(id) {
    return this.applications.get(id);
  }

  findAll() {
    return Array.from(this.applications.values());
  }

  exists(id) {
    return this.applications.has(id);
  }
}

export default LoanApplicationRepository;
