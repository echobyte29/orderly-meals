import { Navigation } from "@/components/ui/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

export default function OrderConfirmation() {
  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navigation userType="customer" />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto text-center">
          <Card>
            <CardHeader>
              <div className="mx-auto bg-green-100 rounded-full h-16 w-16 flex items-center justify-center">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <CardTitle className="text-2xl font-bold">Order Confirmed!</CardTitle>
              <p className="text-muted-foreground">
                Thank you for your order. You can track the status of your order in the "My Orders" section.
              </p>
              <div className="flex justify-center space-x-4">
                <Link to="/orders">
                  <Button>Track Order</Button>
                </Link>
                <Link to="/menu">
                  <Button variant="outline">Continue Shopping</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
