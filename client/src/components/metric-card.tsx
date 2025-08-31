import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface MetricCardProps {
  title: string;
  value: string;
  change?: string;
  icon: LucideIcon;
  iconColor?: string;
  changeType?: "positive" | "negative" | "neutral";
}

export default function MetricCard({ 
  title, 
  value, 
  change, 
  icon: Icon, 
  iconColor = "bg-primary",
  changeType = "positive"
}: MetricCardProps) {
  const changeColorClass = {
    positive: "text-secondary",
    negative: "text-destructive",
    neutral: "text-muted-foreground"
  }[changeType];

  return (
    <Card className="metric-card shadow-sm" data-testid={`metric-${title.toLowerCase().replace(/\s+/g, '-')}`}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold text-foreground" data-testid={`metric-value-${title.toLowerCase().replace(/\s+/g, '-')}`}>
              {value}
            </p>
            {change && (
              <p className={`text-sm ${changeColorClass}`} data-testid={`metric-change-${title.toLowerCase().replace(/\s+/g, '-')}`}>
                {change}
              </p>
            )}
          </div>
          <div className={`w-12 h-12 ${iconColor} rounded-lg flex items-center justify-center`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
