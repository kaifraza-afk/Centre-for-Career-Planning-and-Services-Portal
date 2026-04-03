export default function SummaryCards({ summary }) {
  const cards = [
    { label: 'Total registered', value: summary.totalStudents },
    { label: 'Total placed', value: summary.placedStudents },
    { label: 'Avg placement %', value: `${summary.avgPlacement}%` },
    { label: 'Avg CTC', value: `${summary.avgCTC} LPA` },
    { label: 'Median CTC', value: `${summary.medianCTC} LPA` },
    { label: 'Highest CTC', value: `${summary.maxCTC} LPA` },
  ];
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 32 }}>
      {cards.map(c => (
        <div key={c.label} style={{ border: '1px solid #ddd', borderRadius: 8, padding: 16 }}>
          <div style={{ fontSize: 13, color: '#888' }}>{c.label}</div>
          <div style={{ fontSize: 24, fontWeight: 600 }}>{c.value}</div>
        </div>
      ))}
    </div>
  );
}