import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SequestrationChart from "@/components/charts/sequestration-chart";
import BiodiversityChart from "@/components/charts/biodiversity-chart";
import { Download, Bot, Smartphone, Satellite } from "lucide-react";

export default function MRV() {
  const { data: analyticsData, isLoading } = useQuery({
    queryKey: ["/api/analytics/dashboard"],
  });

  if (isLoading) {
    return (
      <div className="space-y-6 fade-in">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-64 bg-muted animate-pulse rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 fade-in" data-testid="mrv-page">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-semibold">MRV Data Analytics</h3>
          <p className="text-muted-foreground">Monitoring, Reporting & Verification data from drone and mobile inputs</p>
        </div>
        <Button className="bg-primary text-primary-foreground hover:opacity-90" data-testid="button-export-data">
          <Download className="w-4 h-4 mr-2" />
          Export Data
        </Button>
      </div>

      {/* MRV Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold">Bot Monitoring</h4>
              <Bot className="w-6 h-6 text-primary" />
            </div>
            <img 
              src="https://images.unsplash.com/photo-1473968512647-3e447244af8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=200" 
              alt="Bot monitoring" 
              className="w-full h-32 object-cover rounded-lg mb-4"
              data-testid="drone-monitoring-image"
            />
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Active Drones</span>
                <span className="font-semibold" data-testid="active-drones-count">24</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Coverage Area</span>
                <span className="font-semibold" data-testid="coverage-area">12,500 km²</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Data Points</span>
                <span className="font-semibold" data-testid="data-points">45,892</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold">Mobile Data Collection</h4>
              <Smartphone className="w-6 h-6 text-secondary" />
            </div>
            <img 
              src="https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=200" 
              alt="Mobile data collection" 
              className="w-full h-32 object-cover rounded-lg mb-4"
              data-testid="mobile-collection-image"
            />
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Field Teams</span>
                <span className="font-semibold" data-testid="field-teams-count">36</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Submissions</span>
                <span className="font-semibold" data-testid="submissions-count">2,847</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Verification Rate</span>
                <span className="font-semibold" data-testid="verification-rate">94.2%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold">Satellite Integration</h4>
              <Satellite className="w-6 h-6 text-amber-500" />
            </div>
            <img 
              src="https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=200" 
              alt="Satellite monitoring" 
              className="w-full h-32 object-cover rounded-lg mb-4"
              data-testid="satellite-monitoring-image"
            />
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Image Updates</span>
                <span className="font-semibold" data-testid="image-updates">Weekly</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Resolution</span>
                <span className="font-semibold" data-testid="resolution">10m/pixel</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Coverage</span>
                <span className="font-semibold" data-testid="satellite-coverage">98.7%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Data Visualization */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Carbon Sequestration Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="chart-container">
              {analyticsData?.sequestrationData && (
                <SequestrationChart data={analyticsData.sequestrationData} />
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Biodiversity Index</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="chart-container">
              {analyticsData?.biodiversityData && (
                <BiodiversityChart data={analyticsData.biodiversityData} />
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
