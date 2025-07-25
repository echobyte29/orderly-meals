import { useState } from "react";
import { Navigation } from "@/components/ui/navigation";
import { OrderCard, Order } from "@/components/OrderCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Search, Filter, Bell } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock orders data
const mockOrders: Order[] = [
  {
    id: "ord_001",
    customerName: "John Doe",
    customerPhone: "+91-98765-43210",
    customerAddress: "123 MG Road, Bangalore, Karnataka 560001",
    items: [
      { name: "Butter Chicken", quantity: 2, price: 299 },
      { name: "Naan", quantity: 4, price: 49 }
    ],
    total: 794,
    status: "pending",
    timestamp: "2024-01-20T14:30:00Z",
    paymentStatus: "success",
    transactionId: "rzp_test_123456"
  },
  {
    id: "ord_002",
    customerName: "Jane Smith", 
    customerPhone: "+91-87654-32109",
    customerAddress: "456 Brigade Road, Bangalore, Karnataka 560025",
    items: [
      { name: "Biryani Special", quantity: 1, price: 349 },
      { name: "Raita", quantity: 1, price: 79 }
    ],
    total: 428,
    status: "preparing",
    timestamp: "2024-01-20T14:25:00Z",
    paymentStatus: "success",
    transactionId: "rzp_test_789012"
  },
  {
    id: "ord_003",
    customerName: "Mike Johnson",
    customerPhone: "+91-76543-21098", 
    customerAddress: "789 Commercial Street, Bangalore, Karnataka 560001",
    items: [
      { name: "Paneer Tikka Masala", quantity: 2, price: 249 },
      { name: "Garlic Naan", quantity: 3, price: 59 }
    ],
    total: 675,
    status: "ready",
    timestamp: "2024-01-20T14:20:00Z",
    paymentStatus: "success",
    transactionId: "rzp_test_345678"
  }
];

export default function ClientOrders() {
  const [orders, setOrders] = useState(mockOrders);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const { toast } = useToast();

  const handleStatusChange = (orderId: string, newStatus: Order['status']) => {
    setOrders(prev => 
      prev.map(order => 
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );

    // Send webhook data to n8n
    const updatedOrder = orders.find(order => order.id === orderId);
    if (updatedOrder) {
      const webhookData = {
        client_name: "CloudKitchen Demo",
        order_id: orderId,
        customer_name: updatedOrder.customerName,
        phone: updatedOrder.customerPhone,
        address: updatedOrder.customerAddress,
        order: updatedOrder.items.map(item => `${item.quantity}x ${item.name}`),
        payment_status: updatedOrder.paymentStatus,
        transaction_id: updatedOrder.transactionId,
        priority: 1,
        status: newStatus,
        timestamp: new Date().toISOString()
      };
      
      console.log("Order status webhook data:", webhookData);
      
      toast({
        title: "Order status updated",
        description: `Order #${orderId.slice(-6)} marked as ${newStatus}.`,
      });
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerPhone.includes(searchQuery);
    
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusCount = (status: string) => {
    return orders.filter(order => order.status === status).length;
  };

  const urgentOrders = orders.filter(order => 
    order.status === 'pending' && 
    Date.now() - new Date(order.timestamp).getTime() > 10 * 60 * 1000 // 10 minutes
  ).length;

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navigation userType="client" />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Order Management
            </h1>
            <p className="text-lg text-muted-foreground">
              Manage and track all incoming orders
            </p>
          </div>
          
          {urgentOrders > 0 && (
            <Card className="border-warning shadow-warm">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2 text-warning">
                  <Bell className="h-5 w-5" />
                  <span className="font-medium">{urgentOrders} urgent orders!</span>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Status Overview */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          <Card className="shadow-card">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-warning">{getStatusCount('pending')}</div>
              <div className="text-sm text-muted-foreground">Pending</div>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{getStatusCount('accepted')}</div>
              <div className="text-sm text-muted-foreground">Accepted</div>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{getStatusCount('preparing')}</div>
              <div className="text-sm text-muted-foreground">Preparing</div>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-success">{getStatusCount('ready')}</div>
              <div className="text-sm text-muted-foreground">Ready</div>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-success">{getStatusCount('delivered')}</div>
              <div className="text-sm text-muted-foreground">Delivered</div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="shadow-card mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by customer name, order ID, or phone..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Orders</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="accepted">Accepted</SelectItem>
                  <SelectItem value="preparing">Preparing</SelectItem>
                  <SelectItem value="ready">Ready</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Orders Grid */}
        {filteredOrders.length === 0 ? (
          <Card className="shadow-card text-center py-12">
            <CardContent>
              <h3 className="text-xl font-semibold mb-2">No orders found</h3>
              <p className="text-muted-foreground">
                {searchQuery || statusFilter !== "all" 
                  ? "Try adjusting your search or filter criteria."
                  : "No orders have been placed yet."
                }
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredOrders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                onStatusChange={handleStatusChange}
                onViewDetails={setSelectedOrder}
                isClientView={true}
              />
            ))}
          </div>
        )}

        {/* Order Details Modal */}
        <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                Order Details #{selectedOrder?.id.slice(-6)}
              </DialogTitle>
            </DialogHeader>
            {selectedOrder && (
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">Customer Information</h4>
                    <div className="space-y-2 text-sm">
                      <p><strong>Name:</strong> {selectedOrder.customerName}</p>
                      <p><strong>Phone:</strong> {selectedOrder.customerPhone}</p>
                      <p><strong>Address:</strong> {selectedOrder.customerAddress}</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Order Information</h4>
                    <div className="space-y-2 text-sm">
                      <p><strong>Order Time:</strong> {new Date(selectedOrder.timestamp).toLocaleString()}</p>
                      <p><strong>Payment:</strong> 
                        <Badge variant={selectedOrder.paymentStatus === 'success' ? 'secondary' : 'destructive'} className="ml-2">
                          {selectedOrder.paymentStatus}
                        </Badge>
                      </p>
                      <p><strong>Transaction ID:</strong> {selectedOrder.transactionId}</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Order Items</h4>
                  <div className="space-y-2">
                    {selectedOrder.items.map((item, index) => (
                      <div key={index} className="flex justify-between text-sm p-2 bg-muted rounded">
                        <span>{item.quantity}x {item.name}</span>
                        <span className="font-medium">₹{item.price * item.quantity}</span>
                      </div>
                    ))}
                    <div className="flex justify-between font-bold text-lg pt-2 border-t">
                      <span>Total:</span>
                      <span className="text-primary">₹{selectedOrder.total}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}