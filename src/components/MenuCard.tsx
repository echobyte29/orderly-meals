import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Minus } from "lucide-react";
import { useState } from "react";

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  available: boolean;
  isVeg?: boolean;
}

interface MenuCardProps {
  item: MenuItem;
  quantity?: number;
  onAddToCart?: (item: MenuItem, quantity: number) => void;
  onQuantityChange?: (itemId: string, quantity: number) => void;
  showQuantityControls?: boolean;
}

export function MenuCard({ 
  item, 
  quantity = 0, 
  onAddToCart, 
  onQuantityChange,
  showQuantityControls = false 
}: MenuCardProps) {
  const [localQuantity, setLocalQuantity] = useState(quantity);

  const handleIncrement = () => {
    const newQuantity = localQuantity + 1;
    setLocalQuantity(newQuantity);
    if (onQuantityChange) {
      onQuantityChange(item.id, newQuantity);
    } else if (onAddToCart) {
      onAddToCart(item, 1);
    }
  };

  const handleDecrement = () => {
    if (localQuantity > 0) {
      const newQuantity = localQuantity - 1;
      setLocalQuantity(newQuantity);
      if (onQuantityChange) {
        onQuantityChange(item.id, newQuantity);
      }
    }
  };

  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(item, 1);
      setLocalQuantity(prev => prev + 1);
    }
  };

  return (
    <Card className="overflow-hidden shadow-card hover:shadow-warm transition-all duration-300 group">
      <div className="relative overflow-hidden">
        <img 
          src={item.image} 
          alt={item.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {!item.available && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <Badge variant="destructive">Out of Stock</Badge>
          </div>
        )}
        {item.isVeg !== undefined && (
          <Badge 
            variant={item.isVeg ? "secondary" : "destructive"}
            className="absolute top-2 left-2"
          >
            {item.isVeg ? "🌱 Veg" : "🍖 Non-Veg"}
          </Badge>
        )}
      </div>
      
      <CardContent className="p-4">
        <div className="space-y-2">
          <h3 className="font-semibold text-lg line-clamp-1">{item.name}</h3>
          <p className="text-muted-foreground text-sm line-clamp-2">{item.description}</p>
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-primary">₹{item.price}</span>
            <Badge variant="outline">{item.category}</Badge>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        {showQuantityControls && localQuantity > 0 ? (
          <div className="flex items-center justify-center space-x-3 w-full">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleDecrement}
              disabled={localQuantity === 0}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="font-semibold text-lg min-w-[2rem] text-center">
              {localQuantity}
            </span>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleIncrement}
              disabled={!item.available}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <Button 
            onClick={handleAddToCart}
            disabled={!item.available}
            className="w-full bg-gradient-primary hover:opacity-90 transition-opacity"
          >
            Add to Cart
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}