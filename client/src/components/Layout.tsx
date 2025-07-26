import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Moon, Sun, Menu, X, Zap, ShoppingBag, Crown, Key, Download, User, LogOut, Home, Monitor, Settings } from "lucide-react";
import AuthModal from "./AuthModal";
import CartModal from "./CartModal";
import NexusAI from "./NexusAI";
import Footer from "./Footer";
import InstallPrompt from "./InstallPrompt";
import FPSCounter from "./FPSCounter";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [darkMode, setDarkMode] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [cartModalOpen, setCartModalOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [cart, setCart] = useState<any[]>([]);
  const [location] = useLocation();

  const getAIContext = () => {
    if (location === '/optimizer') return 'optimizer';
    if (location === '/gear') return 'store';
    return 'optimizer'; // default context
  };

  useEffect(() => {
    // Load user from localStorage
    const savedUser = localStorage.getItem('nexus_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    
    // Load cart from localStorage
    const savedCart = localStorage.getItem('nexus_cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }

    // Register service worker
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/serviceWorker.js')
          .then((registration) => {
            console.log('SW registered: ', registration);
          })
          .catch((registrationError) => {
            console.log('SW registration failed: ', registrationError);
          });
      });
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
  }, [darkMode]);

  const updateCart = (newCart: any[]) => {
    setCart(newCart);
    localStorage.setItem('nexus_cart', JSON.stringify(newCart));
  };

  const handleLogout = () => {
    localStorage.removeItem('nexus_user');
    setUser(null);
  };

  const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Optimizer", href: "/optimizer", icon: Zap },
    { name: "Gear Store", href: "/gear", icon: ShoppingBag },
    { name: "Go Pro", href: "/upgrade", icon: Crown },
    { name: "Enter Key", href: "/enter-key", icon: Key },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <motion.nav 
        className="sticky top-0 z-50 glass border-b border-border/50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 hover-scale">
              <motion.div 
                className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center shadow-glow"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <Zap className="w-5 h-5 text-primary-foreground" />
              </motion.div>
              <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                NexusPlay.io
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-all hover-scale ${
                      location === item.href
                        ? "bg-gradient-primary text-primary-foreground shadow-glow"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{item.name}</span>
                  </Link>
                );
              })}
              
              {/* Cart Button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCartModalOpen(true)}
                className="relative hover-scale"
              >
                <ShoppingBag className="w-4 h-4" />
                {cart.length > 0 && (
                  <Badge className="absolute -top-2 -right-2 w-5 h-5 p-0 flex items-center justify-center text-xs bg-gradient-primary shadow-glow">
                    {cart.reduce((sum, item) => sum + item.quantity, 0)}
                  </Badge>
                )}
              </Button>

              {/* Theme Toggle */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setDarkMode(!darkMode)}
                className="w-9 h-9 p-0 hover-scale hover-glow"
              >
                {darkMode ? <Sun className="w-4 h-4 text-gaming-cyan" /> : <Moon className="w-4 h-4 text-gaming-purple" />}
              </Button>

              {/* Download Button */}
              <Button variant="outline" size="sm" className="w-9 h-9 p-0 hover-scale neon-border">
                <Download className="w-4 h-4" />
              </Button>

              {/* Auth Section */}
              {user ? (
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm" className="flex items-center space-x-1">
                    <User className="w-4 h-4" />
                    <span className="text-sm">{user.name}</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleLogout}
                    className="text-destructive hover:text-destructive"
                  >
                    <LogOut className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => setAuthModalOpen(true)}
                  className="bg-gradient-primary shadow-glow hover-scale"
                >
                  Login / Sign Up
                </Button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setDarkMode(!darkMode)}
                className="w-9 h-9 p-0"
              >
                {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="w-9 h-9 p-0"
              >
                {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-border">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center space-x-2 px-4 py-3 transition-all ${
                      location === item.href
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </motion.nav>

      {/* Main Content */}
      <main>{children}</main>

      {/* Modals */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onAuthSuccess={setUser}
      />
      <CartModal
        isOpen={cartModalOpen}
        onClose={() => setCartModalOpen(false)}
        cart={cart}
        updateCart={updateCart}
      />

      {/* NexusAI Chat */}
      <NexusAI context={getAIContext()} />

      {/* Footer */}
      <Footer />

      {/* Install Prompt */}
      <InstallPrompt />
      
      {/* FPS Counter */}
      <FPSCounter />
    </div>
  );
}