import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import CarbonChart from "@/components/charts/carbon-chart";
import ProjectChart from "@/components/charts/project-chart";
import { Download, TrendingUp } from "lucide-react";

export default function Analytics() {
  const { data: analyticsData, isLoading } = useQuery({
    queryKey: ["/api/analytics/dashboard"],
  });

  if (isLoading) {
    return (
      <div className="space-y-6 fade-in">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-64 bg-muted animate-pulse rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  const performanceData = [
    { month: "Week 1", credits: 85 },
    { month: "Week 2", credits: 88 },
    { month: "Week 3", credits: 92 },
    { month: "Week 4", credits: 95 },
  ];

  const successData = [
    { name: "Completed", value: 147 },
    { name: "In Progress", value: 65 },
    { name: "Planning", value: 35 },
  ];

  return (
    <div className="space-y-6 fade-in" data-testid="analytics-page">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-semibold">Advanced Analytics</h3>
          <p className="text-muted-foreground">Comprehensive insights and performance metrics</p>
        </div>
        <div className="flex space-x-3">
          <Select defaultValue="30days" data-testid="select-time-period">
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Last 30 Days" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="30days">Last 30 Days</SelectItem>
              <SelectItem value="90days">Last 90 Days</SelectItem>
              <SelectItem value="1year">Last Year</SelectItem>
            </SelectContent>
          </Select>
          <Button className="bg-primary text-primary-foreground hover:opacity-90" data-testid="button-export-report">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Carbon Credit Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="chart-container">
              <CarbonChart data={performanceData} />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Project Success Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="chart-container">
              <ProjectChart data={successData} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="shadow-sm">
          <CardContent className="p-6">
            <h5 className="text-sm font-medium text-muted-foreground mb-2">Average Project ROI</h5>
            <p className="text-3xl font-bold text-foreground mb-2" data-testid="average-roi">247%</p>
            <div className="flex items-center text-sm">
              <TrendingUp className="w-4 h-4 text-secondary mr-1" />
              <span className="text-secondary" data-testid="roi-increase">18.2% increase</span>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardContent className="p-6">
            <h5 className="text-sm font-medium text-muted-foreground mb-2">Carbon Sequestration Rate</h5>
            <p className="text-3xl font-bold text-foreground mb-2" data-testid="sequestration-rate">4.2</p>
            <div className="flex items-center text-sm">
              <span className="text-muted-foreground">tonnes CO₂/hectare/year</span>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardContent className="p-6">
            <h5 className="text-sm font-medium text-muted-foreground mb-2">Community Engagement</h5>
            <p className="text-3xl font-bold text-foreground mb-2" data-testid="community-engagement">89%</p>
            <div className="flex items-center text-sm">
              <TrendingUp className="w-4 h-4 text-secondary mr-1" />
              <span className="text-secondary" data-testid="engagement-increase">5.7% increase</span>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardContent className="p-6">
            <h5 className="text-sm font-medium text-muted-foreground mb-2">Project Completion Rate</h5>
            <p className="text-3xl font-bold text-foreground mb-2" data-testid="completion-rate">94%</p>
            <div className="flex items-center text-sm">
              <TrendingUp className="w-4 h-4 text-secondary mr-1" />
              <span className="text-secondary" data-testid="completion-increase">2.1% increase</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
