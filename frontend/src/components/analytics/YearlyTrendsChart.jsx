import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function YearlyTrendsChart({ data }) {
  return (
    <div style={{ marginBottom: 40 }}>
      <h2>Yearly placement trends</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="year" />
          <YAxis yAxisId="left" />
          <YAxis yAxisId="right" orientation="right" />
          <Tooltip />
          <Legend />
          <Line yAxisId="left"  type="monotone" dataKey="placement" name="Placement %" stroke="#6366f1" />
          <Line yAxisId="right" type="monotone" dataKey="avgCTC"    name="Avg CTC (LPA)" stroke="#10b981" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}