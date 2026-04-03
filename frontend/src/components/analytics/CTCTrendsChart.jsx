import { AreaChart, Area, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function CTCTrendsChart({ data }) {
  return (
    <div style={{ marginBottom: 40 }}>
      <h2>CTC trends over time</h2>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Area type="monotone" dataKey="avgCTC"    name="Avg CTC"    stroke="#6366f1" fill="#e0e7ff" />
          <Area type="monotone" dataKey="medianCTC" name="Median CTC" stroke="#10b981" fill="#d1fae5" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}