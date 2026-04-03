import express from "express";
const router = express.Router();

const ML_API = process.env.ML_API_URL || 'http://localhost:5001';

// Generic proxy — forwards query params as-is
async function proxyGet(path, req, res) {
  try {
    const params = new URLSearchParams(req.query).toString();
    const url = `${ML_API}${path}${params ? '?' + params : ''}`;
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'ML API unreachable', detail: err.message });
  }
}

router.get('/eda',                  (req, res) => proxyGet('/eda', req, res));
router.get('/yearly-trends',        (req, res) => proxyGet('/yearly-trends', req, res));
router.get('/discipline-comparison',(req, res) => proxyGet('/discipline-comparison', req, res));
router.get('/ctc-trends',           (req, res) => proxyGet('/ctc-trends', req, res));
router.get('/disciplines',          (req, res) => proxyGet('/disciplines', req, res));
router.get('/programs',             (req, res) => proxyGet('/programs', req, res));
router.get('/years',                (req, res) => proxyGet('/years', req, res));
router.get('/predict-ctc',          (req, res) => proxyGet('/predict-ctc', req, res));
router.get('/predict-placement-rate',(req, res) => proxyGet('/predict-placement-rate', req, res));
router.get('/predict-placement-chance',(req, res) => proxyGet('/predict-placement-chance', req, res));

export default router;