import { Navigation } from "@/components/ui/navigation";
import { OrderCard, Order } from "@/components/OrderCard";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ClipboardList } from "lucide-react";

// Mock orders data - replace with API calls when Supabase is connected
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
    status: "preparing",
    timestamp: "2024-01-20T14:30:00Z",
    paymentStatus: "success",
    transactionId: "rzp_test_123456"
  },
  {
    id: "ord_002", 
    customerName: "John Doe",
    customerPhone: "+91-98765-43210",
    customerAddress: "123 MG Road, Bangalore, Karnataka 560001",
    items: [
      { name: "Biryani Special", quantity: 1, price: 349 },
      { name: "Raita", quantity: 1, price: 79 }
    ],
    total: 428,
    status: "delivered",
    timestamp: "2024-01-19T19:15:00Z",
    paymentStatus: "success",
    transactionId: "rzp_test_789012"
  },
  {
    id: "ord_003",
    customerName: "John Doe", 
    customerPhone: "+91-98765-43210",
    customerAddress: "123 MG Road, Bangalore, Karnataka 560001",
    items: [
      { name: "Masala Dosa", quantity: 2, price: 149 },
      { name: "Filter Coffee", quantity: 2, price: 69 }
    ],
    total: 436,
    status: "cancelled",
    timestamp: "2024-01-18T09:45:00Z",
    paymentStatus: "failed",
    transactionId: "rzp_test_345678"
  }
];

export default function CustomerOrders() {
  const activeOrders = mockOrders.filter(order => 
    ['pending', 'accepted', 'preparing', 'ready'].includes(order.status)
  );
  
  const completedOrders = mockOrders.filter(order => 
    ['delivered', 'cancelled'].includes(order.status)
  );

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navigation userType="customer" cartCount={0} />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-primary bg-clip-text text-transparent">
          My Orders
        </h1>

        {mockOrders.length === 0 ? (
          <Card className="text-center py-12 shadow-card">
            <CardContent>
              <ClipboardList className="h-24 w-24 text-muted-foreground mx-auto mb-6" />
              <h3 className="text-2xl font-semibold mb-4">No orders yet</h3>
              <p className="text-lg text-muted-foreground">
                You haven't placed any orders. Start by browsing our delicious menu!
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-8">
            {/* Active Orders */}
            {activeOrders.length > 0 && (
              <div>
                <div className="flex items-center space-x-2 mb-6">
                  <h2 className="text-2xl font-bold">Active Orders</h2>
                  <Badge variant="default">{activeOrders.length}</Badge>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {activeOrders.map((order) => (
                    <OrderCard
                      key={order.id}
                      order={order}
                      isClientView={false}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Order History */}
            {completedOrders.length > 0 && (
              <div>
                <div className="flex items-center space-x-2 mb-6">
                  <h2 className="text-2xl font-bold">Order History</h2>
                  <Badge variant="outline">{completedOrders.length}</Badge>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {completedOrders.map((order) => (
                    <OrderCard
                      key={order.id}
                      order={order}
                      isClientView={false}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}