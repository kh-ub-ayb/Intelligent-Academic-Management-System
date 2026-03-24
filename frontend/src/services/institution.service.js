import api from './api';

export const institutionService = {
    getInstitutions: async () => {
        const res = await api.get('/institutions');
        return res.data;
    },

    createInstitution: async (institutionData) => {
        const res = await api.post('/institutions', institutionData);
        return res.data;
    },

    toggleInstitutionStatus: async (institutionId) => {
        const res = await api.patch(`/institutions/${institutionId}/toggle-status`);
        return res.data;
    }
};

// © 2026 Syed Khubayb Ur Rahman
// GitHub: https://github.com/kh-ub-ayb
