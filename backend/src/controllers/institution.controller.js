const institutionService = require('../services/institution.service');
const AppError = require('../utils/AppError');

/**
 * POST /institutions
 * Creates an institution (SuperAdmin only)
 */
const createInstitution = async (req, res, next) => {
    try {
        const { name, code, address } = req.body;
        if (!name || !code) {
            return next(new AppError('Institution name and code are required.', 400));
        }

        const institution = await institutionService.createInstitution(req.user, {
            name, code, address,
        });

        return res.status(201).json({
            success: true,
            message: `Institution ${name} created successfully.`,
            data: institution,
        });
    } catch (err) { return next(err); }
};

/**
 * GET /institutions
 * Lists all institutions (SuperAdmin only)
 */
const getInstitutions = async (req, res, next) => {
    try {
        const institutions = await institutionService.getInstitutions();
        return res.status(200).json({ success: true, data: institutions });
    } catch (err) { return next(err); }
};

/**
 * PATCH /institutions/:id/toggle-status
 * Toggles an institution's active status. (SuperAdmin only)
 */
const toggleInstitutionStatus = async (req, res, next) => {
    try {
        const result = await institutionService.toggleInstitutionStatus(req.user, req.params.id);
        return res.status(200).json({ success: true, ...result });
    } catch (err) { return next(err); }
};

module.exports = { createInstitution, getInstitutions, toggleInstitutionStatus };

// © 2026 Syed Khubayb Ur Rahman
// GitHub: https://github.com/kh-ub-ayb
