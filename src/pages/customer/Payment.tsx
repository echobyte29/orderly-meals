import { Navigation } from "@/components/ui/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function Payment() {
  const { toast } = useToast();

  const handlePayment = () => {
    const options = {
      key: "rzp_test_1DPv2jVd3f3f3f", // Replace with your test key
      amount: 54800, // Amount in paise
      currency: "INR",
      name: "CloudKitchen",
      description: "Order Payment",
      image: "https://example.com/your_logo.jpg",
      handler: function (response: any) {
        toast({
          title: "Payment Successful",
          description: `Payment ID: ${response.razorpay_payment_id}`,
        });

        // Send order data to n8n webhook
        const orderData = {
          payment_id: response.razorpay_payment_id,
          customer_name: "Test Customer",
          customer_email: "test.customer@example.com",
          customer_contact: "9999999999",
          address: "Test Address, Pune",
          amount: 548,
          items: [
            { id: "1", name: "Butter Chicken", quantity: 1 },
            { id: "2", name: "Paneer Tikka Masala", quantity: 1 },
          ],
          timestamp: new Date().toISOString()
        };

        fetch("https://n8n.cloud.u-d-g.ch/webhook/31631a0e-2b45-43f6-9333-3ec974a614ca", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderData),
        })
        .then(res => res.json())
        .then(data => console.log("Webhook response:", data))
        .catch(err => console.error("Webhook error:", err));

        console.log("Payment successful:", response);
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
                <p className="text-2xl font-bold">₹548</p>
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
