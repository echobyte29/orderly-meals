import { useState } from "react";
import { Navigation } from "@/components/ui/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { MapPin, Clock, Phone, CheckCircle, Package, Truck, Home } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function CustomerTrack() {
  const [orderId, setOrderId] = useState("");
  const [trackedOrder, setTrackedOrder] = useState(null);
  const { toast } = useToast();

  // Mock order tracking data
  const mockOrderTracking = {
    id: "ord_001",
    status: "preparing",
    customerName: "John Doe",
    customerPhone: "+91-98765-43210",
    customerAddress: "123 MG Road, Bangalore, Karnataka 560001",
    estimatedDelivery: "30-40 minutes",
    timeline: [
      { status: "Order Placed", time: "2:30 PM", completed: true, icon: CheckCircle },
      { status: "Order Accepted", time: "2:32 PM", completed: true, icon: CheckCircle },
      { status: "Preparing", time: "2:35 PM", completed: true, icon: Package, active: true },
      { status: "Out for Delivery", time: "", completed: false, icon: Truck },
      { status: "Delivered", time: "", completed: false, icon: Home }
    ],
    items: [
      { name: "Butter Chicken", quantity: 2, price: 299 },
      { name: "Naan", quantity: 4, price: 49 }
    ],
    total: 794
  };

  const handleTrackOrder = () => {
    if (!orderId.trim()) {
      toast({
        title: "Order ID required",
        description: "Please enter your order ID to track your order.",
        variant: "destructive"
      });
      return;
    }

    // Mock tracking - replace with actual API call
    if (orderId === "ord_001") {
      setTrackedOrder(mockOrderTracking);
      toast({
        title: "Order found!",
        description: "Your order details have been loaded.",
      });
    } else {
      toast({
        title: "Order not found",
        description: "Please check your order ID and try again.",
        variant: "destructive"
      });
      setTrackedOrder(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "preparing": return "bg-primary";
      case "ready": return "bg-warning";
      case "out_for_delivery": return "bg-primary";
      case "delivered": return "bg-success";
      default: return "bg-muted";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navigation userType="customer" cartCount={0} />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-primary bg-clip-text text-transparent">
          Track Your Order
        </h1>

        {/* Order ID Input */}
        <Card className="max-w-md mx-auto mb-8 shadow-card">
          <CardHeader>
            <CardTitle>Enter Order ID</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              placeholder="e.g., ord_001"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
            />
            <Button 
              onClick={handleTrackOrder}
              className="w-full bg-gradient-primary"
            >
              Track Order
            </Button>
            <p className="text-sm text-muted-foreground text-center">
              Enter the order ID from your confirmation message or email.
            </p>
          </CardContent>
        </Card>

        {/* Order Tracking Details */}
        {trackedOrder && (
          <div className="max-w-3xl mx-auto space-y-6">
            {/* Order Status Card */}
            <Card className="shadow-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Order #{trackedOrder.id}</CardTitle>
                  <Badge className={getStatusColor(trackedOrder.status)}>
                    {trackedOrder.status.replace('_', ' ').toUpperCase()}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Estimated Delivery</p>
                      <p className="text-sm text-muted-foreground">{trackedOrder.estimatedDelivery}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Contact</p>
                      <p className="text-sm text-muted-foreground">{trackedOrder.customerPhone}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <MapPin className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">Delivery Address</p>
                      <p className="text-sm text-muted-foreground">{trackedOrder.customerAddress}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Order Timeline */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Order Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {trackedOrder.timeline.map((step, index) => {
                    const Icon = step.icon;
                    return (
                      <div key={index} className="flex items-center space-x-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          step.completed 
                            ? 'bg-primary text-white' 
                            : step.active 
                              ? 'bg-warning text-white' 
                              : 'bg-muted text-muted-foreground'
                        }`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <p className={`font-medium ${step.active ? 'text-warning' : ''}`}>
                            {step.status}
                          </p>
                          {step.time && (
                            <p className="text-sm text-muted-foreground">{step.time}</p>
                          )}
                        </div>
                        {step.active && (
                          <Badge variant="default">Current</Badge>
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Order Items */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Order Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {trackedOrder.items.map((item, index) => (
                  <div key={index} className="flex justify-between">
                    <span>{item.quantity}x {item.name}</span>
                    <span className="font-medium">₹{item.price * item.quantity}</span>
                  </div>
                ))}
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span className="text-primary">₹{trackedOrder.total}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Help Section */}
        <Card className="max-w-md mx-auto mt-8 shadow-card">
          <CardHeader>
            <CardTitle>Need Help?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              If you can't find your order or need assistance, please contact our support team.
            </p>
            <Button variant="outline" className="w-full">
              Contact Support
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}