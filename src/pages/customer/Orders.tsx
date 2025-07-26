import { useState, useEffect } from "react";
import { Navigation } from "@/components/ui/navigation";
import { OrderCard } from "@/components/OrderCard";
import { getOrders, Order } from "@/lib/db";
import { Badge } from "@/components/ui/badge";

export default function CustomerOrders() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    setOrders(getOrders());
  }, []);

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navigation userType="customer" />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-primary bg-clip-text text-transparent">
            My Orders
          </h1>
          <p className="text-lg text-muted-foreground">
            Track your current and past orders
          </p>
        </div>

        <div className="space-y-8">
          {orders.length > 0 ? (
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {orders.map((order) => (
                <OrderCard
                  key={order.id}
                  order={order}
                  userType="customer"
                />
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">You haven't placed any orders yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}