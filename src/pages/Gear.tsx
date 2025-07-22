import { useState, useEffect } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, ShoppingCart, Star, Mouse, Keyboard, Monitor, Headphones, Gamepad2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import NexusAI from "@/components/NexusAI";

export default function Gear() {
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState<any[]>([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const { toast } = useToast();

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('nexus_cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  const updateCart = (newCart: any[]) => {
    setCart(newCart);
    localStorage.setItem('nexus_cart', JSON.stringify(newCart));
  };

  // Comprehensive product catalog
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
      {
        id: 3,
        name: "Lightweight Gaming Mouse",
        price: 59.99,
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1572054879748-d5c50a8b8de8?w=400&h=300&fit=crop",
        category: "mice",
        brand: "SpeedTech",
        features: ["Ultra Light", "8000 DPI", "Honeycomb Design"],
      },
      {
        id: 4,
        name: "Wireless Pro Mouse Elite",
        price: 149.99,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=400&h=300&fit=crop",
        category: "mice",
        brand: "EliteGaming",
        features: ["50 Hour Battery", "20000 DPI", "Charging Dock"],
      },
      {
        id: 5,
        name: "RGB Gaming Mouse Pro",
        price: 89.99,
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1572670280671-0521d32d4e71?w=400&h=300&fit=crop",
        category: "mice",
        brand: "RGBTech",
        features: ["16.8M Colors", "15000 DPI", "Macro Keys"],
      },
      {
        id: 6,
        name: "Ergonomic Gaming Mouse",
        price: 99.99,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1572863723317-5cb72c74e9e8?w=400&h=300&fit=crop",
        category: "mice",
        brand: "ComfortGrip",
        features: ["Ergonomic Design", "10000 DPI", "Palm Rest"],
      },
    ],
    keyboards: [
      {
        id: 7,
        name: "Mechanical Gaming Keyboard",
        price: 149.99,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&h=300&fit=crop",
        category: "keyboards",
        brand: "TypeMaster",
        features: ["Cherry MX", "RGB Backlight", "USB-C"],
      },
      {
        id: 8,
        name: "Wireless Pro Keyboard",
        price: 199.99,
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=300&fit=crop",
        category: "keyboards",
        brand: "GamerPro",
        features: ["Wireless", "Hot-Swap", "Aluminum"],
      },
      {
        id: 9,
        name: "TKL Gaming Keyboard",
        price: 119.99,
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1595044426077-d36d9236d54a?w=400&h=300&fit=crop",
        category: "keyboards",
        brand: "CompactTech",
        features: ["Tenkeyless", "RGB", "Blue Switches"],
      },
      {
        id: 10,
        name: "Full Size RGB Keyboard",
        price: 179.99,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1518818608552-195d4d447b8d?w=400&h=300&fit=crop",
        category: "keyboards",
        brand: "FullRGB",
        features: ["Full Size", "Per-Key RGB", "Media Keys"],
      },
      {
        id: 11,
        name: "60% Compact Keyboard",
        price: 129.99,
        rating: 4.4,
        image: "https://images.unsplash.com/photo-1571650044624-8ccb0fdb5a74?w=400&h=300&fit=crop",
        category: "keyboards",
        brand: "MiniBoard",
        features: ["60% Layout", "Portable", "Red Switches"],
      },
      {
        id: 12,
        name: "Gaming Membrane Keyboard",
        price: 49.99,
        rating: 4.2,
        image: "https://images.unsplash.com/photo-1537498425277-c283d32ef9db?w=400&h=300&fit=crop",
        category: "keyboards",
        brand: "BudgetGaming",
        features: ["Membrane", "RGB Zones", "Quiet"],
      },
    ],
    monitors: [
      {
        id: 13,
        name: "4K Gaming Monitor 32\"",
        price: 699.99,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=300&fit=crop",
        category: "monitors",
        brand: "DisplayMax",
        features: ["4K 144Hz", "HDR10", "G-Sync"],
      },
      {
        id: 14,
        name: "Ultrawide Gaming Monitor",
        price: 899.99,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1551651176-e9e91c65df3a?w=400&h=300&fit=crop",
        category: "monitors",
        brand: "UltraWide",
        features: ["34\" Ultrawide", "1440p", "165Hz"],
      },
      {
        id: 15,
        name: "1440p Gaming Monitor 27\"",
        price: 399.99,
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1592239477010-6a30888b4b78?w=400&h=300&fit=crop",
        category: "monitors",
        brand: "QHDDisplay",
        features: ["1440p", "165Hz", "FreeSync"],
      },
      {
        id: 16,
        name: "Budget 1080p Monitor",
        price: 199.99,
        rating: 4.3,
        image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=300&fit=crop",
        category: "monitors",
        brand: "ValueDisplay",
        features: ["1080p", "75Hz", "IPS Panel"],
      },
      {
        id: 17,
        name: "Curved Gaming Monitor",
        price: 549.99,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=400&h=300&fit=crop",
        category: "monitors",
        brand: "CurveMax",
        features: ["27\" Curved", "1440p", "144Hz"],
      },
      {
        id: 28,
        name: "OLED Gaming Monitor",
        price: 1299.99,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=300&fit=crop",
        category: "monitors",
        brand: "OLEDPro",
        features: ["OLED Panel", "4K 120Hz", "HDR"],
      },
    ],
    headsets: [
      {
        id: 18,
        name: "Pro Gaming Headset",
        price: 89.99,
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&h=300&fit=crop",
        category: "headsets",
        brand: "AudioGear",
        features: ["7.1 Surround", "Noise Cancel", "RGB"],
      },
      {
        id: 19,
        name: "Wireless Gaming Headset",
        price: 159.99,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1572054879748-d5c50a8b8de8?w=400&h=300&fit=crop",
        category: "headsets",
        brand: "WirelessAudio",
        features: ["Wireless", "30hr Battery", "Virtual 7.1"],
      },
      {
        id: 20,
        name: "Studio Quality Headset",
        price: 199.99,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=400&h=300&fit=crop",
        category: "headsets",
        brand: "StudioSound",
        features: ["Studio Grade", "Detachable Mic", "Hi-Fi"],
      },
      {
        id: 21,
        name: "Budget Gaming Headset",
        price: 39.99,
        rating: 4.2,
        image: "https://images.unsplash.com/photo-1572670280671-0521d32d4e71?w=400&h=300&fit=crop",
        category: "headsets",
        brand: "BudgetAudio",
        features: ["Stereo Sound", "Adjustable", "Lightweight"],
      },
      {
        id: 22,
        name: "RGB Gaming Headset",
        price: 119.99,
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1572863723317-5cb72c74e9e8?w=400&h=300&fit=crop",
        category: "headsets",
        brand: "RGBAudio",
        features: ["RGB Lighting", "7.1 Surround", "Memory Foam"],
      },
      {
        id: 29,
        name: "Pro Streaming Headset",
        price: 249.99,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&h=300&fit=crop",
        category: "headsets",
        brand: "StreamPro",
        features: ["Broadcast Quality", "Noise Gate", "Hot-Swap Cable"],
      },
    ],
    controllers: [
      {
        id: 23,
        name: "Wireless Pro Controller",
        price: 129.99,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=300&fit=crop",
        category: "controllers",
        brand: "GameControl",
        features: ["Wireless", "Hall Effect", "Customizable"],
      },
      {
        id: 24,
        name: "Elite Gaming Controller",
        price: 179.99,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1595044426077-d36d9236d54a?w=400&h=300&fit=crop",
        category: "controllers",
        brand: "EliteControl",
        features: ["Paddles", "Hair Triggers", "Adjustable"],
      },
      {
        id: 25,
        name: "Budget Wired Controller",
        price: 49.99,
        rating: 4.3,
        image: "https://images.unsplash.com/photo-1518818608552-195d4d447b8d?w=400&h=300&fit=crop",
        category: "controllers",
        brand: "ValueControl",
        features: ["Wired", "Ergonomic", "Durable"],
      },
      {
        id: 26,
        name: "RGB Gaming Controller",
        price: 99.99,
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1571650044624-8ccb0fdb5a74?w=400&h=300&fit=crop",
        category: "controllers",
        brand: "RGBControl",
        features: ["RGB Zones", "Wireless", "Programmable"],
      },
      {
        id: 27,
        name: "Pro Fight Stick",
        price: 249.99,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1537498425277-c283d32ef9db?w=400&h=300&fit=crop",
        category: "controllers",
        brand: "FightTech",
        features: ["Arcade Stick", "Tournament Legal", "Sanwa Parts"],
      },
      {
        id: 30,
        name: "Racing Wheel Pro",
        price: 399.99,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=300&fit=crop",
        category: "controllers",
        brand: "RaceTech",
        features: ["Force Feedback", "900° Rotation", "Pedals Included"],
      },
      {
        id: 31,
        name: "Gaming Mouse Pad XL",
        price: 29.99,
        rating: 4.4,
        image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=300&fit=crop",
        category: "mice",
        brand: "DeskMat",
        features: ["XL Size", "Waterproof", "Anti-Slip"],
      },
      {
        id: 32,
        name: "Vertical Gaming Mouse",
        price: 79.99,
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1563297007-0686b7003af7?w=400&h=300&fit=crop",
        category: "mice",
        brand: "ErgoMouse",
        features: ["Vertical Design", "Reduces Strain", "6 Buttons"],
      },
      {
        id: 33,
        name: "Silent Gaming Keyboard",
        price: 139.99,
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&h=300&fit=crop",
        category: "keyboards",
        brand: "QuietType",
        features: ["Silent Switches", "Backlit", "Wireless"],
      },
      {
        id: 34,
        name: "Portable Gaming Monitor",
        price: 299.99,
        rating: 4.3,
        image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=300&fit=crop",
        category: "monitors",
        brand: "PortableDisplay",
        features: ["15.6\" Portable", "USB-C", "1080p 60Hz"],
      },
      {
        id: 35,
        name: "Open-Back Gaming Headset",
        price: 179.99,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&h=300&fit=crop",
        category: "headsets",
        brand: "OpenAudio",
        features: ["Open-Back", "Audiophile Grade", "Planar Drivers"],
      },
    ],
  };

  const addToCart = (product: any) => {
    const existingItem = cart.find(item => item.id === product.id);
    let newCart;
    if (existingItem) {
      newCart = cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      newCart = [...cart, { ...product, quantity: 1 }];
    }
    
    updateCart(newCart);
    
    toast({
      title: "Added to Cart!",
      description: `${product.name} has been added to your cart.`,
    });
  };

  // Filter products based on category and search
  const allProducts = [...products.mice, ...products.keyboards, ...products.monitors, ...products.headsets, ...products.controllers];
  
  const filteredProducts = allProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === "all" || product.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-hero p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">
            Gaming <span className="bg-gradient-primary bg-clip-text text-transparent">Gear Store</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Premium gaming equipment to elevate your performance
          </p>
        </div>

        {/* Search */}
        <div className="relative mb-8">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search gaming gear..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 max-w-md mx-auto"
          />
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {[
            { key: "all", label: "All Products", icon: ShoppingCart },
            { key: "mice", label: "Mice", icon: Mouse },
            { key: "keyboards", label: "Keyboards", icon: Keyboard },
            { key: "monitors", label: "Monitors", icon: Monitor },
            { key: "headsets", label: "Headsets", icon: Headphones },
            { key: "controllers", label: "Controllers", icon: Gamepad2 }
          ].map((category) => {
            const Icon = category.icon;
            return (
              <Button
                key={category.key}
                variant={activeCategory === category.key ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(category.key)}
                className={`flex items-center space-x-2 ${
                  activeCategory === category.key ? "bg-gradient-primary" : ""
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{category.label}</span>
              </Button>
            );
          })}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden hover:shadow-gaming transition-all">
              <div className="relative">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <Badge className="absolute top-2 right-2 bg-card/90">
                  {product.brand}
                </Badge>
              </div>
              <CardHeader>
                <CardTitle className="text-lg">{product.name}</CardTitle>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm">{product.rating}</span>
                  </div>
                  <Badge variant="secondary">{product.category}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex flex-wrap gap-1">
                    {product.features.slice(0, 3).map((feature, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between items-center">
                <span className="text-2xl font-bold text-primary">
                  £{product.price.toFixed(2)}
                </span>
                <Button 
                  onClick={() => addToCart(product)}
                  className="bg-gradient-primary"
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Add to Cart
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <ShoppingCart className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">No products found</h3>
            <p className="text-muted-foreground">Try adjusting your search or category filter</p>
          </div>
        )}
      </div>
      
      {/* NexusAI Chat Assistant */}
      <NexusAI context="store" />
    </div>
  );
}