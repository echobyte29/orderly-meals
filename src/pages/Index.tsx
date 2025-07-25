import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChefHat, Users, Clock, Shield, Star, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-kitchen.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="border-b bg-card/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ChefHat className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                CloudKitchen
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/menu">
                <Button variant="ghost">Browse Menu</Button>
              </Link>
              <Link to="/client">
                <Button variant="outline">Kitchen Login</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Cloud Kitchen Hero" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative container mx-auto px-4 py-24 text-center text-white">
          <Badge className="mb-6 bg-primary/20 text-white border-white/20">
            Fresh • Fast • Delicious
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Taste the Future of
            <span className="block bg-gradient-warm bg-clip-text text-transparent">
              Cloud Cooking
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
            Experience premium quality meals prepared by expert chefs, delivered fresh to your doorstep. 
            From our cloud kitchen to your table.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/menu">
              <Button size="lg" className="bg-gradient-primary hover:opacity-90 text-lg px-8 py-6">
                Order Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/client">
              <Button size="lg" variant="outline" className="text-white border-white/30 hover:bg-white/10 text-lg px-8 py-6">
                Become a Partner
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose CloudKitchen?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We're revolutionizing food delivery with quality, speed, and innovation at every step.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center p-6 shadow-card hover:shadow-warm transition-all duration-300">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto">
                  <ChefHat className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold">Expert Chefs</h3>
                <p className="text-muted-foreground">
                  Professional chefs creating restaurant-quality meals with premium ingredients.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-6 shadow-card hover:shadow-warm transition-all duration-300">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto">
                  <Clock className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold">Fast Delivery</h3>
                <p className="text-muted-foreground">
                  Quick preparation and delivery to ensure your food arrives hot and fresh.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-6 shadow-card hover:shadow-warm transition-all duration-300">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold">Safe & Hygienic</h3>
                <p className="text-muted-foreground">
                  Strict hygiene protocols and contactless delivery for your safety.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-6 shadow-card hover:shadow-warm transition-all duration-300">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto">
                  <Star className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold">Quality Assured</h3>
                <p className="text-muted-foreground">
                  Every meal is prepared with love and attention to detail for the best taste.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Cloud-Kitchen Model Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our Cloud-Kitchen Model
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              We operate on a modern cloud-kitchen model, which allows us to focus purely on creating high-quality food for delivery. No storefront, no dine-in, just a dedicated kitchen space optimized for freshness and speed. This innovative approach means better food, faster service, and more affordable prices for you.
            </p>
          </div>
          <div className="flex justify-center">
            <img
              src="https://images.unsplash.com/photo-1594692342929-89240a654463?w=600"
              alt="Cloud Kitchen Interior"
              className="rounded-lg shadow-lg w-full max-w-4xl"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Experience Amazing Food?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of satisfied customers who trust CloudKitchen for their daily meals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/menu">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
                Start Ordering
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/client">
              <Button size="lg" variant="outline" className="text-white border-white/30 hover:bg-white/10 text-lg px-8 py-6">
                Become a Partner
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card py-8 border-t">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <ChefHat className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              CloudKitchen
            </span>
          </div>
          <p className="text-muted-foreground">
            © 2024 CloudKitchen. All rights reserved. Made with ❤️ for food lovers.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
