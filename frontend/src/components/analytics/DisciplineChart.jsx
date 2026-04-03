import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function DisciplineChart({ data }) {
  return (
    <div style={{ marginBottom: 40 }}>
      <h2>Placement by discipline</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="discipline" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="placement" name="Placement %" fill="#6366f1" />
          <Bar dataKey="avgCTC"    name="Avg CTC (LPA)" fill="#10b981" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}