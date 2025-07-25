import { useState } from "react";
import { Navigation } from "@/components/ui/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { 
  DollarSign, 
  ShoppingBag, 
  Clock, 
  TrendingUp, 
  AlertCircle,
  ChefHat,
  Users,
  Star
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ClientDashboard() {
  const [isAcceptingOrders, setIsAcceptingOrders] = useState(true);
  const { toast } = useToast();

  // Mock dashboard data
  const dashboardData = {
    todayRevenue: 15420,
    todayOrders: 28,
    pendingOrders: 5,
    avgRating: 4.8,
    recentOrders: [
      { id: "ord_001", customer: "John Doe", amount: 794, status: "preparing", time: "2 mins ago" },
      { id: "ord_002", customer: "Jane Smith", amount: 429, status: "ready", time: "5 mins ago" },
      { id: "ord_003", customer: "Mike Johnson", amount: 298, status: "pending", time: "8 mins ago" }
    ],
    popularItems: [
      { name: "Butter Chicken", orders: 15, revenue: 4485 },
      { name: "Biryani Special", orders: 12, revenue: 4188 },
      { name: "Paneer Tikka", orders: 8, revenue: 1992 }
    ]
  };

  const handleOrderToggle = (enabled: boolean) => {
    setIsAcceptingOrders(enabled);
    
    // Here you would update the backend/database state
    const orderData = {
      kitchen_name: "CloudKitchen Demo",
      accepting_orders: enabled,
      timestamp: new Date().toISOString(),
      status: enabled ? "online" : "offline"
    };
    
    console.log("Order toggle webhook data:", orderData);
    
    toast({
      title: enabled ? "Orders enabled" : "Orders disabled",
      description: enabled 
        ? "Your kitchen is now accepting new orders." 
        : "Your kitchen has stopped accepting new orders.",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-warning";
      case "preparing": return "bg-primary";
      case "ready": return "bg-success";
      default: return "bg-muted";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navigation userType="client" />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Kitchen Dashboard
            </h1>
            <p className="text-lg text-muted-foreground">
              Manage your cloud kitchen operations
            </p>
          </div>
          
          {/* Order Toggle */}
          <Card className="shadow-card">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <Label htmlFor="order-toggle" className="font-medium">
                  {isAcceptingOrders ? "Accepting Orders" : "Orders Paused"}
                </Label>
                <Switch
                  id="order-toggle"
                  checked={isAcceptingOrders}
                  onCheckedChange={handleOrderToggle}
                />
                <div className={`w-3 h-3 rounded-full ${
                  isAcceptingOrders ? 'bg-success' : 'bg-destructive'
                }`} />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stats Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">₹{dashboardData.todayRevenue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">+12% from yesterday</p>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Orders Today</CardTitle>
              <ShoppingBag className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{dashboardData.todayOrders}</div>
              <p className="text-xs text-muted-foreground">+3 from yesterday</p>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
              <Clock className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-warning">{dashboardData.pendingOrders}</div>
              <p className="text-xs text-muted-foreground">Requires attention</p>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Rating</CardTitle>
              <Star className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{dashboardData.avgRating}</div>
              <p className="text-xs text-muted-foreground">Based on 124 reviews</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Recent Orders */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <ShoppingBag className="h-5 w-5" />
                <span>Recent Orders</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dashboardData.recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{order.customer}</p>
                      <p className="text-sm text-muted-foreground">#{order.id} • {order.time}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-primary">₹{order.amount}</p>
                      <Badge className={getStatusColor(order.status)}>
                        {order.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4">
                View All Orders
              </Button>
            </CardContent>
          </Card>

          {/* Popular Items */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5" />
                <span>Popular Items Today</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dashboardData.popularItems.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground">{item.orders} orders</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-primary">₹{item.revenue.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4">
                View Menu Analytics
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="mt-6 shadow-card">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button variant="outline" className="h-20 flex-col space-y-2">
                <ChefHat className="h-6 w-6" />
                <span>Edit Menu</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col space-y-2">
                <Users className="h-6 w-6" />
                <span>View Customers</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col space-y-2">
                <DollarSign className="h-6 w-6" />
                <span>Payment Reports</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col space-y-2">
                <AlertCircle className="h-6 w-6" />
                <span>Support</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}