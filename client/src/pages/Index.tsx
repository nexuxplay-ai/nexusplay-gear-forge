import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Zap, 
  Cpu, 
  MonitorSpeaker, 
  Gamepad2, 
  TrendingUp, 
  Shield, 
  Rocket, 
  Target,
  Activity,
  Gauge,
  Download,
  ShoppingBag,
  Crown
} from "lucide-react";
import { Link } from "wouter";

interface SystemStats {
  cpu: number;
  gpu: number;
  ram: number;
  network: number;
}

export default function Index() {
  const [stats, setStats] = useState<SystemStats>({
    cpu: 0,
    gpu: 0,
    ram: 0,
    network: 0
  });

  // Simulated real-time system stats
  useEffect(() => {
    const interval = setInterval(() => {
      setStats({
        cpu: Math.floor(Math.random() * 100),
        gpu: Math.floor(Math.random() * 100),
        ram: Math.floor(Math.random() * 100),
        network: Math.floor(Math.random() * 100)
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: Zap,
      title: "FPS Boost",
      description: "Optimize your system for maximum frame rates and silky smooth gameplay",
      status: "Active",
      color: "text-gaming-green",
      gradient: "from-gaming-green to-gaming-cyan"
    },
    {
      icon: Shield,
      title: "Network Optimizer",
      description: "Reduce latency and improve connection stability for competitive gaming",
      status: "Ready",
      color: "text-gaming-blue",
      gradient: "from-gaming-blue to-gaming-purple"
    },
    {
      icon: Rocket,
      title: "GPU Tweaks",
      description: "Unlock your graphics card's full potential with advanced optimizations",
      status: "Pro",
      color: "text-gaming-purple",
      gradient: "from-gaming-purple to-gaming-pink"
    },
    {
      icon: Target,
      title: "Game Profiles",
      description: "Custom optimization profiles tailored for each game in your library",
      status: "Pro",
      color: "text-gaming-cyan",
      gradient: "from-gaming-cyan to-gaming-green"
    }
  ];

  const optimizationPacks = [
    {
      title: "Essential Pack",
      description: "Basic optimizations for everyday gaming",
      features: ["FPS Boost", "Memory Cleanup", "Basic Tweaks", "System Analysis"],
      price: "Free",
      popular: false,
      gradient: "from-gaming-green/20 to-gaming-blue/20"
    },
    {
      title: "Pro Gaming Pack",
      description: "Advanced optimizations for competitive gaming",
      features: ["All Essential", "Network Optimizer", "GPU Overclocking", "Game Profiles", "Real-time Monitoring"],
      price: "$9.99/mo",
      popular: true,
      gradient: "from-primary/30 to-gaming-cyan/30"
    },
    {
      title: "Ultimate Pack",
      description: "Maximum performance for professional esports",
      features: ["All Pro Features", "AI Optimization", "Hardware Monitoring", "24/7 Support", "Custom Tweaks"],
      price: "$19.99/mo",
      popular: false,
      gradient: "from-gaming-purple/20 to-gaming-pink/20"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Hero Section with Animated Background */}
      <section className="relative overflow-hidden py-20">
        <motion.div 
          className="absolute inset-0 bg-gradient-primary opacity-10"
          animate={{ 
            opacity: [0.05, 0.15, 0.05]
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        
        <div className="relative container mx-auto px-6">
          <motion.div 
            className="text-center max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Badge className="mb-6 bg-gradient-primary text-primary-foreground shadow-glow">
                <Gamepad2 className="w-3 h-3 mr-1" />
                Welcome back, Gamer!
              </Badge>
            </motion.div>
            
            <motion.h1 
              className="text-5xl md:text-7xl font-bold mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Optimize Your Game.{" "}
              <span className="bg-gradient-primary bg-clip-text text-transparent">Dominate Your Competition.</span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-4xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Experience peak performance with advanced system optimizations, premium gaming gear, 
              and real-time analytics. Your journey to gaming excellence starts here.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <Link to="/optimizer">
                <Button size="lg" className="bg-gradient-primary hover:shadow-glow text-lg px-8 py-6 hover-scale">
                  <Zap className="mr-2 h-5 w-5" />
                  Start Optimizing
                </Button>
              </Link>
              <Link to="/gear">
                <Button variant="outline" size="lg" className="neon-border text-lg px-8 py-6 hover-glow">
                  <ShoppingBag className="mr-2 h-5 w-5" />
                  Shop Gaming Gear
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Floating animated elements */}
        <motion.div 
          className="absolute top-20 left-10 w-16 h-16 bg-gaming-blue/20 rounded-full flex items-center justify-center"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <Cpu className="w-8 h-8 text-gaming-blue" />
        </motion.div>
        <motion.div 
          className="absolute top-32 right-16 w-20 h-20 bg-gaming-purple/20 rounded-full flex items-center justify-center"
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 4, repeat: Infinity, delay: 1 }}
        >
          <MonitorSpeaker className="w-10 h-10 text-gaming-purple" />
        </motion.div>
        <motion.div 
          className="absolute bottom-20 left-1/4 w-12 h-12 bg-gaming-green/20 rounded-full flex items-center justify-center"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: 2 }}
        >
          <Gamepad2 className="w-6 h-6 text-gaming-green" />
        </motion.div>
      </section>

      {/* Real-time System Stats */}
      <section className="container mx-auto px-6 py-12">
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.0 }}
        >
          <h2 className="text-2xl font-bold mb-2">System Performance</h2>
          <p className="text-muted-foreground">Real-time monitoring of your gaming setup</p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          {[
            { label: "CPU", value: stats.cpu, icon: Cpu, color: "gaming-green" },
            { label: "GPU", value: stats.gpu, icon: MonitorSpeaker, color: "gaming-blue" },
            { label: "RAM", value: stats.ram, icon: Activity, color: "gaming-purple" },
            { label: "Network", value: stats.network, icon: TrendingUp, color: "gaming-cyan" }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 1.3 + index * 0.1 }}
            >
              <Card className="glass hover-glow hover-scale">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <stat.icon className={`h-6 w-6 text-${stat.color}`} />
                    <motion.span 
                      className="text-2xl font-bold"
                      key={stat.value}
                      initial={{ scale: 1.2 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {stat.value}%
                    </motion.span>
                  </div>
                  <h3 className="font-semibold text-sm text-muted-foreground mb-2">{stat.label} Usage</h3>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <motion.div 
                      className={`h-full bg-gradient-to-r from-${stat.color} to-gaming-cyan rounded-full`}
                      initial={{ width: 0 }}
                      animate={{ width: `${stat.value}%` }}
                      transition={{ duration: 0.8, delay: 1.5 + index * 0.1 }}
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Featured Optimization Packs */}
      <section className="container mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.8 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              Optimization <span className="text-neon">Packs</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose the perfect optimization level for your gaming needs
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {optimizationPacks.map((pack, index) => (
              <motion.div
                key={pack.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 2.0 + index * 0.2 }}
              >
                <Card className={`relative hover-scale ${pack.popular ? 'neon-border shadow-glow' : 'glass'}`}>
                  {pack.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-gradient-primary text-primary-foreground shadow-glow">
                        Most Popular
                      </Badge>
                    </div>
                  )}
                  
                  <div className={`absolute inset-0 bg-gradient-to-br ${pack.gradient} rounded-lg opacity-50`} />
                  
                  <CardHeader className="relative">
                    <CardTitle className="text-xl">{pack.title}</CardTitle>
                    <CardDescription className="text-base">{pack.description}</CardDescription>
                    <div className="text-3xl font-bold text-neon">{pack.price}</div>
                  </CardHeader>
                  
                  <CardContent className="relative">
                    <ul className="space-y-3 mb-6">
                      {pack.features.map((feature) => (
                        <li key={feature} className="flex items-center text-sm">
                          <Zap className="h-4 w-4 text-gaming-green mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    
                    <Button 
                      className={`w-full ${pack.popular ? 'bg-gradient-primary shadow-glow' : ''} hover-scale`}
                      variant={pack.popular ? "default" : "outline"}
                    >
                      {pack.price === "Free" ? "Activate Now" : "Upgrade Now"}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Quick Features Grid */}
      <section className="container mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 2.8 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              Gaming <span className="text-gaming-cyan">Features</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Advanced tools designed for serious gamers
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 3.0 + index * 0.1 }}
              >
                <Card className="glass hover-scale hover-glow cursor-pointer group">
                  <CardContent className="p-6 text-center">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${feature.gradient} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <feature.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="font-semibold mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{feature.description}</p>
                    <Badge 
                      variant={feature.status === "Active" ? "default" : "secondary"}
                      className={feature.status === "Pro" ? "bg-gradient-primary text-primary-foreground" : ""}
                    >
                      {feature.status}
                    </Badge>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Call to Action Section */}
      <section className="container mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 3.5 }}
        >
          <Card className="glass shadow-elevation neon-border">
            <CardContent className="p-12 text-center">
              <Shield className="w-16 h-16 mx-auto mb-6 text-gaming-green" />
              <h2 className="text-4xl font-bold mb-4">
                Ready to <span className="text-neon">Dominate</span>?
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join thousands of gamers who've unlocked their system's true potential. 
                Start your optimization journey today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/optimizer">
                  <Button size="lg" className="bg-gradient-primary shadow-glow hover-scale text-lg px-8 py-6">
                    <Rocket className="w-5 h-5 mr-2" />
                    Start Optimizing
                  </Button>
                </Link>
                <Link to="/upgrade">
                  <Button size="lg" variant="outline" className="neon-border hover-glow text-lg px-8 py-6">
                    <Crown className="w-5 h-5 mr-2" />
                    Upgrade to Pro
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </section>

      {/* Floating Action Button */}
      <motion.div
        className="fab"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.4, delay: 4.0 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <Gauge className="h-6 w-6" />
      </motion.div>
    </div>
  );
}