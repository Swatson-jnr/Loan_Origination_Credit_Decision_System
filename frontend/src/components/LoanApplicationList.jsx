import React from "react";

function LoanApplicationList({ applications, onAssess, onApprove, onReject }) {
  const getStateBadgeClass = (state) => {
    switch (state) {
      case "DRAFT":
        return "bg-gray-500";
      case "ASSESSMENT_PASSED":
        return "bg-green-600";
      case "APPROVED":
        return "bg-blue-600";
      case "REJECTED":
        return "bg-red-600";
      default:
        return "bg-gray-800";
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Loan Applications</h2>

      {applications.length === 0 ? (
        <p className="text-gray-600">No applications yet.</p>
      ) : (
        <div className="space-y-4">
          {applications.map((app) => (
            <div
              key={app.id}
              className="border border-gray-300 rounded-lg p-4 bg-gray-50"
            >
              {/* Header */}
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">
                  {app.applicantName}
                </h3>
                <span
                  className={`px-3 py-1 rounded text-white text-sm font-bold ${getStateBadgeClass(
                    app.state
                  )}`}
                >
                  {app.state}
                </span>
              </div>

              {/* Details */}
              <div className="mt-3 space-y-1 text-sm text-gray-800">
                <p>
                  <strong>Application ID:</strong> {app.id}
                </p>
                <p>
                  <strong>Monthly Income:</strong> ₵
                  {app.monthlyIncome.toFixed(2)}
                </p>
                <p>
                  <strong>Requested Amount:</strong> ₵
                  {app.requestedAmount.toFixed(2)}
                </p>
                <p>
                  <strong>Tenor:</strong> {app.tenorMonths} months
                </p>
                <p>
                  <strong>Monthly Installment:</strong> ₵
                  {(app.requestedAmount / app.tenorMonths).toFixed(2)}
                </p>
              </div>

              {/* Credit Assessment */}
              {app.creditAssessmentResult && (
                <div className="mt-3 p-3 bg-gray-200 rounded">
                  <h4 className="font-semibold mb-1">
                    Credit Assessment Result
                  </h4>
                  <p>
                    <strong>Status:</strong>{" "}
                    {app.creditAssessmentResult.passed
                      ? "PASSED"
                      : "FAILED"}
                  </p>
                  <p>
                    <strong>Required Income:</strong> ₵
                    {app.creditAssessmentResult.requiredIncome.toFixed(2)}
                  </p>
                  <p>
                    <strong>Actual Income:</strong> ₵
                    {app.creditAssessmentResult.actualIncome.toFixed(2)}
                  </p>
                </div>
              )}

              {/* Actions */}
              <div className="mt-4 flex gap-2">
                {app.state === "DRAFT" && (
                  <button
                    onClick={() => onAssess(app.id)}
                    className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded transition"
                  >
                    Perform Credit Assessment
                  </button>
                )}

                {app.state === "ASSESSMENT_PASSED" && (
                  <>
                    <button
                      onClick={() => onApprove(app.id)}
                      className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded transition"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => onReject(app.id)}
                      className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded transition"
                    >
                      Reject
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default LoanApplicationList;
