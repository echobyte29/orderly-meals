import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, MapPin, Phone, User, Eye } from "lucide-react";

export interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  total: number;
  status: 'pending' | 'accepted' | 'preparing' | 'ready' | 'delivered' | 'cancelled';
  timestamp: string;
  paymentStatus: 'success' | 'failed' | 'pending';
  transactionId?: string;
}

interface OrderCardProps {
  order: Order;
  onStatusChange?: (orderId: string, status: Order['status']) => void;
  onViewDetails?: (order: Order) => void;
  isClientView?: boolean;
}

const statusColors = {
  pending: 'bg-warning',
  accepted: 'bg-primary',
  preparing: 'bg-primary',
  ready: 'bg-success',
  delivered: 'bg-success',
  cancelled: 'bg-destructive'
};

const statusLabels = {
  pending: 'Pending',
  accepted: 'Accepted',
  preparing: 'Preparing',
  ready: 'Ready',
  delivered: 'Delivered',
  cancelled: 'Cancelled'
};

export function OrderCard({ order, onStatusChange, onViewDetails, isClientView = false }: OrderCardProps) {
  const handleStatusChange = (newStatus: Order['status']) => {
    if (onStatusChange) {
      onStatusChange(order.id, newStatus);
    }
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  const getNextStatus = (currentStatus: Order['status']): Order['status'] | null => {
    switch (currentStatus) {
      case 'pending': return 'accepted';
      case 'accepted': return 'preparing';
      case 'preparing': return 'ready';
      case 'ready': return 'delivered';
      default: return null;
    }
  };

  const nextStatus = getNextStatus(order.status);

  return (
    <Card className="shadow-card hover:shadow-warm transition-all duration-300">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Order #{order.id.slice(-6)}</CardTitle>
          <div className="flex items-center space-x-2">
            <Badge className={statusColors[order.status]}>
              {statusLabels[order.status]}
            </Badge>
            <Badge variant={order.paymentStatus === 'success' ? 'secondary' : 'destructive'}>
              {order.paymentStatus}
            </Badge>
          </div>
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <Clock className="h-4 w-4 mr-1" />
          {formatTime(order.timestamp)}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {isClientView && (
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">{order.customerName}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{order.customerPhone}</span>
            </div>
            <div className="flex items-start space-x-2">
              <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
              <span className="text-sm">{order.customerAddress}</span>
            </div>
          </div>
        )}
        
        <div className="space-y-2">
          <h4 className="font-medium">Items:</h4>
          <div className="space-y-1">
            {order.items.map((item, index) => (
              <div key={index} className="flex justify-between text-sm">
                <span>{item.quantity}x {item.name}</span>
                <span className="font-medium">₹{item.price * item.quantity}</span>
              </div>
            ))}
          </div>
          <div className="border-t pt-2 flex justify-between font-semibold">
            <span>Total:</span>
            <span className="text-primary">₹{order.total}</span>
          </div>
        </div>
        
        {isClientView && (
          <div className="flex space-x-2">
            {nextStatus && (
              <Button 
                size="sm" 
                onClick={() => handleStatusChange(nextStatus)}
                className="flex-1"
              >
                Mark as {statusLabels[nextStatus]}
              </Button>
            )}
            {order.status === 'pending' && (
              <Button 
                size="sm" 
                variant="destructive"
                onClick={() => handleStatusChange('cancelled')}
              >
                Cancel
              </Button>
            )}
            {onViewDetails && (
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => onViewDetails(order)}
              >
                <Eye className="h-4 w-4" />
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}