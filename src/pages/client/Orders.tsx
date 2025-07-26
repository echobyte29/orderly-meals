import { useState, useEffect } from "react";
import { Navigation } from "@/components/ui/navigation";
import { OrderCard } from "@/components/OrderCard";
import { getOrders, updateOrderStatus, Order } from "@/lib/db";
import { Badge } from "@/components/ui/badge";

export default function ClientOrders() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    setOrders(getOrders());
  }, []);

  const handleStatusChange = (orderId: string, status: Order["status"]) => {
    updateOrderStatus(orderId, status);
    setOrders(getOrders());
  };

  const upcomingOrders = orders.filter(o => o.status === "Pending" || o.status === "Confirmed");
  const pastOrders = orders.filter(o => o.status === "Delivered" || o.status === "Out for delivery");

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navigation userType="client" />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-primary bg-clip-text text-transparent">
            Incoming Orders
          </h1>
          <p className="text-lg text-muted-foreground">
            Manage and track customer orders in real-time
          </p>
        </div>

        <div className="space-y-8">
          <div>
            <div className="flex items-center mb-4">
              <h2 className="text-2xl font-bold">Upcoming Orders</h2>
              <Badge variant="default" className="ml-4">{upcomingOrders.length}</Badge>
            </div>
            {upcomingOrders.length > 0 ? (
              <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {upcomingOrders.map((order) => (
                  <OrderCard
                    key={order.id}
                    order={order}
                    userType="client"
                    onStatusChange={handleStatusChange}
                  />
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No upcoming orders.</p>
            )}
          </div>

          <div>
            <div className="flex items-center mb-4">
              <h2 className="text-2xl font-bold">Past Orders</h2>
              <Badge variant="outline" className="ml-4">{pastOrders.length}</Badge>
            </div>
            {pastOrders.length > 0 ? (
              <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pastOrders.map((order) => (
                  <OrderCard
                    key={order.id}
                    order={order}
                    userType="client"
                  />
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No past orders.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}