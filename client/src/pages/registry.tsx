import { useQuery } from "@tanstack/react-query";
import ProjectCard from "@/components/project-card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { type Project } from "@shared/schema";
import { useState } from "react";

export default function Registry() {
  const [locationFilter, setLocationFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");

  const { data: projects, isLoading } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

  if (isLoading) {
    return (
      <div className="space-y-6 fade-in">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-96 bg-muted animate-pulse rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  const filteredProjects = projects?.filter(project => {
    const locationMatch = locationFilter === "all" || project.location === locationFilter;
    const typeMatch = typeFilter === "all" || project.type === typeFilter;
    return locationMatch && typeMatch;
  }) || [];

  const uniqueLocations = [...new Set(projects?.map(p => p.location) || [])];
  const uniqueTypes = [...new Set(projects?.map(p => p.type) || [])];

  return (
    <div className="space-y-6 fade-in" data-testid="registry-page">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-semibold">Project Registry</h3>
          <p className="text-muted-foreground">Browse and manage blue carbon restoration projects</p>
        </div>
        <div className="flex space-x-3">
          <Select value={locationFilter} onValueChange={setLocationFilter} data-testid="filter-location">
            <SelectTrigger className="w-48">
              <SelectValue placeholder="All Locations" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              {uniqueLocations.map(location => (
                <SelectItem key={location} value={location}>{location}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={typeFilter} onValueChange={setTypeFilter} data-testid="filter-type">
            <SelectTrigger className="w-48">
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              {uniqueTypes.map(type => (
                <SelectItem key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="projects-grid">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground" data-testid="no-projects-message">
            No projects found matching the selected filters.
          </p>
        </div>
      )}
    </div>
  );
}
