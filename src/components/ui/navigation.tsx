import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, User, LogOut, Settings, ChefHat } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

interface NavigationProps {
  userType?: 'customer' | 'client';
  cartCount?: number;
  onLogout?: () => void;
}

export function Navigation({ userType = 'customer', cartCount = 0, onLogout }: NavigationProps) {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  if (userType === 'customer') {
    return (
      <nav className="bg-card border-b shadow-card">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <ChefHat className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                CloudKitchen
              </span>
            </Link>
            
            <div className="hidden md:flex items-center space-x-6">
              <Link 
                to="/menu" 
                className={`font-medium transition-colors ${
                  isActive('/menu') ? 'text-primary' : 'text-muted-foreground hover:text-primary'
                }`}
              >
                Menu
              </Link>
              <Link 
                to="/orders" 
                className={`font-medium transition-colors ${
                  isActive('/orders') ? 'text-primary' : 'text-muted-foreground hover:text-primary'
                }`}
              >
                My Orders
              </Link>
              <Link 
                to="/track" 
                className={`font-medium transition-colors ${
                  isActive('/track') ? 'text-primary' : 'text-muted-foreground hover:text-primary'
                }`}
              >
                Track Order
              </Link>
            </div>
            
            <div className="flex items-center space-x-3">
              <Link to="/cart">
                <Button variant="outline" size="sm" className="relative">
                  <ShoppingCart className="h-4 w-4" />
                  {cartCount > 0 && (
                    <Badge 
                      variant="default" 
                      className="absolute -top-2 -right-2 h-5 w-5 text-xs p-0 flex items-center justify-center"
                    >
                      {cartCount}
                    </Badge>
                  )}
                </Button>
              </Link>
              <Link to="/profile">
                <Button variant="ghost" size="sm">
                  <User className="h-4 w-4" />
                </Button>
              </Link>
              {onLogout && (
                <Button variant="ghost" size="sm" onClick={onLogout}>
                  <LogOut className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </nav>
    );
  }
  
  // Client navigation
  return (
    <nav className="bg-card border-b shadow-card">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/client" className="flex items-center space-x-2">
            <ChefHat className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Kitchen Manager
            </span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-6">
            <Link 
              to="/client/dashboard" 
              className={`font-medium transition-colors ${
                isActive('/client/dashboard') ? 'text-primary' : 'text-muted-foreground hover:text-primary'
              }`}
            >
              Dashboard
            </Link>
            <Link 
              to="/client/orders" 
              className={`font-medium transition-colors ${
                isActive('/client/orders') ? 'text-primary' : 'text-muted-foreground hover:text-primary'
              }`}
            >
              Orders
            </Link>
            <Link 
              to="/client/menu" 
              className={`font-medium transition-colors ${
                isActive('/client/menu') ? 'text-primary' : 'text-muted-foreground hover:text-primary'
              }`}
            >
              Menu Editor
            </Link>
            <Link 
              to="/client/payments" 
              className={`font-medium transition-colors ${
                isActive('/client/payments') ? 'text-primary' : 'text-muted-foreground hover:text-primary'
              }`}
            >
              Payments
            </Link>
          </div>
          
          <div className="flex items-center space-x-3">
            <Link to="/client/settings">
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
            </Link>
            {onLogout && (
              <Button variant="ghost" size="sm" onClick={onLogout}>
                <LogOut className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}