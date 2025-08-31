import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Tooltip } from "recharts";

interface BiodiversityChartProps {
  data: {
    fishSpecies: number;
    birdSpecies: number;
    plantSpecies: number;
    waterQuality: number;
    habitatQuality: number;
  };
}

export default function BiodiversityChart({ data }: BiodiversityChartProps) {
  const chartData = [
    { subject: "Fish Species", value: data.fishSpecies },
    { subject: "Bird Species", value: data.birdSpecies },
    { subject: "Plant Species", value: data.plantSpecies },
    { subject: "Water Quality", value: data.waterQuality },
    { subject: "Habitat Quality", value: data.habitatQuality },
  ];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadarChart data={chartData}>
        <PolarGrid />
        <PolarAngleAxis 
          dataKey="subject" 
          tick={{ fill: '#64748b', fontSize: 12 }}
        />
        <PolarRadiusAxis 
          angle={90} 
          domain={[0, 100]} 
          tick={{ fill: '#64748b', fontSize: 12 }}
        />
        <Radar
          name="Biodiversity Index"
          dataKey="value"
          stroke="#0ea5e9"
          fill="#0ea5e9"
          fillOpacity={0.2}
          strokeWidth={2}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "hsl(var(--card))",
            border: "1px solid hsl(var(--border))",
            borderRadius: "var(--radius)",
          }}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
}
