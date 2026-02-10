import express from 'express';

function createLoanApplicationRoutes(controller) {
  const router = express.Router();

  router.post('/applications', async (req, res) => await controller.createApplication(req, res));
  router.get('/applications', async (req, res) => await controller.getAllApplications(req, res));
  router.get('/applications/:id', async (req, res) => await controller.getApplicationById(req, res));
  router.post('/applications/:id/assess', async (req, res) => await controller.performCreditAssessment(req, res));
  router.post('/applications/:id/approve', async (req, res) => await controller.approveApplication(req, res));
  router.post('/applications/:id/reject', async (req, res) => await controller.rejectApplication(req, res));

  return router;
}

export default createLoanApplicationRoutes;