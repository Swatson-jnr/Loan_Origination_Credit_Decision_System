import axios from "axios";


const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const loanApplicationAPI = {
  createApplication: (data) => api.post("/applications", data),
  getAllApplications: () => api.get("/applications"),
  getApplicationById: (id) => api.get(`/applications/${id}`),
  performCreditAssessment: (id) => api.post(`/applications/${id}/assess`),
  approveApplication: (id) => api.post(`/applications/${id}/approve`),
  rejectApplication: (id) => api.post(`/applications/${id}/reject`),
};
