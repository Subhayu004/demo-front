import { useQuery } from "@tanstack/react-query";
import MetricCard from "@/components/metric-card";
import CarbonChart from "@/components/charts/carbon-chart";
import ProjectChart from "@/components/charts/project-chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { type Project } from "@shared/schema";
import { BarChart3, Leaf, Link as LinkIcon, Satellite } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export default function Dashboard() {
  const { data: analyticsData, isLoading: analyticsLoading } = useQuery({
    queryKey: ["/api/analytics/dashboard"],
  });

  const { data: projects, isLoading: projectsLoading } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

  if (analyticsLoading || projectsLoading) {
    return (
      <div className="space-y-6 fade-in">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-32 bg-muted animate-pulse rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  const projectChartData = analyticsData?.projectTypes ? [
    { name: "Mangrove", value: analyticsData.projectTypes.mangrove },
    { name: "Seagrass", value: analyticsData.projectTypes.seagrass },
    { name: "Saltmarsh", value: analyticsData.projectTypes.saltmarsh },
  ] : [];

  const statusColors = {
    active: "bg-secondary text-white",
    planning: "bg-amber-500 text-white",
    monitoring: "bg-blue-500 text-white",
    completed: "bg-green-500 text-white",
  };

  return (
    <div className="space-y-6 fade-in" data-testid="dashboard-page">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Projects"
          value={analyticsData?.totalProjects?.toString() || "0"}
          change="+12% this month"
          icon={BarChart3}
          iconColor="bg-primary"
        />
        <MetricCard
          title="Carbon Credits"
          value={`${(analyticsData?.totalCredits / 1000000)?.toFixed(1)}M` || "0"}
          change="+8% this month"
          icon={Leaf}
          iconColor="bg-secondary"
        />
        <MetricCard
          title="Blockchain Tx"
          value={analyticsData?.totalTransactions?.toLocaleString() || "0"}
          change="+23% this month"
          icon={LinkIcon}
          iconColor="bg-amber-500"
        />
        <MetricCard
          title="Active Monitoring"
          value={analyticsData?.activeMonitoring?.toString() || "0"}
          change="Drone & Mobile"
          icon={Satellite}
          iconColor="bg-purple-500"
          changeType="neutral"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Carbon Credit Generation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="chart-container">
              {analyticsData?.monthlyData && (
                <CarbonChart data={analyticsData.monthlyData} />
              )}
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Project Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="chart-container">
              <ProjectChart data={projectChartData} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Projects */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Recent Projects</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table data-testid="recent-projects-table">
              <TableHeader>
                <TableRow>
                  <TableHead>Project</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Credits</TableHead>
                  <TableHead>Last Update</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {projects?.slice(0, 5).map((project) => (
                  <TableRow key={project.id} data-testid={`recent-project-${project.id}`}>
                    <TableCell>
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          {project.imageUrl && (
                            <img 
                              className="h-10 w-10 rounded-full object-cover" 
                              src={project.imageUrl} 
                              alt={project.name}
                            />
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-foreground" data-testid={`project-name-${project.id}`}>
                            {project.name}
                          </div>
                          <div className="text-sm text-muted-foreground capitalize">
                            {project.type} ecosystem
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell data-testid={`project-location-${project.id}`}>
                      {project.location}
                    </TableCell>
                    <TableCell>
                      <Badge 
                        className={statusColors[project.status as keyof typeof statusColors]}
                        data-testid={`project-status-${project.id}`}
                      >
                        {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell data-testid={`project-credits-${project.id}`}>
                      {project.carbonCredits.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-muted-foreground" data-testid={`project-last-update-${project.id}`}>
                      {formatDistanceToNow(new Date(project.lastUpdate!), { addSuffix: true })}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
