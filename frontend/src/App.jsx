import React, { useState, useEffect } from "react";
import LoanApplicationForm from "./components/LoanApplicationForm";
import LoanApplicationList from "./components/LoanApplicationList";
import { loanApplicationAPI } from "./services/api";

function App() {
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const fetchApplications = async () => {
    try {
      const response = await loanApplicationAPI.getAllApplications();
      setApplications(response.data.data);
    } catch (err) {
      setError("Failed to fetch applications");
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleApplicationCreated = async (formData) => {
    const response = await loanApplicationAPI.createApplication(formData);
    setSuccessMessage("Application created successfully!");
    setTimeout(() => setSuccessMessage(""), 3000);
    await fetchApplications();
    return response.data;
  };

  const handleAssess = async (id) => {
    try {
      await loanApplicationAPI.performCreditAssessment(id);
      setSuccessMessage("Credit assessment completed!");
      setTimeout(() => setSuccessMessage(""), 3000);
      await fetchApplications();
    } catch (err) {
      setError(err.response?.data?.error || "Assessment failed");
      setTimeout(() => setError(""), 3000);
    }
  };

  const handleApprove = async (id) => {
    try {
      await loanApplicationAPI.approveApplication(id);
      setSuccessMessage("Application approved!");
      setTimeout(() => setSuccessMessage(""), 3000);
      await fetchApplications();
    } catch (err) {
      setError(err.response?.data?.error || "Approval failed");
      setTimeout(() => setError(""), 3000);
    }
  };

  const handleReject = async (id) => {
    try {
      await loanApplicationAPI.rejectApplication(id);
      setSuccessMessage("Application rejected!");
      setTimeout(() => setSuccessMessage(""), 3000);
      await fetchApplications();
    } catch (err) {
      setError(err.response?.data?.error || "Rejection failed");
      setTimeout(() => setError(""), 3000);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-5">
      <h1 className="text-3xl font-bold mb-6">Loan Origination System</h1>

      {error && (
        <div className="mb-5 rounded border border-red-300 bg-red-100 px-4 py-2 text-red-800">
          {error}
        </div>
      )}

      {successMessage && (
        <div className="mb-5 rounded border border-green-300 bg-green-100 px-4 py-2 text-green-800">
          {successMessage}
        </div>
      )}

      <LoanApplicationForm onApplicationCreated={handleApplicationCreated} />

      <LoanApplicationList
        applications={applications}
        onAssess={handleAssess}
        onApprove={handleApprove}
        onReject={handleReject}
      />
    </div>
  );
}

export default App;
