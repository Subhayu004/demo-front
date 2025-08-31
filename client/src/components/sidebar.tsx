import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { 
  BarChart3, 
  Database, 
  Satellite, 
  Blocks, 
  ShoppingCart, 
  Users, 
  PieChart,
  Leaf
} from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: BarChart3 },
  { name: "Project Registry", href: "/registry", icon: Database },
  { name: "MRV Data", href: "/mrv", icon: Satellite },
  { name: "Blockchain Explorer", href: "/blockchain", icon: Blocks },
  { name: "Carbon Marketplace", href: "/marketplace", icon: ShoppingCart },
  { name: "Community", href: "/community", icon: Users },
  { name: "Analytics", href: "/analytics", icon: PieChart },
];

export default function Sidebar() {
  const [location] = useLocation();

  return (
    <div className="w-64 bg-card border-r border-border shadow-lg">
      <div className="p-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <Leaf className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-bold">Blue Carbon</h1>
            <p className="text-sm text-muted-foreground">Registry & MRV</p>
          </div>
        </div>
      </div>
      
      <nav className="px-4 space-y-1" data-testid="sidebar-navigation">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = location === item.href || (location === "/" && item.href === "/dashboard");
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "sidebar-item flex items-center space-x-3 px-3 py-2 rounded-lg text-foreground transition-all duration-200",
                isActive ? "bg-accent text-accent-foreground" : "hover:bg-accent hover:translate-x-1"
              )}
              data-testid={`nav-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
