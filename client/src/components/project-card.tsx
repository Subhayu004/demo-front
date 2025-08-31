import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { type Project } from "@shared/schema";

interface ProjectCardProps {
  project: Project;
}

const statusColors = {
  active: "bg-secondary text-white",
  planning: "bg-amber-500 text-white",
  monitoring: "bg-blue-500 text-white",
  completed: "bg-green-500 text-white",
};

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="overflow-hidden shadow-sm hover:shadow-md transition-shadow" data-testid={`project-card-${project.id}`}>
      {project.imageUrl && (
        <img 
          src={project.imageUrl} 
          alt={project.name}
          className="w-full h-48 object-cover"
          data-testid={`project-image-${project.id}`}
        />
      )}
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-lg font-semibold" data-testid={`project-name-${project.id}`}>
            {project.name}
          </h4>
          <Badge 
            className={statusColors[project.status as keyof typeof statusColors]}
            data-testid={`project-status-${project.id}`}
          >
            {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
          </Badge>
        </div>
        <p className="text-muted-foreground text-sm mb-4" data-testid={`project-description-${project.id}`}>
          {project.description}
        </p>
        <div className="grid grid-cols-2 gap-4 text-sm mb-4">
          <div>
            <p className="text-muted-foreground">Area</p>
            <p className="font-semibold" data-testid={`project-area-${project.id}`}>
              {parseFloat(project.areaHectares).toLocaleString()} hectares
            </p>
          </div>
          <div>
            <p className="text-muted-foreground">Credits</p>
            <p className="font-semibold" data-testid={`project-credits-${project.id}`}>
              {project.carbonCredits.toLocaleString()}
            </p>
          </div>
        </div>
        <div className="flex justify-between items-center text-sm text-muted-foreground mb-4">
          <span data-testid={`project-location-${project.id}`}>{project.location}</span>
          <span data-testid={`project-type-${project.id}`}>{project.type}</span>
        </div>
        <Button 
          className="w-full bg-primary text-primary-foreground hover:opacity-90"
          data-testid={`button-view-details-${project.id}`}
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );
}
