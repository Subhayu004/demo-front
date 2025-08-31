import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface CarbonChartProps {
  data: Array<{ month: string; credits: number }>;
}

export default function CarbonChart({ data }: CarbonChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
        <XAxis 
          dataKey="month" 
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
        <Line 
          type="monotone" 
          dataKey="credits" 
          stroke="#0ea5e9" 
          strokeWidth={2}
          dot={{ fill: "#0ea5e9", strokeWidth: 2, r: 4 }}
          activeDot={{ r: 6, stroke: "#0ea5e9", strokeWidth: 2 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
