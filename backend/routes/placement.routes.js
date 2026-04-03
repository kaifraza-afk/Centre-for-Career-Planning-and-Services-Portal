import express from 'express';
import fetch from 'node-fetch';

const router = express.Router();

const ML_API_URL = process.env.ML_API_URL || 'http://localhost:5001';

async function proxyToMLApi(endpoint, queryParams = {}) {
    try {
        const url = new URL(`${ML_API_URL}/${endpoint}`);
        Object.entries(queryParams).forEach(([key, value]) => {
            if (value !== undefined && value !== null && value !== '') {
                url.searchParams.append(key, value);
            }
        });
        
        const response = await fetch(url.toString());
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Error proxying to ML API:`, error);
        return { error: 'Failed to connect to ML API', details: error.message };
    }
}

router.get('/disciplines', async (req, res) => {
    const data = await proxyToMLApi('disciplines');
    res.json(data);
});

router.get('/years', async (req, res) => {
    const data = await proxyToMLApi('years');
    res.json(data);
});

router.get('/programs', async (req, res) => {
    const data = await proxyToMLApi('programs');
    res.json(data);
});

router.get('/eda', async (req, res) => {
    const data = await proxyToMLApi('eda');
    res.json(data);
});

router.get('/summary', async (req, res) => {
    const data = await proxyToMLApi('summary');
    res.json(data);
});

router.get('/yearly-trends', async (req, res) => {
    const data = await proxyToMLApi('yearly-trends');
    res.json(data);
});

router.get('/discipline-comparison', async (req, res) => {
    const data = await proxyToMLApi('discipline-comparison');
    res.json(data);
});

router.get('/program-distribution', async (req, res) => {
    const data = await proxyToMLApi('program-distribution');
    res.json(data);
});

router.get('/placement-matrix', async (req, res) => {
    const data = await proxyToMLApi('placement-matrix');
    res.json(data);
});

router.get('/ctc-trends', async (req, res) => {
    const data = await proxyToMLApi('ctc-trends');
    res.json(data);
});

router.get('/student-trends', async (req, res) => {
    const data = await proxyToMLApi('student-trends');
    res.json(data);
});

router.get('/predict-ctc', async (req, res) => {
    const { year, discipline, placement } = req.query;
    const data = await proxyToMLApi('predict-ctc', { year, discipline, placement });
    res.json(data);
});

router.get('/predict-placement-rate', async (req, res) => {
    const { year, program, discipline } = req.query;
    const data = await proxyToMLApi('predict-placement-rate', { year, program, discipline });
    res.json(data);
});

router.get('/predict-placement-chance', async (req, res) => {
    const { cgpa, program, discipline, year } = req.query;
    const data = await proxyToMLApi('predict-placement-chance', { cgpa, program, discipline, year });
    res.json(data);
});

export default router;
