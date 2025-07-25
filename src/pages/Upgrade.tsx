import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Crown, Zap, Shield, Star, Download, Smartphone, Monitor } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Upgrade() {
  const [selectedPlan, setSelectedPlan] = useState<"tier1" | "tier2" | null>(null);
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const { toast } = useToast();

  const plans = [
    {
      id: "tier1",
      name: "Pro Tier 1",
      price: "£10",
      period: "/month",
      description: "Advanced optimizations for serious gamers",
      popular: false,
      features: [
        "All basic optimizations",
        "CPU priority optimization",
        "RAM management tweaks",
        "Disk performance boost",
        "Network latency reduction",
        "Auto-optimization presets",
        "Email support",
        "Mobile app access"
      ],
      icon: Zap,
      gradient: "from-gaming-blue to-gaming-purple"
    },
    {
      id: "tier2",
      name: "Pro Tier 2",
      price: "£15",
      period: "/month",
      description: "Ultimate gaming performance package",
      popular: true,
      features: [
        "Everything in Tier 1",
        "Advanced system tweaks",
        "Custom registry edits",
        "Windows service optimization",
        "Security bypass options",
        "Game-specific profiles",
        "Priority support",
        "Desktop app access",
        "Beta feature access"
      ],
      icon: Crown,
      gradient: "from-gaming-purple to-gaming-pink"
    }
  ];

  const handlePurchase = async (planId: string) => {
    setSelectedPlan(planId as "tier1" | "tier2");
    
    // Mock Stripe checkout - in real app, this would integrate with Stripe
    toast({
      title: "Redirecting to checkout...",
      description: "You'll be redirected to secure payment processing.",
    });

    // Simulate successful purchase after 2 seconds
    setTimeout(() => {
      toast({
        title: "Purchase Successful!",
        description: "Your Pro key has been sent to your email. Check your inbox!",
      });
    }, 2000);
  };

  const downloadApp = (platform: string) => {
    toast({
      title: `Downloading ${platform} App`,
      description: `NexusPlay ${platform} app download started.`,
    });
  };

  const PlanCard = ({ plan }: { plan: any }) => {
    const Icon = plan.icon;
    return (
      <Card className={`relative transition-all duration-300 hover:shadow-gaming ${
        plan.popular ? "border-primary shadow-glow" : ""
      } bg-gradient-card`}>
        {plan.popular && (
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
            <Badge className="bg-gradient-primary px-4 py-1">
              <Star className="w-3 h-3 mr-1" />
              Most Popular
            </Badge>
          </div>
        )}
        
        <CardHeader className="text-center pb-4">
          <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${plan.gradient} flex items-center justify-center`}>
            <Icon className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl">{plan.name}</CardTitle>
          <CardDescription>{plan.description}</CardDescription>
          <div className="text-center mt-4">
            <span className="text-4xl font-bold">{plan.price}</span>
            <span className="text-muted-foreground">{plan.period}</span>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="space-y-3">
            {plan.features.map((feature: string, index: number) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="w-5 h-5 rounded-full bg-gaming-green flex items-center justify-center flex-shrink-0">
                  <Check className="w-3 h-3 text-white" />
                </div>
                <span className="text-sm">{feature}</span>
              </div>
            ))}
          </div>

          <Button 
            onClick={() => handlePurchase(plan.id)}
            className={`w-full bg-gradient-to-r ${plan.gradient} shadow-gaming hover:shadow-glow transition-all`}
            size="lg"
          >
            <Crown className="w-4 h-4 mr-2" />
            Choose {plan.name}
          </Button>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-hero p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            Upgrade to <span className="bg-gradient-primary bg-clip-text text-transparent [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] text-primary">Pro</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Unlock advanced gaming optimizations and exclusive features to dominate your competition.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {plans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </div>

        {/* App Download Section */}
        <Card className="bg-gradient-card border-primary/20">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl flex items-center justify-center space-x-2">
              <Download className="w-6 h-6" />
              <span>Download NexusPlay Apps</span>
            </CardTitle>
            <CardDescription>
              Access your optimizations on desktop and mobile with our native apps
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <Button
                variant="outline"
                size="lg"
                onClick={() => downloadApp("Windows")}
                className="h-16 hover:bg-gradient-primary hover:text-primary-foreground transition-all"
              >
                <div className="flex items-center space-x-3">
                  <Monitor className="w-6 h-6" />
                  <div className="text-left">
                    <div className="font-semibold">Windows Desktop</div>
                    <div className="text-sm text-muted-foreground">Full optimizer suite</div>
                  </div>
                </div>
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={() => downloadApp("Android")}
                className="h-16 hover:bg-gradient-primary hover:text-primary-foreground transition-all"
              >
                <div className="flex items-center space-x-3">
                  <Smartphone className="w-6 h-6" />
                  <div className="text-left">
                    <div className="font-semibold">Android Mobile</div>
                    <div className="text-sm text-muted-foreground">Mobile optimizations</div>
                  </div>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Benefits Section */}
        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold mb-8">Why Go Pro?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="w-16 h-16 mx-auto bg-gradient-primary rounded-full flex items-center justify-center">
                <Zap className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold">Advanced Optimization</h3>
              <p className="text-muted-foreground">
                Deep system tweaks that free users can't access, giving you the competitive edge.
              </p>
            </div>

            <div className="space-y-4">
              <div className="w-16 h-16 mx-auto bg-gradient-accent rounded-full flex items-center justify-center">
                <Shield className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold">Priority Support</h3>
              <p className="text-muted-foreground">
                Get help when you need it with our dedicated Pro user support team.
              </p>
            </div>

            <div className="space-y-4">
              <div className="w-16 h-16 mx-auto bg-gradient-primary rounded-full flex items-center justify-center">
                <Crown className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold">Exclusive Features</h3>
              <p className="text-muted-foreground">
                Beta access to new features and game-specific optimization profiles.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-gradient-card">
              <CardHeader>
                <CardTitle className="text-lg">How do I get my Pro key?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  After successful payment, your unique Pro key will be sent to your email within minutes. 
                  Use this key in the optimizer to unlock all Pro features.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card">
              <CardHeader>
                <CardTitle className="text-lg">Can I cancel anytime?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Yes! You can cancel your subscription at any time. Your Pro features will remain 
                  active until the end of your current billing period.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}