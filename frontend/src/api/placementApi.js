import api from './api';

export const getDisciplines = async () => {
    try {
        const response = await api.get('api/placement/disciplines');
        return response.data;
    } catch (error) {
        console.error('Error fetching disciplines:', error);
        return [];
    }
};

export const getYears = async () => {
    try {
        const response = await api.get('api/placement/years');
        return response.data;
    } catch (error) {
        console.error('Error fetching years:', error);
        return [];
    }
};

export const getPrograms = async () => {
    try {
        const response = await api.get('api/placement/programs');
        return response.data;
    } catch (error) {
        console.error('Error fetching programs:', error);
        return [];
    }
};

export const getEDA = async () => {
    try {
        const response = await api.get('api/placement/eda');
        return response.data;
    } catch (error) {
        console.error('Error fetching EDA data:', error);
        return null;
    }
};

export const getSummary = async () => {
    try {
        const response = await api.get('api/placement/summary');
        return response.data;
    } catch (error) {
        console.error('Error fetching summary:', error);
        return null;
    }
};

export const getYearlyTrends = async () => {
    try {
        const response = await api.get('/api/placement/yearly-trends');
        return response.data;
    } catch (error) {
        console.error('Error fetching yearly trends:', error);
        return [];
    }
};

export const getDisciplineComparison = async () => {
    try {
        const response = await api.get('api/placement/discipline-comparison');
        return response.data;
    } catch (error) {
        console.error('Error fetching discipline comparison:', error);
        return [];
    }
};

export const getProgramDistribution = async () => {
    try {
        const response = await api.get('api/placement/program-distribution');
        return response.data;
    } catch (error) {
        console.error('Error fetching program distribution:', error);
        return [];
    }
};

export const getPlacementMatrix = async () => {
    try {
        const response = await api.get('api/placement/placement-matrix');
        return response.data;
    } catch (error) {
        console.error('Error fetching placement matrix:', error);
        return [];
    }
};

export const getCTCTrends = async () => {
    try {
        const response = await api.get('api/placement/ctc-trends');
        return response.data;
    } catch (error) {
        console.error('Error fetching CTC trends:', error);
        return [];
    }
};

export const getStudentTrends = async () => {
    try {
        const response = await api.get('api/placement/student-trends');
        return response.data;
    } catch (error) {
        console.error('Error fetching student trends:', error);
        return [];
    }
};

export const predictCTC = async (year, discipline, placement) => {
    try {
        const response = await api.get('api/placement/predict-ctc', {
            params: { year, discipline, placement }
        });
        return response.data;
    } catch (error) {
        console.error('Error predicting CTC:', error);
        return { error: 'Failed to predict CTC' };
    }
};

export const predictPlacementRate = async (year, program, discipline) => {
    try {
        const response = await api.get('api/placement/predict-placement-rate', {
            params: { year, program, discipline }
        });
        return response.data;
    } catch (error) {
        console.error('Error predicting placement rate:', error);
        return { error: 'Failed to predict placement rate' };
    }
};

export const predictPlacementChance = async (cgpa, program, discipline, year) => {
    try {
        const response = await api.get('api/placement/predict-placement-chance', {
            params: { cgpa, program, discipline, year }
        });
        return response.data;
    } catch (error) {
        console.error('Error predicting placement chance:', error);
        return { error: 'Failed to predict placement chance' };
    }
};
