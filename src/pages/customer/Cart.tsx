import { useState } from "react";
import { Navigation } from "@/components/ui/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { mockMenuItems } from "./Menu";
import { MenuItem } from "@/components/MenuCard";
import { createOrder } from "@/lib/db";
import { Link, useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";

export default function CustomerCart() {
  const [cartItems, setCartItems] = useState<MenuItem[]>(mockMenuItems.slice(0, 2));
  const navigate = useNavigate();

  const totalAmount = cartItems.reduce((sum, item) => sum + item.price, 0);

  const handleCheckout = () => {
    createOrder({
      customerName: "Test Customer",
      items: cartItems,
    });
    navigate("/payment");
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navigation userType="customer" cartCount={cartItems.length} />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2 bg-gradient-primary bg-clip-text text-transparent">
              Your Cart
            </h1>
            <p className="text-lg text-muted-foreground">
              Review your items and proceed to checkout
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Cart Items</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <img src={item.image} alt={item.name} className="w-16 h-16 rounded-md object-cover" />
                        <div>
                          <p className="font-semibold">{item.name}</p>
                          <p className="text-sm text-muted-foreground">₹{item.price}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <p className="text-muted-foreground">Subtotal</p>
                    <p>₹{totalAmount.toFixed(2)}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-muted-foreground">Taxes & Charges</p>
                    <p>₹{(totalAmount * 0.1).toFixed(2)}</p>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold text-lg">
                    <p>Total</p>
                    <p>₹{(totalAmount * 1.1).toFixed(2)}</p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-gradient-primary" onClick={handleCheckout}>
                    Proceed to Checkout
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}