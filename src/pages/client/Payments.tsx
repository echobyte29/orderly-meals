import { useState } from "react";
import { Navigation } from "@/components/ui/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CreditCard, DollarSign, TrendingUp, AlertCircle, Eye, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock payment data
const mockPayments = [
  {
    id: "pay_001",
    orderId: "ord_001",
    customer: "John Doe",
    amount: 794,
    status: "success",
    method: "UPI",
    transactionId: "rzp_test_123456",
    timestamp: "2024-01-20T14:30:00Z",
    fee: 19.85
  },
  {
    id: "pay_002", 
    orderId: "ord_002",
    customer: "Jane Smith",
    amount: 428,
    status: "success",
    method: "Credit Card",
    transactionId: "rzp_test_789012",
    timestamp: "2024-01-20T14:25:00Z",
    fee: 12.84
  },
  {
    id: "pay_003",
    orderId: "ord_003",
    customer: "Mike Johnson",
    amount: 675,
    status: "failed",
    method: "Debit Card",
    transactionId: "rzp_test_345678",
    timestamp: "2024-01-20T14:20:00Z",
    fee: 0
  }
];

export default function ClientPayments() {
  const [razorpayConfig, setRazorpayConfig] = useState({
    keyId: "",
    keySecret: "",
    webhookSecret: ""
  });
  const [dateFilter, setDateFilter] = useState("today");
  const { toast } = useToast();

  const handleSaveConfig = () => {
    // Here you would save to Supabase secrets or backend
    toast({
      title: "Configuration saved",
      description: "Razorpay settings have been updated successfully.",
    });
  };

  const successfulPayments = mockPayments.filter(p => p.status === "success");
  const totalRevenue = successfulPayments.reduce((sum, p) => sum + p.amount, 0);
  const totalFees = successfulPayments.reduce((sum, p) => sum + p.fee, 0);
  const netRevenue = totalRevenue - totalFees;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "success":
        return <Badge className="bg-success">Success</Badge>;
      case "failed":
        return <Badge variant="destructive">Failed</Badge>;
      case "pending":
        return <Badge className="bg-warning">Pending</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navigation userType="client" />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 bg-gradient-primary bg-clip-text text-transparent">
          Payment Management
        </h1>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Revenue Stats */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="shadow-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">₹{totalRevenue.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">+12% from yesterday</p>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Net Revenue</CardTitle>
                  <TrendingUp className="h-4 w-4 text-success" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-success">₹{netRevenue.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">After fees</p>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Transaction Fees</CardTitle>
                  <CreditCard className="h-4 w-4 text-warning" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-warning">₹{totalFees.toFixed(2)}</div>
                  <p className="text-xs text-muted-foreground">{((totalFees / totalRevenue) * 100).toFixed(1)}% of revenue</p>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
                  <AlertCircle className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">
                    {((successfulPayments.length / mockPayments.length) * 100).toFixed(1)}%
                  </div>
                  <p className="text-xs text-muted-foreground">{successfulPayments.length} of {mockPayments.length} transactions</p>
                </CardContent>
              </Card>
            </div>

            {/* Payment Methods Breakdown */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Payment Methods</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {["UPI", "Credit Card", "Debit Card", "Net Banking"].map((method) => {
                    const methodPayments = successfulPayments.filter(p => p.method === method);
                    const methodRevenue = methodPayments.reduce((sum, p) => sum + p.amount, 0);
                    const percentage = totalRevenue > 0 ? (methodRevenue / totalRevenue) * 100 : 0;
                    
                    return (
                      <div key={method} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{method}</p>
                          <p className="text-sm text-muted-foreground">{methodPayments.length} transactions</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-primary">₹{methodRevenue.toLocaleString()}</p>
                          <p className="text-sm text-muted-foreground">{percentage.toFixed(1)}%</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="transactions" className="space-y-6">
            {/* Filters */}
            <Card className="shadow-card">
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <Select value={dateFilter} onValueChange={setDateFilter}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Filter by date" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="today">Today</SelectItem>
                      <SelectItem value="week">This Week</SelectItem>
                      <SelectItem value="month">This Month</SelectItem>
                      <SelectItem value="custom">Custom Range</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export CSV
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Transactions Table */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockPayments.map((payment) => (
                    <div key={payment.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <p className="font-medium">{payment.customer}</p>
                          {getStatusBadge(payment.status)}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {payment.transactionId} • {new Date(payment.timestamp).toLocaleString()}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Order #{payment.orderId} • {payment.method}
                        </p>
                      </div>
                      <div className="text-right space-y-1">
                        <p className="font-bold text-lg text-primary">₹{payment.amount}</p>
                        {payment.status === "success" && (
                          <p className="text-sm text-muted-foreground">Fee: ₹{payment.fee}</p>
                        )}
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Razorpay Configuration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="keyId">API Key ID</Label>
                  <Input
                    id="keyId"
                    type="text"
                    placeholder="rzp_test_xxxxxxxxxx"
                    value={razorpayConfig.keyId}
                    onChange={(e) => setRazorpayConfig(prev => ({ ...prev, keyId: e.target.value }))}
                  />
                </div>

                <div>
                  <Label htmlFor="keySecret">API Key Secret</Label>
                  <Input
                    id="keySecret"
                    type="password"
                    placeholder="Enter your API key secret"
                    value={razorpayConfig.keySecret}
                    onChange={(e) => setRazorpayConfig(prev => ({ ...prev, keySecret: e.target.value }))}
                  />
                </div>

                <div>
                  <Label htmlFor="webhookSecret">Webhook Secret</Label>
                  <Input
                    id="webhookSecret"
                    type="password"
                    placeholder="Enter webhook secret"
                    value={razorpayConfig.webhookSecret}
                    onChange={(e) => setRazorpayConfig(prev => ({ ...prev, webhookSecret: e.target.value }))}
                  />
                </div>

                <Button onClick={handleSaveConfig} className="bg-gradient-primary">
                  Save Configuration
                </Button>

                <div className="mt-6 p-4 bg-muted rounded-lg">
                  <h4 className="font-semibold mb-2">Setup Instructions:</h4>
                  <ol className="text-sm space-y-1 list-decimal list-inside text-muted-foreground">
                    <li>Create a Razorpay account at razorpay.com</li>
                    <li>Generate API keys from your Razorpay dashboard</li>
                    <li>Set up webhooks to receive payment notifications</li>
                    <li>Enter your API credentials above to enable payments</li>
                  </ol>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Payment Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="minOrder">Minimum Order Amount (₹)</Label>
                    <Input
                      id="minOrder"
                      type="number"
                      placeholder="100"
                    />
                  </div>
                  <div>
                    <Label htmlFor="deliveryFee">Delivery Fee (₹)</Label>
                    <Input
                      id="deliveryFee"
                      type="number"
                      placeholder="50"
                    />
                  </div>
                </div>
                <Button variant="outline">
                  Update Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}