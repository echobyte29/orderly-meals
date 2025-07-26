import { Navigation } from "@/components/ui/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { getOrders, updateOrderStatus } from "@/lib/db";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function Payment() {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handlePayment = () => {
    const orders = getOrders();
    const order = orders[orders.length - 1];
    const totalAmount = order.items.reduce((sum, item) => sum + item.price, 0);

    const options = {
      key: "rzp_test_1DPv2jVd3f3f3f", // Replace with your test key
      amount: totalAmount * 100, // Amount in paise
      currency: "INR",
      name: "CloudKitchen",
      description: "Order Payment",
      image: "https://example.com/your_logo.jpg",
      handler: function (response: any) {
        toast({
          title: "Payment Successful",
          description: `Payment ID: ${response.razorpay_payment_id}`,
        });

        updateOrderStatus(order.id, "Confirmed");

        navigate("/order-confirmation");
      },
      prefill: {
        name: "Test Customer",
        email: "test.customer@example.com",
        contact: "9999999999",
      },
      notes: {
        address: "Test Address, Pune",
      },
      theme: {
        color: "#3399cc",
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navigation userType="customer" />
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Payment
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Complete your order by making a payment.
          </p>
        </div>
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Payment Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-muted-foreground">Amount to pay</p>
                <p className="text-2xl font-bold">₹{getOrders()[getOrders().length - 1].items.reduce((sum, item) => sum + item.price, 0).toFixed(2)}</p>
              </div>
              <Button className="w-full bg-gradient-primary" onClick={handlePayment}>
                Pay with Razorpay
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
