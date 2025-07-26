import { MenuItem } from "@/components/MenuCard";

export interface Order {
  id: string;
  customerName: string;
  items: MenuItem[];
  status: "Pending" | "Confirmed" | "Out for delivery" | "Delivered";
  createdAt: string;
}

const orders: Order[] = [];

export const getOrders = () => orders;

export const getOrder = (id: string) => orders.find((order) => order.id === id);

export const createOrder = (order: Omit<Order, "id" | "status" | "createdAt">) => {
  const newOrder: Order = {
    ...order,
    id: `order_${Date.now()}`,
    status: "Pending",
    createdAt: new Date().toISOString(),
  };
  orders.push(newOrder);
  return newOrder;
};

export const updateOrderStatus = (id: string, status: Order["status"]) => {
  const order = getOrder(id);
  if (order) {
    order.status = status;
  }
  return order;
};

export const deleteOrder = (id: string) => {
  const index = orders.findIndex((order) => order.id === id);
  if (index !== -1) {
    orders.splice(index, 1);
    return true;
  }
  return false;
};
