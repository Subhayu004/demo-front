import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Plus, User } from "lucide-react";

const pageTitles: Record<string, { title: string; description: string }> = {
  "/": { title: "Dashboard", description: "Monitor blue carbon projects and blockchain transactions" },
  "/dashboard": { title: "Dashboard", description: "Monitor blue carbon projects and blockchain transactions" },
  "/registry": { title: "Project Registry", description: "Browse and manage blue carbon restoration projects" },
  "/mrv": { title: "MRV Data Analytics", description: "Monitoring, Reporting & Verification data from drone and mobile inputs" },
  "/blockchain": { title: "Blockchain Explorer", description: "Track transactions and smart contract activities" },
  "/marketplace": { title: "Carbon Marketplace", description: "Trade verified carbon credits from blue carbon projects" },
  "/community": { title: "Community Participation", description: "Engage with local communities in blue carbon restoration" },
  "/analytics": { title: "Advanced Analytics", description: "Comprehensive insights and performance metrics" },
};

export default function Header() {
  const [location] = useLocation();
  const pageInfo = pageTitles[location] || { title: "Dashboard", description: "Monitor blue carbon projects and blockchain transactions" };

  return (
    <header className="bg-card border-b border-border p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground" data-testid="page-title">
            {pageInfo.title}
          </h2>
          <p className="text-muted-foreground" data-testid="page-description">
            {pageInfo.description}
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <Button 
            className="bg-primary text-primary-foreground hover:opacity-90"
            data-testid="button-new-project"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Project
          </Button>
          <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center" data-testid="user-avatar">
            <User className="w-5 h-5 text-muted-foreground" />
          </div>
        </div>
      </div>
    </header>
  );
}
