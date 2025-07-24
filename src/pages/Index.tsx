import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, Zap, ShoppingBag, Crown, Shield, Cpu, Monitor, Gamepad2, Star, Twitter, MessageCircle, Instagram, Facebook } from "lucide-react";
import { Link } from "react-router-dom";
const Index = () => {
  const features = [{
    icon: Zap,
    title: "Game Optimizer",
    description: "Advanced system optimizations for maximum gaming performance across Windows, Android, and Linux.",
    gradient: "from-gaming-blue to-gaming-purple"
  }, {
    icon: ShoppingBag,
    title: "Gaming Gear Store",
    description: "Premium gaming equipment including mice, keyboards, monitors, headsets, and controllers.",
    gradient: "from-gaming-green to-gaming-blue"
  }, {
    icon: Crown,
    title: "Pro Features",
    description: "Unlock advanced tweaks, registry edits, and exclusive optimizations with Pro tiers.",
    gradient: "from-gaming-purple to-gaming-pink"
  }];
  const socialLinks = [{
    icon: Twitter,
    href: "#",
    label: "Twitter"
  }, {
    icon: MessageCircle,
    href: "#",
    label: "Discord"
  }, {
    icon: Instagram,
    href: "#",
    label: "Instagram"
  }, {
    icon: Facebook,
    href: "#",
    label: "Facebook"
  }];
  return <div className="min-h-screen bg-gradient-hero">
      {/* Hero Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <Badge className="mb-6 bg-gaming-green">
            <Star className="w-3 h-3 mr-1" />
            The Ultimate Gaming Platform
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Optimize Your Game.{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] text-primary">itsDominate Your Competition.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            NexusPlay.io combines advanced system optimization with premium gaming gear. 
            Unlock your PC's full potential and shop the latest gaming equipment.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-primary shadow-gaming text-lg px-8 py-6">
              <Download className="w-5 h-5 mr-2" />
              Download Optimizer
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6">
              <ShoppingBag className="w-5 h-5 mr-2" />
              Shop Gaming Gear
            </Button>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 animate-pulse">
          <div className="w-16 h-16 bg-gaming-blue/20 rounded-full flex items-center justify-center">
            <Cpu className="w-8 h-8 text-gaming-blue" />
          </div>
        </div>
        <div className="absolute top-32 right-16 animate-pulse" style={{
        animationDelay: "1s"
      }}>
          <div className="w-20 h-20 bg-gaming-purple/20 rounded-full flex items-center justify-center">
            <Monitor className="w-10 h-10 text-gaming-purple" />
          </div>
        </div>
        <div className="absolute bottom-20 left-1/4 animate-pulse" style={{
        animationDelay: "2s"
      }}>
          <div className="w-12 h-12 bg-gaming-green/20 rounded-full flex items-center justify-center">
            <Gamepad2 className="w-6 h-6 text-gaming-green" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Everything You Need to{" "}
              <span className="bg-gradient-primary bg-clip-text text-transparent">Excel</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From system optimization to premium gaming gear, we've got your setup covered.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
            const Icon = feature.icon;
            return <Card key={index} className="bg-gradient-card border-primary/20 hover:shadow-gaming transition-all duration-300 group">
                  <CardHeader className="text-center">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${feature.gradient} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center text-base">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>;
          })}
          </div>
        </div>
      </section>

      {/* Social Links Section */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">
            Join the{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">Community</span>
          </h2>
          <p className="text-muted-foreground mb-8">
            Connect with fellow gamers and stay updated with the latest features
          </p>
          
          <div className="flex justify-center space-x-6">
            {socialLinks.map((social, index) => {
            const Icon = social.icon;
            return <a key={index} href={social.href} className="w-14 h-14 bg-gradient-primary rounded-full flex items-center justify-center hover:shadow-glow transition-all duration-300 group" aria-label={social.label}>
                  <Icon className="w-6 h-6 text-primary-foreground group-hover:scale-110 transition-transform" />
                </a>;
          })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <Card className="bg-gradient-card border-primary/20 shadow-gaming">
            <CardContent className="p-12">
              <Shield className="w-16 h-16 mx-auto mb-6 text-gaming-green" />
              <h2 className="text-3xl font-bold mb-4">
                Ready to Dominate?
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Start optimizing your system today and experience gaming like never before.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/optimizer">
                  <Button size="lg" className="bg-gradient-primary shadow-gaming">
                    <Zap className="w-5 h-5 mr-2" />
                    Start Optimizing
                  </Button>
                </Link>
                <Link to="/upgrade">
                  <Button size="lg" variant="outline">
                    <Crown className="w-5 h-5 mr-2" />
                    Upgrade to Pro
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>;
};
export default Index;