import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Order } from "@/lib/db";
import { Clock, CheckCircle, Truck, Package } from "lucide-react";

interface OrderCardProps {
  order: Order;
  userType: "client" | "customer";
  onStatusChange?: (orderId: string, status: Order["status"]) => void;
}

const statusDetails: Record<Order["status"], { icon: JSX.Element, color: string, text: string }> = {
  Pending: { icon: <Clock className="h-4 w-4" />, color: "bg-yellow-500", text: "Pending" },
  Confirmed: { icon: <CheckCircle className="h-4 w-4" />, color: "bg-blue-500", text: "Confirmed" },
  "Out for delivery": { icon: <Truck className="h-4 w-4" />, color: "bg-purple-500", text: "Out for Delivery" },
  Delivered: { icon: <Package className="h-4 w-4" />, color: "bg-green-500", text: "Delivered" },
};

export function OrderCard({ order, userType, onStatusChange }: OrderCardProps) {
  const totalAmount = order.items.reduce((sum, item) => sum + item.price, 0);

  return (
    <Card className="shadow-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-bold">Order #{order.id.slice(-6)}</CardTitle>
          <Badge variant="default" className="flex items-center">
            <div className={`h-2 w-2 rounded-full mr-2 ${statusDetails[order.status].color}`} />
            {statusDetails[order.status].text}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">{new Date(order.createdAt).toLocaleString()}</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p className="font-semibold">{order.customerName}</p>
          <ul className="text-sm text-muted-foreground list-disc list-inside">
            {order.items.map(item => (
              <li key={item.id}>{item.name}</li>
            ))}
          </ul>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <p className="font-bold text-lg">₹{totalAmount.toFixed(2)}</p>
        {userType === "client" && onStatusChange && (
          <Select
            value={order.status}
            onValueChange={(value: Order["status"]) => onStatusChange(order.id, value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Update status" />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(statusDetails).map(status => (
                <SelectItem key={status} value={status}>{status}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </CardFooter>
    </Card>
  );
}