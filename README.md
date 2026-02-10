# Loan Origination System

A modern, full-stack loan application management system designed to validate credit decision logic and workflow design. This application streamlines the loan origination process through automated credit assessment and clear approval workflows.

## Overview

This system provides a simplified yet robust loan origination module that allows financial institutions to:
- Process loan applications efficiently
- Perform automated credit assessments based on income-to-payment ratios
- Manage approval workflows with clear state transitions
- Maintain complete application history with persistent storage

## Key Features

### Loan Application Management
- **Application Creation**: Capture essential applicant information including name, monthly income, requested loan amount, and repayment tenor
- **Draft State**: All new applications start in a draft state for review and processing
- **Application Tracking**: Unique application IDs and timestamps for complete audit trails

### Automated Credit Assessment
- **Rule-Based Engine**: Implements a 3x income-to-installment ratio rule for credit worthiness
- **Binary Decision**: Clear pass/fail assessment outcomes
- **Automatic Rejection**: Applications failing credit assessment are automatically rejected
- **Transparent Results**: Detailed assessment breakdown showing required vs. actual income

### Approval Workflow
- **State-Driven Process**: Applications progress through clearly defined states (Draft → Assessment Passed → Approved/Rejected)
- **Controlled Transitions**: Only applications passing credit assessment can proceed to approval
- **Final Decisions**: Rejections are permanent and cannot be reversed
- **Business Rule Enforcement**: Domain logic prevents invalid state transitions

## Architecture

### Clean Architecture Principles
The system follows **Domain-Driven Design** with clear separation of concerns:

### Technology Stack

#### Frontend
- **React** - Component-based UI framework
- **Axios** - HTTP client for API communication
- **Vite** - Fast build tool and development server

#### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **Mongoose** - MongoDB object modeling
- **dotenv** - Environment configuration

#### Database
- **MongoDB** - NoSQL database for flexible document storage
- **MongoDB Atlas** - Cloud database service (optional)

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn package manager

### Installation

#### 1. Clone the Repository
```bash
git clone <repository-url>
cd loan-origination-system
```

#### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/loan-origination
NODE_ENV=development
```

For MongoDB Atlas:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/loan-origination?retryWrites=true&w=majority
```

#### 3. Frontend Setup
```bash
cd ../frontend
npm install
```

Create a `.env` file in the frontend directory:
```env
VITE_API_BASE_URL=http://localhost:8000/api
```

### Running the Application

#### Start MongoDB (if using local installation)
```bash
# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

#### Start Backend Server
```bash
cd backend
npm run dev
```
Server will run on `http://localhost:5000`

#### Start Frontend Application
```bash
cd frontend
npm start
```
Application will open at `http://localhost:3000`

## Usage Guide

### Creating a Loan Application
1. Navigate to the application homepage
2. Fill out the loan application form:
   - **Applicant Name**: Full name of the applicant
   - **Monthly Income**: Gross monthly income in dollars
   - **Requested Loan Amount**: Total amount requested
   - **Tenor**: Repayment period in months
3. Click "Create Application"
4. Application is created in **DRAFT** state

### Performing Credit Assessment
1. Locate the application in the list
2. Click "Perform Credit Assessment"
3. System calculates:
   - Monthly installment = Loan Amount ÷ Tenor
   - Required income = Monthly installment × 3
4. Decision is made:
   - **PASS**: If monthly income ≥ required income → State changes to **ASSESSMENT_PASSED**
   - **FAIL**: If monthly income < required income → State changes to **REJECTED**

### Approval/Rejection
- **For Passed Applications**:
  - Click "Approve" to finalize the loan → State: **APPROVED**
  - Click "Reject" to decline → State: **REJECTED**
- **Rejected applications** cannot be modified or re-assessed

## Business Rules

### Credit Assessment Rule
```
Monthly Income ≥ (Loan Amount ÷ Tenor Months) × 3
```

**Example:**
- Loan Amount: $12,000
- Tenor: 12 months
- Monthly Payment: $1,000
- Required Income: $3,000
- Applicant Income: $4,500
- **Result**: PASS



**Constraints:**
- Credit assessment can only be performed on **DRAFT** applications
- Approval/rejection can only be performed on **ASSESSMENT_PASSED** applications
- **REJECTED** state is final and irreversible



## API Endpoints

### Base URL
```
http://localhost:5000/api
```

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/applications` | Create new loan application |
| `GET` | `/applications` | Get all applications |
| `GET` | `/applications/:id` | Get specific application |
| `POST` | `/applications/:id/assess` | Perform credit assessment |
| `POST` | `/applications/:id/approve` | Approve application |
| `POST` | `/applications/:id/reject` | Reject application |

### Example Requests

#### Create Application
```bash
POST /api/applications
Content-Type: application/json

{
  "applicantName": "John Doe",
  "monthlyIncome": 5000,
  "requestedAmount": 10000,
  "tenorMonths": 12
}
```

#### Response
```json
{
  "success": true,
  "data": {
    "id": "LOAN-1707123456-abc123",
    "applicantName": "John Doe",
    "monthlyIncome": 5000,
    "requestedAmount": 10000,
    "tenorMonths": 12,
    "state": "DRAFT",
    "creditAssessmentResult": null,
    "createdAt": "2024-02-10T12:00:00.000Z"
  }
}
```

## Design Decisions

### Domain-Driven Design
- **Rich Domain Model**: Business logic encapsulated in `LoanApplication` class
- **Invariant Protection**: Domain objects validate their own state
- **Clear Boundaries**: Separation between domain, application, and infrastructure layers

### Object-Oriented Modeling
- **Encapsulation**: State and behavior bundled together
- **Single Responsibility**: Each class has one clear purpose
- **Open/Closed Principle**: Easy to extend without modifying existing code

### State Management
- **Finite State Machine**: Applications follow a predefined state flow
- **Immutable Transitions**: State changes are controlled and auditable
- **Business Rule Enforcement**: Invalid transitions are prevented at the domain level

## What's NOT Included

This is a pilot/MVP focused on core workflow validation. The following features are intentionally excluded:

- ❌ Loan disbursement processing
- ❌ Interest rate calculation
- ❌ Repayment schedule generation
- ❌ User authentication & authorization
- ❌ Role-based access control
- ❌ UI styling & advanced frontend features
- ❌ Email notifications
- ❌ Document upload functionality
- ❌ Credit score integration
- ❌ Multi-currency support

## 🧪 Testing

### Manual Testing Checklist

#### Happy Path
- [ ] Create application with valid data
- [ ] Perform credit assessment (should pass)
- [ ] Approve application
- [ ] Verify final state is APPROVED

#### Validation Tests
- [ ] Try creating application with negative income (should fail)
- [ ] Try creating application with empty name (should fail)
- [ ] Try creating application with zero loan amount (should fail)

#### Business Rule Tests
- [ ] Create application with insufficient income
- [ ] Perform assessment (should auto-reject)
- [ ] Verify state is REJECTED and can't be changed
- [ ] Try approving DRAFT application (should fail)
- [ ] Try assessing non-DRAFT application (should fail)

## Contributing

This is a demonstration project for loan workflow validation. For production use, consider adding:
- Unit tests (Jest, Mocha)
- Integration tests
- API documentation (Swagger/OpenAPI)
- Input sanitization
- Rate limiting
- Logging and monitoring
- Error tracking (Sentry)
- CI/CD pipeline

## License

This project is created for educational and demonstration purposes.

## 👥 Authors

[Your Name/Team]

## Acknowledgments

Built with modern web technologies to demonstrate clean architecture and domain-driven design principles in a financial services context.

---

**Note**: This is a pilot system designed to validate credit decision logic and workflow design before investing in a full-scale lending program. It focuses on domain integrity, clean object-oriented modeling, and correct enforcement of business rules rather than feature completeness.