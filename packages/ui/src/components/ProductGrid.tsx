import { useEffect, useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star, ShoppingCart, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import products from "../data/products.json";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  currency: string;
  image: string;
  rating: number;
  reviews: number;
  features: string[];
}

export default function ProductGrid() {
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [cart, setCart] = useState<Product[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const stored = localStorage.getItem("nexusplay-cart");
    if (stored) {
      try {
        setCart(JSON.parse(stored));
      } catch (error) {
        console.error("Error loading cart:", error);
      }
    }
  }, []);

  const saveCart = (newCart: Product[]) => {
    setCart(newCart);
    localStorage.setItem("nexusplay-cart", JSON.stringify(newCart));
  };

  const addToCart = (product: Product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      toast({
        title: "Already in cart",
        description: `${product.name} is already in your cart.`,
        variant: "destructive",
      });
      return;
    }

    const updated = [...cart, product];
    saveCart(updated);
    toast({
      title: "Added to cart!",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const categories = ["all", ...Array.from(new Set(products.map(p => p.category)))];

  const filteredProducts = products
    .filter(p => filter === "all" || p.category === filter)
    .filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low": return a.price - b.price;
        case "price-high": return b.price - a.price;
        case "rating": return b.rating - a.rating;
        default: return a.name.localeCompare(b.name);
      }
    });

  const formatCategory = (cat: string) => {
    return cat.charAt(0).toUpperCase() + cat.slice(1);
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Category Filter */}
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {formatCategory(cat)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Sort */}
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger>
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Rating</SelectItem>
            </SelectContent>
          </Select>

          {/* Results Count */}
          <div className="flex items-center text-muted-foreground">
            {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="group hover:shadow-gaming transition-all duration-200">
            <CardContent className="p-0">
              <div className="aspect-video relative overflow-hidden rounded-t-lg">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                />
                <Badge className="absolute top-2 right-2 bg-gradient-primary">
                  {formatCategory(product.category)}
                </Badge>
              </div>
              
              <div className="p-4 space-y-3">
                <div>
                  <h3 className="font-semibold line-clamp-1">{product.name}</h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{product.rating}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">({product.reviews})</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1">
                  {product.features.slice(0, 3).map((feature, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                  {product.features.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{product.features.length - 3}
                    </Badge>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold">
                    {product.currency}{product.price}
                  </span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <Button 
                onClick={() => addToCart(product)}
                className="w-full bg-gradient-primary"
                disabled={cart.some(item => item.id === product.id)}
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                {cart.some(item => item.id === product.id) ? "In Cart" : "Add to Cart"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-16">
          <p className="text-muted-foreground">No products found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}