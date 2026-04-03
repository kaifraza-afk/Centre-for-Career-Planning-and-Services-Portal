import { useState } from 'react';
import { predictCTC, predictPlacementChance } from '../../services/mlApi';

export default function PredictModal({ disciplines, programs, years, onClose }) {
  const [form, setForm] = useState({
    year: years[years.length - 1],
    discipline: disciplines[0],
    program: programs[0],
    placement: 75,
    cgpa: 8,
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }));

  const handlePredict = async () => {
    setLoading(true);
    const [ctcRes, chanceRes] = await Promise.all([
      predictCTC(form.year, form.discipline, form.placement),
      predictPlacementChance(form.cgpa, form.program, form.discipline, form.year),
    ]);
    setResult({ ctc: ctcRes.predictedCTC, chance: chanceRes.placementChance });
    setLoading(false);
  };

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
      <div style={{ background: '#fff', borderRadius: 12, padding: 32, minWidth: 360, maxWidth: 480 }}>
        <h2 style={{ marginTop: 0 }}>Predict CTC & placement chance</h2>

        <label>Discipline</label>
        <select value={form.discipline} onChange={e => set('discipline', e.target.value)} style={{ display: 'block', width: '100%', marginBottom: 12 }}>
          {disciplines.map(d => <option key={d}>{d}</option>)}
        </select>

        <label>Program</label>
        <select value={form.program} onChange={e => set('program', e.target.value)} style={{ display: 'block', width: '100%', marginBottom: 12 }}>
          {programs.map(p => <option key={p}>{p}</option>)}
        </select>

        <label>Year</label>
        <select value={form.year} onChange={e => set('year', +e.target.value)} style={{ display: 'block', width: '100%', marginBottom: 12 }}>
          {years.map(y => <option key={y}>{y}</option>)}
        </select>

        <label>Expected placement % in batch</label>
        <input type="number" value={form.placement} min={0} max={100}
          onChange={e => set('placement', +e.target.value)}
          style={{ display: 'block', width: '100%', marginBottom: 12 }} />

        <label>Your CGPA</label>
        <input type="number" value={form.cgpa} min={0} max={10} step={0.1}
          onChange={e => set('cgpa', +e.target.value)}
          style={{ display: 'block', width: '100%', marginBottom: 20 }} />

        <button onClick={handlePredict} disabled={loading} style={{ marginRight: 8 }}>
          {loading ? 'Predicting...' : 'Predict'}
        </button>
        <button onClick={onClose}>Close</button>

        {result && (
          <div style={{ marginTop: 20, padding: 16, background: '#f0fdf4', borderRadius: 8 }}>
            <div>Predicted avg CTC: <strong>{result.ctc} LPA</strong></div>
            <div>Placement chance: <strong>{result.chance}%</strong></div>
          </div>
        )}
      </div>
    </div>
  );
}