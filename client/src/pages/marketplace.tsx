import { useQuery } from "@tanstack/react-query";
import MarketplaceListing from "@/components/marketplace-listing";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { type CarbonCredit, type Project } from "@shared/schema";
import { Plus } from "lucide-react";

export default function Marketplace() {
  const { data: marketStats, isLoading: statsLoading } = useQuery({
    queryKey: ["/api/analytics/marketplace"],
  });

  const { data: credits, isLoading: creditsLoading } = useQuery<CarbonCredit[]>({
    queryKey: ["/api/carbon-credits"],
  });

  const { data: projects, isLoading: projectsLoading } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

  if (statsLoading || creditsLoading || projectsLoading) {
    return (
      <div className="space-y-6 fade-in">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-32 bg-muted animate-pulse rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 fade-in" data-testid="marketplace-page">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-semibold">Carbon Credit Marketplace</h3>
          <p className="text-muted-foreground">Trade verified carbon credits from blue carbon projects</p>
        </div>
        <Button className="bg-secondary text-white hover:opacity-90" data-testid="button-list-credits">
          <Plus className="w-4 h-4 mr-2" />
          List Credits
        </Button>
      </div>

      {/* Market Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="carbon-credit-card text-white shadow-sm">
          <CardContent className="p-6">
            <h4 className="text-lg font-semibold mb-2">Market Price</h4>
            <p className="text-3xl font-bold" data-testid="market-price">
              ₹{marketStats?.marketPrice?.toLocaleString() || "0"}
            </p>
            <p className="text-sm opacity-90">per tonne CO₂</p>
            <p className="text-sm mt-2" data-testid="price-change">
              +{marketStats?.priceChange || 0}% from last week
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardContent className="p-6">
            <h4 className="text-lg font-semibold mb-2">Trading Volume</h4>
            <p className="text-3xl font-bold text-foreground" data-testid="trading-volume">
              {marketStats?.tradingVolume?.toLocaleString() || "0"}
            </p>
            <p className="text-sm text-muted-foreground">tonnes traded today</p>
            <p className="text-sm text-secondary mt-2" data-testid="volume-change">
              +{marketStats?.volumeChange || 0}% from yesterday
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardContent className="p-6">
            <h4 className="text-lg font-semibold mb-2">Available Credits</h4>
            <p className="text-3xl font-bold text-foreground" data-testid="available-credits">
              {((marketStats?.availableCredits || 0) / 1000000).toFixed(1)}M
            </p>
            <p className="text-sm text-muted-foreground">tonnes available</p>
            <p className="text-sm text-secondary mt-2">
              Across {projects?.length || 0} projects
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Trading Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Active Listings</CardTitle>
            </CardHeader>
            <CardContent>
              <MarketplaceListing credits={credits || []} projects={projects || []} />
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Quick Trade</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="trade-type" className="block text-sm font-medium text-foreground mb-2">
                Trade Type
              </Label>
              <Select data-testid="select-trade-type">
                <SelectTrigger>
                  <SelectValue placeholder="Buy Credits" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="buy">Buy Credits</SelectItem>
                  <SelectItem value="sell">Sell Credits</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="quantity" className="block text-sm font-medium text-foreground mb-2">
                Quantity (tonnes)
              </Label>
              <Input 
                id="quantity"
                type="number" 
                placeholder="100"
                data-testid="input-quantity"
              />
            </div>
            <div>
              <Label htmlFor="price" className="block text-sm font-medium text-foreground mb-2">
                Price per tonne
              </Label>
              <Input 
                id="price"
                type="number" 
                placeholder="2850"
                data-testid="input-price"
              />
            </div>
            <Button 
              className="w-full bg-primary text-primary-foreground hover:opacity-90"
              data-testid="button-place-order"
            >
              Place Order
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
