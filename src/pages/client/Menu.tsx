import { useState } from "react";
import { Navigation } from "@/components/ui/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { MenuCard, MenuItem } from "@/components/MenuCard";
import { Plus, Edit, Trash2, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const categories = ["Main Course", "Rice", "South Indian", "Desserts", "Beverages"];

// Mock menu data
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
  }
];

export default function ClientMenu() {
  const [menuItems, setMenuItems] = useState(mockMenuItems);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: "",
    available: true,
    isVeg: true
  });
  const { toast } = useToast();

  const resetForm = () => {
    setFormData({
      name: "",
      description: "", 
      price: "",
      category: "",
      image: "",
      available: true,
      isVeg: true
    });
    setEditingItem(null);
  };

  const handleOpenDialog = (item?: MenuItem) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        name: item.name,
        description: item.description,
        price: item.price.toString(),
        category: item.category,
        image: item.image,
        available: item.available,
        isVeg: item.isVeg || false
      });
    } else {
      resetForm();
    }
    setIsDialogOpen(true);
  };

  const handleSaveItem = () => {
    if (!formData.name || !formData.description || !formData.price || !formData.category) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const newItem: MenuItem = {
      id: editingItem?.id || `item_${Date.now()}`,
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
      category: formData.category,
      image: formData.image || "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400",
      available: formData.available,
      isVeg: formData.isVeg
    };

    if (editingItem) {
      setMenuItems(prev => prev.map(item => item.id === editingItem.id ? newItem : item));
      toast({
        title: "Item updated",
        description: `${newItem.name} has been updated.`,
      });
    } else {
      setMenuItems(prev => [...prev, newItem]);
      toast({
        title: "Item added",
        description: `${newItem.name} has been added to the menu.`,
      });
    }

    // Send webhook data to n8n for menu updates
    const webhookData = {
      action: editingItem ? "update" : "create",
      item: newItem,
      kitchen_name: "CloudKitchen Demo",
      timestamp: new Date().toISOString()
    };
    console.log("Menu update webhook data:", webhookData);

    setIsDialogOpen(false);
    resetForm();
  };

  const handleDeleteItem = (itemId: string) => {
    const item = menuItems.find(i => i.id === itemId);
    setMenuItems(prev => prev.filter(item => item.id !== itemId));
    
    if (item) {
      // Send webhook data for deletion
      const webhookData = {
        action: "delete",
        item_id: itemId,
        item_name: item.name,
        kitchen_name: "CloudKitchen Demo",
        timestamp: new Date().toISOString()
      };
      console.log("Menu delete webhook data:", webhookData);
      
      toast({
        title: "Item deleted",
        description: `${item.name} has been removed from the menu.`,
      });
    }
  };

  const handleToggleAvailability = (itemId: string) => {
    setMenuItems(prev => prev.map(item => 
      item.id === itemId ? { ...item, available: !item.available } : item
    ));
    
    const item = menuItems.find(i => i.id === itemId);
    if (item) {
      toast({
        title: `Item ${!item.available ? 'enabled' : 'disabled'}`,
        description: `${item.name} is now ${!item.available ? 'available' : 'unavailable'}.`,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navigation userType="client" />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Menu Editor
            </h1>
            <p className="text-lg text-muted-foreground">
              Manage your restaurant menu items
            </p>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => handleOpenDialog()} className="bg-gradient-primary">
                <Plus className="h-4 w-4 mr-2" />
                Add New Item
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>
                  {editingItem ? "Edit Menu Item" : "Add New Menu Item"}
                </DialogTitle>
              </DialogHeader>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Item Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="e.g., Butter Chicken"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="price">Price (₹) *</Label>
                    <Input
                      id="price"
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                      placeholder="299"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="category">Category *</Label>
                    <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="image">Image URL</Label>
                    <Input
                      id="image"
                      value={formData.image}
                      onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="description">Description *</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Describe the dish..."
                      rows={4}
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="available">Available</Label>
                      <Switch
                        id="available"
                        checked={formData.available}
                        onCheckedChange={(checked) => setFormData(prev => ({ ...prev, available: checked }))}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label htmlFor="isVeg">Vegetarian</Label>
                      <Switch
                        id="isVeg"
                        checked={formData.isVeg}
                        onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isVeg: checked }))}
                      />
                    </div>
                  </div>
                  
                  <Button onClick={handleSaveItem} className="w-full bg-gradient-primary">
                    {editingItem ? "Update Item" : "Add Item"}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Menu Statistics */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="shadow-card">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{menuItems.length}</div>
              <div className="text-sm text-muted-foreground">Total Items</div>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-success">{menuItems.filter(item => item.available).length}</div>
              <div className="text-sm text-muted-foreground">Available</div>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-warning">{menuItems.filter(item => !item.available).length}</div>
              <div className="text-sm text-muted-foreground">Out of Stock</div>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{categories.length}</div>
              <div className="text-sm text-muted-foreground">Categories</div>
            </CardContent>
          </Card>
        </div>

        {/* Menu Items by Category */}
        {categories.map((category) => {
          const categoryItems = menuItems.filter(item => item.category === category);
          if (categoryItems.length === 0) return null;
          
          return (
            <div key={category} className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">{category}</h2>
                <Badge variant="outline">{categoryItems.length} items</Badge>
              </div>
              
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {categoryItems.map((item) => (
                  <Card key={item.id} className="shadow-card group">
                    <div className="relative">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="flex space-x-1">
                          <Button
                            size="sm"
                            variant="secondary"
                            onClick={() => handleOpenDialog(item)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDeleteItem(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      {!item.available && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-t-lg">
                          <Badge variant="destructive">Out of Stock</Badge>
                        </div>
                      )}
                    </div>
                    
                    <CardContent className="p-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold">{item.name}</h3>
                          <Badge variant={item.isVeg ? "secondary" : "destructive"}>
                            {item.isVeg ? "🌱" : "🍖"}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {item.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-xl font-bold text-primary">₹{item.price}</span>
                          <Switch
                            checked={item.available}
                            onCheckedChange={() => handleToggleAvailability(item.id)}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          );
        })}

        {menuItems.length === 0 && (
          <Card className="shadow-card text-center py-12">
            <CardContent>
              <h3 className="text-xl font-semibold mb-2">No menu items yet</h3>
              <p className="text-muted-foreground mb-4">
                Start building your menu by adding your first dish.
              </p>
              <Button onClick={() => handleOpenDialog()} className="bg-gradient-primary">
                <Plus className="h-4 w-4 mr-2" />
                Add First Item
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}