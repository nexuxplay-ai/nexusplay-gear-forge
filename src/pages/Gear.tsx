import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, ShoppingCart, Star, Filter, Mouse, Keyboard, Monitor, Headphones, Gamepad2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Gear() {
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState<any[]>([]);
  const { toast } = useToast();

  // Mock product data - in real app, this would be loaded from JSON files
  const products = {
    mice: [
      {
        id: 1,
        name: "Pro Gaming Mouse X1",
        price: 79.99,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=300&fit=crop",
        category: "mice",
        brand: "GamerPro",
        features: ["RGB Lighting", "12000 DPI", "Wireless"],
      },
      {
        id: 2,
        name: "Ultra Precision Mouse",
        price: 129.99,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1563297007-0686b7003af7?w=400&h=300&fit=crop",
        category: "mice",
        brand: "NexusGear",
        features: ["25600 DPI", "Ergonomic", "Pro Switches"],
      },
    ],
    keyboards: [
      {
        id: 3,
        name: "Mechanical Gaming Keyboard",
        price: 149.99,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&h=300&fit=crop",
        category: "keyboards",
        brand: "TypeMaster",
        features: ["Cherry MX", "RGB Backlight", "USB-C"],
      },
      {
        id: 4,
        name: "Wireless Pro Keyboard",
        price: 199.99,
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=300&fit=crop",
        category: "keyboards",
        brand: "GamerPro",
        features: ["Wireless", "Hot-Swap", "Aluminum"],
      },
    ],
    monitors: [
      {
        id: 5,
        name: "4K Gaming Monitor 32\"",
        price: 699.99,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=300&fit=crop",
        category: "monitors",
        brand: "DisplayMax",
        features: ["4K 144Hz", "HDR10", "G-Sync"],
      },
    ],
    headsets: [
      {
        id: 6,
        name: "Pro Gaming Headset",
        price: 89.99,
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&h=300&fit=crop",
        category: "headsets",
        brand: "AudioGear",
        features: ["7.1 Surround", "Noise Cancel", "RGB"],
      },
    ],
    controllers: [
      {
        id: 7,
        name: "Wireless Pro Controller",
        price: 129.99,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=300&fit=crop",
        category: "controllers",
        brand: "GameControl",
        features: ["Wireless", "Hall Effect", "Customizable"],
      },
    ],
  };

  const categories = [
    { id: "mice", name: "Gaming Mice", icon: Mouse, count: products.mice.length },
    { id: "keyboards", name: "Keyboards", icon: Keyboard, count: products.keyboards.length },
    { id: "monitors", name: "Monitors", icon: Monitor, count: products.monitors.length },
    { id: "headsets", name: "Headsets", icon: Headphones, count: products.headsets.length },
    { id: "controllers", name: "Controllers", icon: Gamepad2, count: products.controllers.length },
  ];

  const addToCart = (product: any) => {
    setCart([...cart, product]);
    toast({
      title: "Added to Cart!",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const ProductCard = ({ product }: { product: any }) => (
    <Card className="group hover:shadow-gaming transition-all duration-300 bg-gradient-card">
      <CardHeader className="p-0">
        <div className="relative overflow-hidden rounded-t-lg">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-2 right-2">
            <Badge className="bg-gaming-green">{product.rating} ⭐</Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="mb-2">
          <Badge variant="secondary" className="text-xs">{product.brand}</Badge>
        </div>
        <CardTitle className="text-lg mb-2 line-clamp-2">{product.name}</CardTitle>
        <div className="flex flex-wrap gap-1 mb-3">
          {product.features.slice(0, 3).map((feature: string) => (
            <Badge key={feature} variant="outline" className="text-xs">
              {feature}
            </Badge>
          ))}
        </div>
        <div className="text-2xl font-bold text-gaming-green">
          £{product.price}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button 
          onClick={() => addToCart(product)}
          className="w-full bg-gradient-primary shadow-gaming"
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );

  const CategoryTab = ({ category }: { category: any }) => {
    const Icon = category.icon;
    return (
      <TabsTrigger value={category.id} className="flex items-center space-x-2">
        <Icon className="w-4 h-4" />
        <span>{category.name}</span>
        <Badge variant="secondary" className="text-xs">{category.count}</Badge>
      </TabsTrigger>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-hero p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">
            Gaming <span className="bg-gradient-primary bg-clip-text text-transparent">Gear Store</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Premium gaming equipment to enhance your performance and style.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search gaming gear..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" className="flex items-center space-x-2">
            <Filter className="w-4 h-4" />
            <span>Filters</span>
          </Button>
          <Button variant="outline" className="flex items-center space-x-2">
            <ShoppingCart className="w-4 h-4" />
            <span>Cart ({cart.length})</span>
          </Button>
        </div>

        {/* Product Categories */}
        <Tabs defaultValue="mice" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 bg-card h-auto p-1">
            {categories.map((category) => (
              <CategoryTab key={category.id} category={category} />
            ))}
          </TabsList>

          <TabsContent value="mice" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.mice.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </TabsContent>

          <TabsContent value="keyboards" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.keyboards.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </TabsContent>

          <TabsContent value="monitors" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.monitors.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </TabsContent>

          <TabsContent value="headsets" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.headsets.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </TabsContent>

          <TabsContent value="controllers" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.controllers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </TabsContent>
        </Tabs>

        {/* Placeholder for empty categories */}
        {categories.map((category) => (
          products[category.id].length === 0 && (
            <TabsContent key={category.id} value={category.id} className="text-center py-16">
              <div className="text-muted-foreground">
                <category.icon className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
                <p>Coming soon! Check back later for amazing {category.name.toLowerCase()}.</p>
              </div>
            </TabsContent>
          )
        ))}
      </div>
    </div>
  );
}