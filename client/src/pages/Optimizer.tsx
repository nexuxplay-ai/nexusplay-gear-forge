import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, Lock, Unlock, Monitor, Smartphone, Server, Zap, Shield, Cpu, HardDrive, Crown, Activity, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import GPUTweaks from "@/components/optimization/GPUTweaks";
import SystemTweaks from "@/components/optimization/SystemTweaks";
import PowerTweaks from "@/components/optimization/PowerTweaks";
import SystemMonitor from "@/components/SystemMonitor";


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
    setSettings(prev => ({ ...prev, [key]: !prev[key as keyof typeof settings] }));
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

  const OptimizationCard = ({ optimization, disabled = false, tier = "" }: {
    optimization: {
      key: string;
      label: string;
      description: string;
      icon: any;
    };
    disabled?: boolean;
    tier?: string;
  }) => {
    const Icon = optimization.icon;
    return (
      <Card className={`transition-all bg-black/40 border-gray-800/50 backdrop-blur-sm ${
        disabled ? "opacity-50" : "hover:border-purple-500/30 hover:bg-black/60"
      }`}>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg ${
                disabled ? "bg-gray-800/50" : "bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/20"
              }`}>
                <Icon className={`w-4 h-4 ${disabled ? "text-gray-500" : "text-purple-400"}`} />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <Label className="font-medium text-white">{optimization.label}</Label>
                  {tier && (
                    <Badge 
                      variant="outline" 
                      className={`text-xs border-gray-600 ${
                        tier.includes("1") ? "text-blue-400 border-blue-500/30" :
                        tier.includes("2") ? "text-purple-400 border-purple-500/30" :
                        "text-gray-400"
                      }`}
                    >
                      {tier}
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-gray-400">{optimization.description}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {disabled && <Lock className="w-4 h-4 text-gray-500" />}
              <Switch
                checked={settings[optimization.key as keyof typeof settings]}
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
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.15)_0%,transparent_70%)]" />
      
      <div className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-purple-500/20">
                <Settings className="h-8 w-8 text-purple-400" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">
                  Gaming <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Optimizer</span>
                </h1>
                <p className="text-gray-400">Premium system optimization and monitoring</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="border-green-500/30 text-green-400 px-3 py-1">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse" />
                System Online
              </Badge>
              {proTier > 0 && (
                <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1">
                  <Crown className="w-4 h-4 mr-1" />
                  Pro Tier {proTier}
                </Badge>
              )}
            </div>
          </div>

          {/* Main Layout with Tabs */}
          <Tabs defaultValue="monitoring" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 bg-black/40 border border-gray-800/50 backdrop-blur-sm">
              <TabsTrigger value="monitoring" className="flex items-center space-x-2 data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400">
                <Activity className="w-4 h-4" />
                <span>System Monitor</span>
              </TabsTrigger>
              <TabsTrigger value="windows" className="flex items-center space-x-2 data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400">
                <Monitor className="w-4 h-4" />
                <span>Windows</span>
              </TabsTrigger>
              <TabsTrigger value="android" className="flex items-center space-x-2 data-[state=active]:bg-green-500/20 data-[state=active]:text-green-400">
                <Smartphone className="w-4 h-4" />
                <span>Android</span>
              </TabsTrigger>
              <TabsTrigger value="linux" className="flex items-center space-x-2 data-[state=active]:bg-orange-500/20 data-[state=active]:text-orange-400">
                <Server className="w-4 h-4" />
                <span>Linux</span>
              </TabsTrigger>
            </TabsList>

            {/* System Monitoring Tab */}
            <TabsContent value="monitoring" className="space-y-6">
              <SystemMonitor />
            </TabsContent>

            {/* Windows Optimizations Tab */}
            <TabsContent value="windows" className="space-y-6">
              {/* Pro Key Input */}
              {proTier === 0 && (
                <Card className="bg-black/40 border-gray-800/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-white">
                      <Lock className="w-5 h-5 text-purple-400" />
                      <span>Unlock Pro Features</span>
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      Enter your license key to unlock advanced optimizations
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex space-x-2">
                      <Input
                        placeholder="NEXUS-PRO-XXXX-XXXX"
                        value={proKey}
                        onChange={(e) => setProKey(e.target.value)}
                        className="flex-1 bg-black/20 border-gray-700 text-white"
                      />
                      <Button 
                        onClick={validateProKey} 
                        className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                      >
                        <Unlock className="w-4 h-4 mr-2" />
                        Activate
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            {/* GPU Tweaks */}
            <GPUTweaks />

            {/* System Tweaks */}
            <SystemTweaks />

            {/* Power Tweaks */}
            <PowerTweaks />

              {/* Basic Optimizations */}
              <div>
                <h3 className="text-xl font-semibold mb-4 flex items-center space-x-2 text-white">
                  <Badge variant="outline" className="border-green-500/30 text-green-400">Free</Badge>
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
                <h3 className="text-xl font-semibold mb-4 flex items-center space-x-2 text-white">
                  <Badge className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white">Pro Tier 1</Badge>
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
                <h3 className="text-xl font-semibold mb-4 flex items-center space-x-2 text-white">
                  <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">Pro Tier 2</Badge>
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
              
              {/* Export Button */}
              <div className="text-center pt-6">
                <Button 
                  onClick={handleExport} 
                  size="lg" 
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-3"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Export Optimizations
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="android" className="text-center py-16">
              <Card className="bg-black/40 border-gray-800/50 backdrop-blur-sm max-w-md mx-auto">
                <CardContent className="p-8">
                  <div className="text-gray-400">
                    <div className="p-4 rounded-xl bg-green-500/10 w-fit mx-auto mb-4">
                      <Smartphone className="w-16 h-16 text-green-400" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-white">Android Optimizations</h3>
                    <p>Mobile gaming optimizations coming soon!</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="linux" className="text-center py-16">
              <Card className="bg-black/40 border-gray-800/50 backdrop-blur-sm max-w-md mx-auto">
                <CardContent className="p-8">
                  <div className="text-gray-400">
                    <div className="p-4 rounded-xl bg-orange-500/10 w-fit mx-auto mb-4">
                      <Server className="w-16 h-16 text-orange-400" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-white">Linux Optimizations</h3>
                    <p>Linux gaming optimizations coming soon!</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}