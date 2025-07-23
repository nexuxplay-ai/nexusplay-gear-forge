import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, Lock, Unlock, Monitor, Smartphone, Server, Zap, Shield, Cpu, HardDrive, Crown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import GPUTweaks from "@/components/optimization/GPUTweaks";
import SystemTweaks from "@/components/optimization/SystemTweaks";
import PowerTweaks from "@/components/optimization/PowerTweaks";


export default function Optimizer() {
  const [proTier, setProTier] = useState(0); // 0 = free, 1 = tier 1, 2 = tier 2
  const [proKey, setProKey] = useState("");
  const { toast } = useToast();

  const [settings, setSettings] = useState({
    // Basic settings (free tier)
    disableVsync: false,
    fullscreenOptimization: false,
    highPerformanceMode: false,
    disableWindowsUpdates: false,
    
    // Pro Tier 1 settings
    cpuOptimization: false,
    ramOptimization: false,
    diskOptimization: false,
    networkOptimization: false,
    
    // Pro Tier 2 settings
    advancedTweaks: false,
    customRegistry: false,
    serviceOptimization: false,
    securityBypass: false,
    
    // Additional optimizations
    gameMode: false,
    backgroundApps: false,
    mouseSensitivity: false,
    systemCleaner: false,
    overclocking: false,
    thermalManagement: false,
  });

  const basicOptimizations = [
    { 
      key: "disableVsync", 
      label: "Disable V-Sync", 
      description: "Reduces input lag for competitive gaming",
      icon: Monitor
    },
    { 
      key: "fullscreenOptimization", 
      label: "Fullscreen Optimization", 
      description: "Optimizes fullscreen games for better performance",
      icon: Zap
    },
    { 
      key: "highPerformanceMode", 
      label: "High Performance Mode", 
      description: "Sets Windows to high performance power plan",
      icon: Cpu
    },
    { 
      key: "disableWindowsUpdates", 
      label: "Disable Auto Updates", 
      description: "Prevents Windows updates during gaming",
      icon: Shield
    },
  ];

  const proTier1Optimizations = [
    { 
      key: "cpuOptimization", 
      label: "CPU Optimization", 
      description: "Advanced CPU scheduling and priority tweaks",
      icon: Cpu
    },
    { 
      key: "ramOptimization", 
      label: "RAM Optimization", 
      description: "Memory management and allocation improvements",
      icon: HardDrive
    },
    { 
      key: "diskOptimization", 
      label: "Disk Optimization", 
      description: "SSD/HDD performance optimizations",
      icon: HardDrive
    },
    { 
      key: "networkOptimization", 
      label: "Network Optimization", 
      description: "Reduces network latency and packet loss",
      icon: Monitor
    },
  ];

  const proTier2Optimizations = [
    { 
      key: "advancedTweaks", 
      label: "Advanced System Tweaks", 
      description: "Deep system modifications for maximum performance",
      icon: Zap
    },
    { 
      key: "customRegistry", 
      label: "Custom Registry Edits", 
      description: "Professional-grade registry optimizations",
      icon: Shield
    },
    { 
      key: "serviceOptimization", 
      label: "Service Optimization", 
      description: "Optimize Windows services for gaming",
      icon: Server
    },
    { 
      key: "securityBypass", 
      label: "Security Bypass", 
      description: "Bypass Windows Defender for better performance",
      icon: Lock
    },
  ];

  const handleToggle = (key: string) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleExport = () => {
    // Simulate exporting optimization settings
    toast({
      title: "Optimizations Exported!",
      description: "Your optimization package has been downloaded as a ZIP file.",
    });
  };

  const validateProKey = () => {
    // Mock validation - in real app, this would call an API
    if (proKey === "NEXUS-PRO-T1-DEMO") {
      setProTier(1);
      toast({
        title: "Pro Tier 1 Activated!",
        description: "You now have access to Tier 1 Pro features.",
      });
    } else if (proKey === "NEXUS-PRO-T2-DEMO") {
      setProTier(2);
      toast({
        title: "Pro Tier 2 Activated!",
        description: "You now have access to all Pro features.",
      });
    } else if (proKey === "NEXUS-PRO-DEMO") {
      setProTier(1);
      toast({
        title: "Pro Tier 1 Activated!",
        description: "You now have access to Tier 1 Pro features.",
      });
    } else {
      toast({
        title: "Invalid Pro Key",
        description: "Please check your key and try again.",
        variant: "destructive",
      });
    }
  };

  // Additional optimization arrays
  const additionalBasicOptimizations = [
    { 
      key: "gameMode", 
      label: "Game Mode", 
      description: "Activates Windows Game Mode for better performance",
      icon: Zap
    },
    { 
      key: "backgroundApps", 
      label: "Background Apps", 
      description: "Limits background application usage",
      icon: Shield
    },
    { 
      key: "mouseSensitivity", 
      label: "Mouse Optimization", 
      description: "Optimizes mouse polling rate and sensitivity",
      icon: Monitor
    },
  ];

  const additionalProTier1Optimizations = [
    { 
      key: "systemCleaner", 
      label: "System Cleaner", 
      description: "Cleans temporary files and system cache",
      icon: HardDrive
    },
  ];

  const additionalProTier2Optimizations = [
    { 
      key: "overclocking", 
      label: "Safe Overclocking", 
      description: "Applies safe CPU/GPU overclocking profiles",
      icon: Cpu
    },
    { 
      key: "thermalManagement", 
      label: "Thermal Management", 
      description: "Advanced thermal monitoring and fan control",
      icon: Zap
    },
  ];

  const OptimizationCard = ({ optimization, disabled = false, tier = "" }) => {
    const Icon = optimization.icon;
    return (
      <Card className={`transition-all ${disabled ? "opacity-50" : "hover:shadow-gaming"}`}>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg ${disabled ? "bg-muted" : "bg-gradient-primary"}`}>
                <Icon className={`w-4 h-4 ${disabled ? "text-muted-foreground" : "text-primary-foreground"}`} />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <Label className="font-medium">{optimization.label}</Label>
                  {tier && <Badge variant="secondary" className="text-xs">{tier}</Badge>}
                </div>
                <p className="text-sm text-muted-foreground">{optimization.description}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {disabled && <Lock className="w-4 h-4 text-muted-foreground" />}
              <Switch
                checked={settings[optimization.key]}
                onCheckedChange={() => handleToggle(optimization.key)}
                disabled={disabled}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-hero p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">
            Game <span className="bg-gradient-primary bg-clip-text text-transparent">Optimizer</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Optimize your system for maximum gaming performance across Windows, Android, and Linux platforms.
          </p>
        </div>

        {/* Pro Status */}
        {proTier > 0 && (
          <Card className="mb-8 border-primary/20 bg-gradient-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Crown className="w-5 h-5 text-primary" />
                  <span className="font-semibold">Pro Tier {proTier} Active</span>
                  <Badge className={proTier === 2 ? "bg-gaming-purple" : "bg-gaming-blue"}>
                    {proTier === 2 ? "Max Tier" : "Tier 1"}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Pro Key Input */}
        {proTier === 0 && (
          <Card className="mb-8 border-primary/20 bg-gradient-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Lock className="w-5 h-5" />
                <span>Enter Pro Key</span>
              </CardTitle>
              <CardDescription>
                Unlock advanced optimizations with your Pro license key
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-2">
                <Input
                  placeholder="NEXUS-PRO-XXXX-XXXX"
                  value={proKey}
                  onChange={(e) => setProKey(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={validateProKey} className="bg-gradient-primary">
                  <Unlock className="w-4 h-4 mr-2" />
                  Activate
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Platform Tabs */}
        <Tabs defaultValue="windows" className="mb-8">
          <TabsList className="grid w-full grid-cols-3 bg-card">
            <TabsTrigger value="windows" className="flex items-center space-x-2">
              <Monitor className="w-4 h-4" />
              <span>Windows</span>
            </TabsTrigger>
            <TabsTrigger value="android" className="flex items-center space-x-2">
              <Smartphone className="w-4 h-4" />
              <span>Android</span>
            </TabsTrigger>
            <TabsTrigger value="linux" className="flex items-center space-x-2">
              <Server className="w-4 h-4" />
              <span>Linux</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="windows" className="space-y-8">
            {/* GPU Tweaks */}
            <GPUTweaks />

            {/* System Tweaks */}
            <SystemTweaks />

            {/* Power Tweaks */}
            <PowerTweaks />

            {/* Basic Optimizations */}
            <div>
              <h3 className="text-xl font-semibold mb-4 flex items-center space-x-2">
                <Badge variant="secondary">Free</Badge>
                <span>Basic Optimizations</span>
              </h3>
              <div className="grid gap-4">
                {basicOptimizations.map((opt) => (
                  <OptimizationCard key={opt.key} optimization={opt} />
                ))}
                {additionalBasicOptimizations.map((opt) => (
                  <OptimizationCard key={opt.key} optimization={opt} />
                ))}
              </div>
            </div>

            {/* Pro Tier 1 */}
            <div>
              <h3 className="text-xl font-semibold mb-4 flex items-center space-x-2">
                <Badge className="bg-gaming-blue">Pro Tier 1</Badge>
                <span>Advanced Optimizations</span>
              </h3>
              <div className="grid gap-4">
                {proTier1Optimizations.map((opt) => (
                  <OptimizationCard 
                    key={opt.key} 
                    optimization={opt} 
                    disabled={proTier < 1}
                    tier="Tier 1"
                  />
                ))}
                {additionalProTier1Optimizations.map((opt) => (
                  <OptimizationCard 
                    key={opt.key} 
                    optimization={opt} 
                    disabled={proTier < 1}
                    tier="Tier 1"
                  />
                ))}
              </div>
            </div>

            {/* Pro Tier 2 */}
            <div>
              <h3 className="text-xl font-semibold mb-4 flex items-center space-x-2">
                <Badge className="bg-gaming-purple">Pro Tier 2</Badge>
                <span>Expert Optimizations</span>
              </h3>
              <div className="grid gap-4">
                {proTier2Optimizations.map((opt) => (
                  <OptimizationCard 
                    key={opt.key} 
                    optimization={opt} 
                    disabled={proTier < 2}
                    tier="Tier 2"
                  />
                ))}
                {additionalProTier2Optimizations.map((opt) => (
                  <OptimizationCard 
                    key={opt.key} 
                    optimization={opt} 
                    disabled={proTier < 2}
                    tier="Tier 2"
                  />
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="android" className="text-center py-16">
            <div className="text-muted-foreground">
              <Smartphone className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-semibold mb-2">Android Optimizations</h3>
              <p>Android optimizations coming soon!</p>
            </div>
          </TabsContent>

          <TabsContent value="linux" className="text-center py-16">
            <div className="text-muted-foreground">
              <Server className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-semibold mb-2">Linux Optimizations</h3>
              <p>Linux optimizations coming soon!</p>
            </div>
          </TabsContent>
        </Tabs>

        {/* Export Button */}
        <div className="text-center">
          <Button 
            onClick={handleExport} 
            size="lg" 
            className="bg-gradient-primary shadow-gaming"
          >
            <Download className="w-5 h-5 mr-2" />
            Export Optimizations
          </Button>
        </div>
      </div>
    </div>
  );
}