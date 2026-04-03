import { useEffect, useState } from 'react';
import { fetchEDA } from '../../services/mlApi';
import SummaryCards from '../../components/analytics/SummaryCards';
import YearlyTrendsChart from '../../components/analytics/YearlyTrendsChart';
import DisciplineChart from '../../components/analytics/DisciplineChart';
import CTCTrendsChart from '../../components/analytics/CTCTrendsChart';
import PredictModal from '../../components/analytics/PredictModal';

export default function Analytics() {
  const [eda, setEda] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPredict, setShowPredict] = useState(false);

  useEffect(() => {
    fetchEDA()
      .then(setEda)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading analytics...</div>;
  if (!eda) return <div>Failed to load data. Is the ML server running?</div>;

  return (
    <div style={{ padding: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h1>Placement Analytics</h1>
        <button onClick={() => setShowPredict(true)}>Predict CTC</button>
      </div>

      <SummaryCards summary={eda.summary} />
      <YearlyTrendsChart data={eda.yearlyTrends} />
      <DisciplineChart data={eda.disciplineComparison} />
      <CTCTrendsChart data={eda.ctcTrends} />

      {showPredict && (
        <PredictModal
          disciplines={eda.disciplines}
          programs={eda.programs}
          years={eda.years}
          onClose={() => setShowPredict(false)}
        />
      )}
    </div>
  );
}