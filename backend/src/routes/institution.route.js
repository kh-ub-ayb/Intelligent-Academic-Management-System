const express = require('express');
const router = express.Router();
const institutionCtrl = require('../controllers/institution.controller');
const authenticate = require('../middlewares/authenticate');
const allowRoles = require('../middlewares/allowRoles');

// All institution routes require authentication and SuperAdmin role
router.use(authenticate);
router.use(allowRoles('SuperAdmin'));

// ─── Create Institution ───────────────────────────────────────────────────────
router.post('/', institutionCtrl.createInstitution);

// ─── List Institutions ────────────────────────────────────────────────────────
router.get('/', institutionCtrl.getInstitutions);

// ─── Toggle Institution Status ───────────────────────────────────────────────
router.patch('/:id/toggle-status', institutionCtrl.toggleInstitutionStatus);

module.exports = router;

// © 2026 Syed Khubayb Ur Rahman
// GitHub: https://github.com/kh-ub-ayb
