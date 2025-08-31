import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface SequestrationChartProps {
  data: Array<{ quarter: string; sequestration: number }>;
}

export default function SequestrationChart({ data }: SequestrationChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
        <XAxis 
          dataKey="quarter" 
          tick={{ fill: '#64748b', fontSize: 12 }}
        />
        <YAxis 
          tick={{ fill: '#64748b', fontSize: 12 }}
        />
        <Tooltip 
          contentStyle={{
            backgroundColor: "hsl(var(--card))",
            border: "1px solid hsl(var(--border))",
            borderRadius: "var(--radius)",
          }}
        />
        <Bar 
          dataKey="sequestration" 
          fill="#10b981"
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
