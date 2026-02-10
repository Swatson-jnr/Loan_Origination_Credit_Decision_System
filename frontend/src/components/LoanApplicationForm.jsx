import React, { useState } from "react";

function LoanApplicationForm({ onApplicationCreated }) {
  const [formData, setFormData] = useState({
    applicantName: "",
    monthlyIncome: "",
    requestedAmount: "",
    tenorMonths: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    // validate against number so that we don have users inputing weird names and number
    if (name === "applicantName") {
      const regex = /^[A-Za-z\s]*$/;
      if (!regex.test(value)) return;
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await onApplicationCreated(formData);
      setFormData({
        applicantName: "",
        monthlyIncome: "",
        requestedAmount: "",
        tenorMonths: "",
      });
    } catch (err) {
      setError(err.response?.data?.error || "Failed to create application");
    }
  };

  return (
    <div className="p-5 border border-gray-300 rounded-lg mb-5 bg-white">
      <h2 className="text-2xl font-semibold mb-4">Create Loan Application</h2>

      {error && <div className="mb-3 text-red-600 font-medium">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Applicant Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Applicant Name
          </label>
          <input
            type="text"
            name="applicantName"
            value={formData.applicantName}
            onChange={handleChange}
            required
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Monthly Income */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Monthly Income
          </label>
          <input
            type="number"
            name="monthlyIncome"
            value={formData.monthlyIncome}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Requested Amount */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Requested Loan Amount
          </label>
          <input
            type="number"
            name="requestedAmount"
            value={formData.requestedAmount}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Tenor */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Tenor (Months)
          </label>
          <input
            type="number"
            name="tenorMonths"
            value={formData.tenorMonths}
            onChange={handleChange}
            required
            min="1"
            step="1"
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="mt-2 px-5 py-2 bg-blue-600 hover:bg-blue-700
                     text-white font-medium rounded transition"
        >
          Create Application
        </button>
      </form>
    </div>
  );
}

export default LoanApplicationForm;
