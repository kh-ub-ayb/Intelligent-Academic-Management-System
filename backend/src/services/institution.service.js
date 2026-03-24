const Institution = require('../models/Institution.model');
const AuditLog = require('../models/AuditLog.model');
const AppError = require('../utils/AppError');

/**
 * Creates a new institution
 */
const createInstitution = async (creatorPayload, institutionData) => {
    const { name, code, address } = institutionData;
    
    // Check if code already exists
    const existing = await Institution.findOne({ code: code.toUpperCase() });
    if (existing) throw new AppError(`Institution with code ${code} already exists.`, 409);

    const institution = await Institution.create({
        name,
        code,
        address
    });

    // Write audit log
    await AuditLog.create({
        action: 'INSTITUTION_CREATED',
        performedBy: creatorPayload.userId,
        performedByRole: creatorPayload.role,
        targetUser: creatorPayload.userId, // System-level action, target self
        targetUserRole: creatorPayload.role,
        meta: {
            institutionId: institution._id,
            institutionName: institution.name,
            institutionCode: institution.code
        },
    });

    return institution;
};

/**
 * Fetch all institutions
 */
const getInstitutions = async () => {
    // Only SuperAdmin hits this route, can see all
    return Institution.find().sort({ createdAt: -1 });
};

/**
 * Toggle active status of an institution
 */
const toggleInstitutionStatus = async (callerPayload, institutionId) => {
    const institution = await Institution.findById(institutionId);
    if (!institution) throw new AppError('Institution not found.', 404);

    institution.isActive = !institution.isActive;
    await institution.save();

    await AuditLog.create({
        action: institution.isActive ? 'INSTITUTION_REACTIVATED' : 'INSTITUTION_DEACTIVATED',
        performedBy: callerPayload.userId,
        performedByRole: callerPayload.role,
        targetUser: callerPayload.userId, // System level action
        targetUserRole: callerPayload.role,
        meta: { 
            institutionId: institution._id,
            institutionName: institution.name
        },
    });

    return { 
        message: `Institution ${institution.name} has been ${institution.isActive ? 'reactivated' : 'deactivated'}.`,
        institution
    };
};

module.exports = { createInstitution, getInstitutions, toggleInstitutionStatus };

// © 2026 Syed Khubayb Ur Rahman
// GitHub: https://github.com/kh-ub-ayb
