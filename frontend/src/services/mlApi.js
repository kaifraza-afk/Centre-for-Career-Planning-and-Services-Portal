const BASE = import.meta.env.VITE_ML_API_URL || 'http://localhost:3000/api/ml';

const get = (path, params = {}) => {
  const qs = new URLSearchParams(params).toString();
  return fetch(`${BASE}${path}${qs ? '?' + qs : ''}`).then(r => r.json());
};

export const fetchEDA          = ()              => get('/eda');
export const fetchDisciplines  = ()              => get('/disciplines');
export const fetchPrograms     = ()              => get('/programs');
export const fetchYears        = ()              => get('/years');

export const predictCTC = (year, discipline, placement) =>
  get('/predict-ctc', { year, discipline, placement });

export const predictPlacementRate = (year, program, discipline) =>
  get('/predict-placement-rate', { year, program, discipline });

export const predictPlacementChance = (cgpa, program, discipline, year) =>
  get('/predict-placement-chance', { cgpa, program, discipline, year });