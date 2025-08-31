import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { type CarbonCredit, type Project } from "@shared/schema";

interface MarketplaceListingProps {
  credits: CarbonCredit[];
  projects: Project[];
}

export default function MarketplaceListing({ credits, projects }: MarketplaceListingProps) {
  const getProjectName = (projectId: string) => {
    const project = projects.find(p => p.id === projectId);
    return project ? project.name : "Unknown Project";
  };

  const getProjectType = (projectId: string) => {
    const project = projects.find(p => p.id === projectId);
    return project ? project.type : "Unknown";
  };

  return (
    <div className="overflow-x-auto">
      <Table data-testid="marketplace-table">
        <TableHeader>
          <TableRow>
            <TableHead>Project</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {credits.filter(credit => credit.isAvailable).map((credit) => (
            <TableRow key={credit.id} data-testid={`credit-row-${credit.id}`}>
              <TableCell>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-muted rounded-full mr-3"></div>
                  <span className="text-sm font-medium" data-testid={`credit-project-${credit.id}`}>
                    {getProjectName(credit.projectId)}
                  </span>
                </div>
              </TableCell>
              <TableCell className="capitalize" data-testid={`credit-type-${credit.id}`}>
                {getProjectType(credit.projectId)}
              </TableCell>
              <TableCell className="font-bold" data-testid={`credit-price-${credit.id}`}>
                ₹{parseFloat(credit.pricePerTonne).toLocaleString()}
              </TableCell>
              <TableCell data-testid={`credit-quantity-${credit.id}`}>
                {credit.quantity} tonnes
              </TableCell>
              <TableCell>
                <Button 
                  size="sm" 
                  className="bg-primary text-primary-foreground hover:opacity-90"
                  data-testid={`button-buy-${credit.id}`}
                >
                  Buy
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
