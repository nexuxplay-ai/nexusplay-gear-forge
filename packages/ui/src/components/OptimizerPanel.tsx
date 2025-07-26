import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Switch } from "./ui/switch";
import { Slider } from "./ui/slider";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { 
  Zap, 
  Cpu, 
  Monitor, 
  Wifi, 
  HardDrive, 
  Shield, 
  ChevronDown,
  ChevronRight,
  Lock,
  Unlock,
  Play,
  RotateCcw,
  Save,
  Settings,
  Activity,
  Crown,
  Star,
  Target,
  Gauge,
  Flame,
  Palette
} from "lucide-react";

interface OptimizationCategory {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  description: string;
  isPro?: boolean;
  isExpanded: boolean;
  settings: OptimizationSetting[];
}

interface OptimizationSetting {
  id: string;
  name: string;
  description: string;
  type: 'toggle' | 'slider' | 'select';
  value: any;
  range?: [number, number];
  options?: string[];
  isPro?: boolean;
  tooltip: string;
}

interface LiveStats {
  fps: number;
  cpu: number;
  gpu: number;
  ram: number;
  ping: number;
  temp: number;
}

interface OptimizationLog {
  timestamp: Date;
  action: string;
  category: string;
  impact: 'low' | 'medium' | 'high';
}

export default function OptimizerPanel() {
  const [isPro, setIsPro] = useState(false);
  const [activeCategory, setActiveCategory] = useState('fps-boost');
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [lastOptimization, setLastOptimization] = useState<Date | null>(null);
  const [selectedPreset, setSelectedPreset] = useState('balanced');
  const [customPresetName, setCustomPresetName] = useState('');
  const [showCreatePreset, setShowCreatePreset] = useState(false);
  const [optimizationLog, setOptimizationLog] = useState<OptimizationLog[]>([]);

  // Live system stats
  const [liveStats, setLiveStats] = useState<LiveStats>({
    fps: 144,
    cpu: 45,
    gpu: 67,
    ram: 58,
    ping: 23,
    temp: 65
  });

  // Optimization categories
  const [categories, setCategories] = useState<OptimizationCategory[]>([
    {
      id: 'fps-boost',
      name: 'FPS Boost',
      icon: Target,
      color: 'from-green-500 to-emerald-600',
      description: 'Maximize frame rates and reduce stuttering',
      isExpanded: true,
      settings: [
        {
          id: 'disable-vsync',
          name: 'Disable V-Sync',
          description: 'Remove frame rate cap for higher FPS',
          type: 'toggle',
          value: false,
          tooltip: 'Disables vertical sync to eliminate FPS caps. May cause screen tearing.'
        },
        {
          id: 'reduce-input-lag',
          name: 'Reduce Input Lag',
          description: 'Minimize delay between input and response',
          type: 'slider',
          value: [75],
          range: [0, 100],
          tooltip: 'Optimizes mouse and keyboard responsiveness for competitive gaming.'
        },
        {
          id: 'fps-limit',
          name: 'FPS Limit',
          description: 'Set maximum frame rate',
          type: 'select',
          value: 'unlimited',
          options: ['60', '120', '144', '240', 'unlimited'],
          tooltip: 'Caps frame rate to reduce GPU load or match monitor refresh rate.'
        }
      ]
    },
    {
      id: 'gpu-tweaks',
      name: 'GPU Tweaks',
      icon: Monitor,
      color: 'from-purple-500 to-violet-600',
      description: 'Graphics card optimization and overclocking',
      isPro: true,
      isExpanded: false,
      settings: [
        {
          id: 'gpu-overclock',
          name: 'GPU Overclock',
          description: 'Safely overclock graphics card',
          type: 'slider',
          value: [0],
          range: [-20, 50],
          isPro: true,
          tooltip: 'Increases GPU clock speeds for better performance. Monitor temperatures!'
        },
        {
          id: 'memory-overclock',
          name: 'Memory Overclock',
          description: 'Boost VRAM speed',
          type: 'slider',
          value: [0],
          range: [-10, 30],
          isPro: true,
          tooltip: 'Overclocks GPU memory for improved texture loading and bandwidth.'
        },
        {
          id: 'power-limit',
          name: 'Power Limit',
          description: 'Increase GPU power draw',
          type: 'slider',
          value: [100],
          range: [50, 150],
          isPro: true,
          tooltip: 'Allows GPU to draw more power for sustained high performance.'
        }
      ]
    },
    {
      id: 'network',
      name: 'Network Optimization',
      icon: Wifi,
      color: 'from-blue-500 to-cyan-600',
      description: 'Reduce ping and improve connection stability',
      isExpanded: false,
      settings: [
        {
          id: 'tcp-optimization',
          name: 'TCP Optimization',
          description: 'Optimize network stack for gaming',
          type: 'toggle',
          value: false,
          tooltip: 'Tweaks TCP settings to reduce latency and improve packet delivery.'
        },
        {
          id: 'dns-optimization',
          name: 'Gaming DNS',
          description: 'Use optimized DNS servers',
          type: 'select',
          value: 'cloudflare',
          options: ['default', 'cloudflare', 'google', 'quad9'],
          tooltip: 'Switches to faster DNS servers for reduced connection times.'
        },
        {
          id: 'buffer-optimization',
          name: 'Buffer Optimization',
          description: 'Adjust network buffer sizes',
          type: 'slider',
          value: [50],
          range: [10, 100],
          isPro: true,
          tooltip: 'Optimizes network buffers to reduce jitter and improve stability.'
        }
      ]
    },
    {
      id: 'system-power',
      name: 'System Power',
      icon: Flame,
      color: 'from-orange-500 to-red-600',
      description: 'CPU and power management optimization',
      isExpanded: false,
      settings: [
        {
          id: 'high-performance',
          name: 'High Performance Mode',
          description: 'Set Windows to high performance',
          type: 'toggle',
          value: false,
          tooltip: 'Switches Windows power plan to prioritize performance over battery life.'
        },
        {
          id: 'cpu-boost',
          name: 'CPU Boost',
          description: 'Enable processor turbo boost',
          type: 'toggle',
          value: true,
          tooltip: 'Allows CPU to exceed base clock speeds for better performance.'
        },
        {
          id: 'core-parking',
          name: 'Core Parking',
          description: 'Disable CPU core parking',
          type: 'toggle',
          value: false,
          isPro: true,
          tooltip: 'Prevents Windows from shutting down CPU cores, ensuring consistent performance.'
        }
      ]
    }
  ]);

  // Mock live stats update
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveStats(prev => ({
        fps: Math.max(60, prev.fps + (Math.random() - 0.5) * 10),
        cpu: Math.max(0, Math.min(100, prev.cpu + (Math.random() - 0.5) * 5)),
        gpu: Math.max(0, Math.min(100, prev.gpu + (Math.random() - 0.5) * 8)),
        ram: Math.max(0, Math.min(100, prev.ram + (Math.random() - 0.5) * 3)),
        ping: Math.max(1, prev.ping + (Math.random() - 0.5) * 5),
        temp: Math.max(30, Math.min(85, prev.temp + (Math.random() - 0.5) * 2))
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const handleOneClickOptimize = async () => {
    setIsOptimizing(true);
    
    // Simulate optimization process
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setLastOptimization(new Date());
    setIsOptimizing(false);
    
    // Add to log
    const newLog: OptimizationLog = {
      timestamp: new Date(),
      action: 'One-Click Optimization Applied',
      category: 'All Categories',
      impact: 'high'
    };
    setOptimizationLog(prev => [newLog, ...prev.slice(0, 9)]);
  };

  const handleSettingChange = (categoryId: string, settingId: string, value: any) => {
    setCategories(prev => prev.map(cat => 
      cat.id === categoryId 
        ? {
            ...cat,
            settings: cat.settings.map(setting => 
              setting.id === settingId ? { ...setting, value } : setting
            )
          }
        : cat
    ));
  };

  const toggleCategory = (categoryId: string) => {
    setCategories(prev => prev.map(cat => 
      cat.id === categoryId 
        ? { ...cat, isExpanded: !cat.isExpanded }
        : cat
    ));
  };

  const handleReset = () => {
    // Reset all settings to defaults
    setCategories(prev => prev.map(cat => ({
      ...cat,
      settings: cat.settings.map(setting => ({
        ...setting,
        value: setting.type === 'toggle' ? false : 
               setting.type === 'slider' ? [50] : 
               setting.options?.[0] || 'default'
      }))
    })));

    const newLog: OptimizationLog = {
      timestamp: new Date(),
      action: 'Settings Reset to Default',
      category: 'All Categories',
      impact: 'medium'
    };
    setOptimizationLog(prev => [newLog, ...prev.slice(0, 9)]);
  };

  const renderSetting = (setting: OptimizationSetting, categoryId: string) => {
    const isLocked = setting.isPro && !isPro;

    return (
      <TooltipProvider key={setting.id}>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className={`p-4 rounded-lg border transition-all ${
              isLocked 
                ? 'border-gray-700 bg-gray-900/50 opacity-60' 
                : 'border-gray-600 bg-gray-800/50 hover:border-purple-500/50'
            }`}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Label className="font-medium text-white">{setting.name}</Label>
                  {setting.isPro && <Lock className="w-4 h-4 text-amber-500" />}
                </div>
                
                {setting.type === 'toggle' && (
                  <Switch
                    checked={setting.value}
                    onCheckedChange={(value) => 
                      !isLocked && handleSettingChange(categoryId, setting.id, value)
                    }
                    disabled={isLocked}
                  />
                )}
              </div>
              
              <p className="text-sm text-gray-400 mb-3">{setting.description}</p>
              
              {setting.type === 'slider' && (
                <Slider
                  value={setting.value}
                  onValueChange={(value) => 
                    !isLocked && handleSettingChange(categoryId, setting.id, value)
                  }
                  min={setting.range?.[0] || 0}
                  max={setting.range?.[1] || 100}
                  step={1}
                  disabled={isLocked}
                  className="mb-2"
                />
              )}
              
              {setting.type === 'select' && (
                <Select
                  value={setting.value}
                  onValueChange={(value) => 
                    !isLocked && handleSettingChange(categoryId, setting.id, value)
                  }
                  disabled={isLocked}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {setting.options?.map(option => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p className="max-w-xs">{setting.tooltip}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Premium gradient background */}
      <div className="fixed inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.1)_0%,transparent_70%)]" />
      
      <div className="relative z-10">
        {/* Sticky Header with Live Stats */}
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="sticky top-0 z-50 backdrop-blur-lg bg-black/30 border-b border-gray-800"
        >
          <div className="max-w-7xl mx-auto p-6">
            {/* Live Stats Bar */}
            <div className="grid grid-cols-6 gap-4 mb-6">
              <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-3 border border-gray-700">
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-green-400" />
                  <span className="text-xs text-gray-400">FPS</span>
                </div>
                <p className="text-xl font-bold text-green-400">{Math.round(liveStats.fps)}</p>
              </div>
              
              <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-3 border border-gray-700">
                <div className="flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-blue-400" />
                  <span className="text-xs text-gray-400">CPU</span>
                </div>
                <p className="text-xl font-bold text-blue-400">{Math.round(liveStats.cpu)}%</p>
              </div>
              
              <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-3 border border-gray-700">
                <div className="flex items-center gap-2">
                  <Monitor className="w-4 h-4 text-purple-400" />
                  <span className="text-xs text-gray-400">GPU</span>
                </div>
                <p className="text-xl font-bold text-purple-400">{Math.round(liveStats.gpu)}%</p>
              </div>
              
              <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-3 border border-gray-700">
                <div className="flex items-center gap-2">
                  <HardDrive className="w-4 h-4 text-yellow-400" />
                  <span className="text-xs text-gray-400">RAM</span>
                </div>
                <p className="text-xl font-bold text-yellow-400">{Math.round(liveStats.ram)}%</p>
              </div>
              
              <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-3 border border-gray-700">
                <div className="flex items-center gap-2">
                  <Wifi className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs text-gray-400">PING</span>
                </div>
                <p className="text-xl font-bold text-cyan-400">{Math.round(liveStats.ping)}ms</p>
              </div>
              
              <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-3 border border-gray-700">
                <div className="flex items-center gap-2">
                  <Flame className="w-4 h-4 text-red-400" />
                  <span className="text-xs text-gray-400">TEMP</span>
                </div>
                <p className="text-xl font-bold text-red-400">{Math.round(liveStats.temp)}°C</p>
              </div>
            </div>
            
            {/* Status and Quick Actions */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${
                    isOptimizing ? 'bg-yellow-400 animate-pulse' : 
                    lastOptimization ? 'bg-green-400' : 'bg-gray-500'
                  }`} />
                  <span className="text-sm font-medium">
                    {isOptimizing ? 'Optimizing...' : 
                     lastOptimization ? 'Boost Active' : 'Ready to Optimize'}
                  </span>
                  {lastOptimization && (
                    <span className="text-xs text-gray-400">
                      (Last: {lastOptimization.toLocaleTimeString()})
                    </span>
                  )}
                </div>
                
                {!isPro && (
                  <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white">
                    <Crown className="w-3 h-3 mr-1" />
                    Upgrade to Pro
                  </Badge>
                )}
              </div>
              
              <div className="flex items-center gap-3">
                <Button
                  onClick={handleOneClickOptimize}
                  disabled={isOptimizing}
                  className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white"
                >
                  {isOptimizing ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <Settings className="w-4 h-4 mr-2" />
                    </motion.div>
                  ) : (
                    <Play className="w-4 h-4 mr-2" />
                  )}
                  {isOptimizing ? 'Optimizing...' : 'One-Click Optimize'}
                </Button>
                
                <Button
                  onClick={handleReset}
                  variant="outline"
                  className="border-gray-600 hover:border-gray-500"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="max-w-7xl mx-auto p-6 flex gap-6">
          {/* Left Sidebar Navigation */}
          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="w-80 space-y-4"
          >
            {/* Preset Selection */}
            <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-700">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Palette className="w-5 h-5 text-purple-400" />
                  Optimization Presets
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Select value={selectedPreset} onValueChange={setSelectedPreset}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="balanced">Balanced Gaming</SelectItem>
                    <SelectItem value="performance">Max Performance</SelectItem>
                    <SelectItem value="competitive">Competitive FPS</SelectItem>
                    <SelectItem value="streaming">Streaming Optimized</SelectItem>
                  </SelectContent>
                </Select>
                
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowCreatePreset(!showCreatePreset)}
                    className="flex-1"
                  >
                    <Save className="w-4 h-4 mr-1" />
                    Create Preset
                  </Button>
                </div>
                
                <AnimatePresence>
                  {showCreatePreset && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="space-y-2"
                    >
                      <Input
                        placeholder="My Custom Preset"
                        value={customPresetName}
                        onChange={(e) => setCustomPresetName(e.target.value)}
                      />
                      <Button size="sm" className="w-full">
                        Save Current Settings
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>

            {/* Category Navigation */}
            <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-700">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Categories</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {categories.map((category) => {
                  const IconComponent = category.icon;
                  const isActive = activeCategory === category.id;
                  
                  return (
                    <Button
                      key={category.id}
                      variant={isActive ? "default" : "ghost"}
                      className={`w-full justify-start ${
                        isActive 
                          ? `bg-gradient-to-r ${category.color} text-white` 
                          : 'hover:bg-gray-800'
                      }`}
                      onClick={() => setActiveCategory(category.id)}
                    >
                      <IconComponent className="w-4 h-4 mr-2" />
                      {category.name}
                      {category.isPro && <Lock className="w-3 h-3 ml-auto text-amber-500" />}
                    </Button>
                  );
                })}
              </CardContent>
            </Card>

            {/* Optimization Log */}
            <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-700">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Activity className="w-5 h-5 text-green-400" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 max-h-64 overflow-y-auto">
                {optimizationLog.map((log, index) => (
                  <div key={index} className="text-xs p-2 rounded bg-gray-800/50 border border-gray-700">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium">{log.action}</span>
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${
                          log.impact === 'high' ? 'border-green-500 text-green-400' :
                          log.impact === 'medium' ? 'border-yellow-500 text-yellow-400' :
                          'border-gray-500 text-gray-400'
                        }`}
                      >
                        {log.impact}
                      </Badge>
                    </div>
                    <div className="text-gray-400">
                      {log.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                ))}
                {optimizationLog.length === 0 && (
                  <p className="text-gray-500 text-center py-4">No recent activity</p>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Main Content Area */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex-1 space-y-6"
          >
            {categories.map((category) => {
              if (activeCategory !== category.id) return null;
              
              const IconComponent = category.icon;
              const isProCategory = category.isPro && !isPro;
              
              return (
                <Card key={category.id} className="bg-gray-900/50 backdrop-blur-sm border-gray-700">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`p-3 rounded-lg bg-gradient-to-r ${category.color}`}>
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-xl flex items-center gap-2">
                            {category.name}
                            {category.isPro && <Lock className="w-5 h-5 text-amber-500" />}
                          </CardTitle>
                          <p className="text-gray-400 text-sm">{category.description}</p>
                        </div>
                      </div>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleCategory(category.id)}
                      >
                        {category.isExpanded ? 
                          <ChevronDown className="w-4 h-4" /> : 
                          <ChevronRight className="w-4 h-4" />
                        }
                      </Button>
                    </div>
                  </CardHeader>
                  
                  <AnimatePresence>
                    {category.isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                      >
                        <CardContent>
                          {isProCategory ? (
                            <div className="text-center py-8">
                              <Crown className="w-16 h-16 text-amber-500 mx-auto mb-4" />
                              <h3 className="text-xl font-semibold mb-2">Pro Feature</h3>
                              <p className="text-gray-400 mb-4">
                                Unlock advanced {category.name.toLowerCase()} with NexusPlay Pro
                              </p>
                              <Button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600">
                                Upgrade to Pro
                              </Button>
                            </div>
                          ) : (
                            <div className="grid gap-4">
                              {category.settings.map((setting) => 
                                renderSetting(setting, category.id)
                              )}
                            </div>
                          )}
                        </CardContent>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Card>
              );
            })}
          </motion.div>
        </div>
      </div>
    </div>
  );
}