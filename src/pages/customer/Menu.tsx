import { useState } from "react";
import { Navigation } from "@/components/ui/navigation";
import { MenuCard, MenuItem } from "@/components/MenuCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Filter } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock data - replace with API calls when Supabase is connected
const mockMenuItems: MenuItem[] = [
  {
    id: "1",
    name: "Butter Chicken",
    description: "Creamy tomato-based curry with tender chicken pieces",
    price: 299,
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400",
    category: "Main Course",
    available: true,
    isVeg: false
  },
  {
    id: "2", 
    name: "Paneer Tikka Masala",
    description: "Grilled cottage cheese in rich spiced gravy",
    price: 249,
    image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400",
    category: "Main Course",
    available: true,
    isVeg: true
  },
  {
    id: "3",
    name: "Biryani Special",
    description: "Aromatic basmati rice with spiced meat and saffron",
    price: 349,
    image: "https://images.unsplash.com/photo-1563379091339-03246963d25a?w=400",
    category: "Rice",
    available: true,
    isVeg: false
  },
  {
    id: "4",
    name: "Masala Dosa",
    description: "Crispy crepe filled with spiced potato curry",
    price: 149,
    image: "https://images.unsplash.com/photo-1630383249896-424e482df921?w=400",
    category: "South Indian",
    available: true,
    isVeg: true
  },
  {
    id: "5",
    name: "Gulab Jamun",
    description: "Sweet milk dumplings in sugar syrup",
    price: 99,
    image: "https://images.unsplash.com/photo-1626132647523-66f3bf8f4d04?w=400",
    category: "Desserts",
    available: false,
    isVeg: true
  },
  {
    id: "6",
    name: "Caesar Salad",
    description: "Fresh romaine lettuce with Caesar dressing, croutons, and Parmesan cheese.",
    price: 199,
    image: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=400",
    category: "Salads",
    available: true,
    isVeg: true
  },
  {
    id: "7",
    name: "Spaghetti Carbonara",
    description: "Classic Italian pasta with eggs, cheese, pancetta, and black pepper.",
    price: 329,
    image: "https://images.unsplash.com/photo-1608796316151-37a4ea8e8a69?w=400",
    category: "Main Course",
    available: true,
    isVeg: false
  },
  {
    id: "8",
    name: "Chocolate Lava Cake",
    description: "Warm, gooey chocolate cake with a molten center.",
    price: 129,
    image: "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?w=400",
    category: "Desserts",
    available: true,
    isVeg: true
  }
];

const categories = ["All", "Main Course", "Rice", "South Indian", "Desserts", "Beverages"];

export default function CustomerMenu() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [cart, setCart] = useState<Record<string, number>>({});
  const { toast } = useToast();

  const filteredItems = mockMenuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddToCart = (item: MenuItem, quantity: number) => {
    setCart(prev => ({
      ...prev,
      [item.id]: (prev[item.id] || 0) + quantity
    }));
    
    toast({
      title: "Added to cart",
      description: `${item.name} has been added to your cart.`,
    });
  };

  const cartCount = Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navigation userType="customer" cartCount={cartCount} />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Our Menu
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our delicious selection of freshly prepared meals, crafted with love and the finest ingredients.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search for dishes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category ? "bg-gradient-primary" : ""}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Menu Items */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <MenuCard
              key={item.id}
              item={item}
              quantity={cart[item.id] || 0}
              onAddToCart={handleAddToCart}
              showQuantityControls={false}
            />
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold mb-2">No dishes found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filter criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}