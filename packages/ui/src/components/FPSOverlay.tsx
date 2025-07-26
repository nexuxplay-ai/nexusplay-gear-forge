import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { 
  Eye, 
  EyeOff, 
  Move, 
  Settings, 
  Target,
  Cpu,
  Monitor,
  HardDrive,
  Thermometer,
  Wifi
} from "lucide-react";

interface FPSOverlayProps {
  isVisible?: boolean;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  showAdvanced?: boolean;
  onToggle?: () => void;
  onPositionChange?: (position: string) => void;
}

interface PerformanceStats {
  fps: number;
  cpu: number;
  gpu: number;
  ram: number;
  temp: number;
  ping: number;
  frameTime: number;
}

export default function FPSOverlay({ 
  isVisible = true, 
  position = 'top-left',
  showAdvanced = false,
  onToggle,
  onPositionChange 
}: FPSOverlayProps) {
  const [stats, setStats] = useState<PerformanceStats>({
    fps: 144,
    cpu: 45,
    gpu: 67,
    ram: 58,
    temp: 65,
    ping: 23,
    frameTime: 6.94
  });
  
  const [isDragging, setIsDragging] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [isCompact, setIsCompact] = useState(false);

  // Simulate real-time stats updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        fps: Math.max(30, Math.min(240, prev.fps + (Math.random() - 0.5) * 10)),
        cpu: Math.max(0, Math.min(100, prev.cpu + (Math.random() - 0.5) * 5)),
        gpu: Math.max(0, Math.min(100, prev.gpu + (Math.random() - 0.5) * 8)),
        ram: Math.max(0, Math.min(100, prev.ram + (Math.random() - 0.5) * 3)),
        temp: Math.max(30, Math.min(85, prev.temp + (Math.random() - 0.5) * 2)),
        ping: Math.max(1, Math.min(200, prev.ping + (Math.random() - 0.5) * 5)),
        frameTime: 1000 / Math.max(30, Math.min(240, prev.fps + (Math.random() - 0.5) * 10))
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const getPositionClasses = () => {
    switch (position) {
      case 'top-left':
        return 'top-4 left-4';
      case 'top-right':
        return 'top-4 right-4';
      case 'bottom-left':
        return 'bottom-4 left-4';
      case 'bottom-right':
        return 'bottom-4 right-4';
      default:
        return 'top-4 left-4';
    }
  };

  const getFPSColor = (fps: number) => {
    if (fps >= 120) return 'text-green-400';
    if (fps >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getUsageColor = (usage: number) => {
    if (usage >= 80) return 'text-red-400';
    if (usage >= 60) return 'text-yellow-400';
    return 'text-green-400';
  };

  const getTempColor = (temp: number) => {
    if (temp >= 80) return 'text-red-400';
    if (temp >= 70) return 'text-yellow-400';
    return 'text-green-400';
  };

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className={`fixed ${getPositionClasses()} z-50 select-none`}
      style={{ 
        fontFamily: 'monospace',
        userSelect: 'none',
        pointerEvents: 'auto'
      }}
    >
      <Card className="bg-black/90 backdrop-blur-md border-gray-700/50 shadow-2xl">
        <div className="relative">
          {/* Header with drag handle */}
          <div 
            className="flex items-center justify-between p-2 cursor-move border-b border-gray-700/50"
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
          >
            <div className="flex items-center gap-2">
              <Move className="w-3 h-3 text-gray-400" />
              <span className="text-xs font-semibold text-green-400">NEXUS</span>
            </div>
            
            <div className="flex items-center gap-1">
              <Button
                size="sm"
                variant="ghost"
                className="h-6 w-6 p-0"
                onClick={() => setIsCompact(!isCompact)}
              >
                <Target className="w-3 h-3" />
              </Button>
              
              <Button
                size="sm"
                variant="ghost"
                className="h-6 w-6 p-0"
                onClick={() => setShowSettings(!showSettings)}
              >
                <Settings className="w-3 h-3" />
              </Button>
              
              <Button
                size="sm"
                variant="ghost"
                className="h-6 w-6 p-0"
                onClick={onToggle}
              >
                {isVisible ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
              </Button>
            </div>
          </div>

          {/* Settings Panel */}
          <AnimatePresence>
            {showSettings && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="border-b border-gray-700/50 p-2 space-y-2"
              >
                <div className="text-xs text-gray-400">Position:</div>
                <div className="grid grid-cols-2 gap-1">
                  {['top-left', 'top-right', 'bottom-left', 'bottom-right'].map((pos) => (
                    <Button
                      key={pos}
                      size="sm"
                      variant={position === pos ? "default" : "ghost"}
                      className="h-6 text-xs"
                      onClick={() => onPositionChange?.(pos)}
                    >
                      {pos.replace('-', ' ')}
                    </Button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Stats Display */}
          <div className="p-3 space-y-2">
            {/* Primary FPS Display */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-green-400" />
                <span className="text-xs text-gray-400">FPS</span>
              </div>
              <div className="text-right">
                <span className={`text-lg font-bold ${getFPSColor(stats.fps)}`}>
                  {Math.round(stats.fps)}
                </span>
                <div className="text-xs text-gray-500">
                  {stats.frameTime.toFixed(1)}ms
                </div>
              </div>
            </div>

            {/* Compact vs Detailed View */}
            <AnimatePresence>
              {(!isCompact || showAdvanced) && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="space-y-2"
                >
                  {/* CPU Usage */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Cpu className="w-3 h-3 text-blue-400" />
                      <span className="text-xs text-gray-400">CPU</span>
                    </div>
                    <span className={`text-sm font-semibold ${getUsageColor(stats.cpu)}`}>
                      {Math.round(stats.cpu)}%
                    </span>
                  </div>

                  {/* GPU Usage */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Monitor className="w-3 h-3 text-purple-400" />
                      <span className="text-xs text-gray-400">GPU</span>
                    </div>
                    <span className={`text-sm font-semibold ${getUsageColor(stats.gpu)}`}>
                      {Math.round(stats.gpu)}%
                    </span>
                  </div>

                  {/* RAM Usage */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <HardDrive className="w-3 h-3 text-yellow-400" />
                      <span className="text-xs text-gray-400">RAM</span>
                    </div>
                    <span className={`text-sm font-semibold ${getUsageColor(stats.ram)}`}>
                      {Math.round(stats.ram)}%
                    </span>
                  </div>

                  {/* Temperature */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Thermometer className="w-3 h-3 text-red-400" />
                      <span className="text-xs text-gray-400">TEMP</span>
                    </div>
                    <span className={`text-sm font-semibold ${getTempColor(stats.temp)}`}>
                      {Math.round(stats.temp)}°C
                    </span>
                  </div>

                  {/* Network Ping */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Wifi className="w-3 h-3 text-cyan-400" />
                      <span className="text-xs text-gray-400">PING</span>
                    </div>
                    <span className={`text-sm font-semibold ${
                      stats.ping <= 30 ? 'text-green-400' :
                      stats.ping <= 60 ? 'text-yellow-400' : 'text-red-400'
                    }`}>
                      {Math.round(stats.ping)}ms
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Performance Status */}
            <div className="pt-2 border-t border-gray-700/50">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400">Status</span>
                <Badge 
                  variant="outline" 
                  className={`text-xs ${
                    stats.fps >= 120 && stats.cpu < 80 && stats.gpu < 80 
                      ? 'border-green-500 text-green-400' 
                      : stats.fps >= 60 
                      ? 'border-yellow-500 text-yellow-400'
                      : 'border-red-500 text-red-400'
                  }`}
                >
                  {stats.fps >= 120 && stats.cpu < 80 && stats.gpu < 80 
                    ? 'Optimal' 
                    : stats.fps >= 60 
                    ? 'Good'
                    : 'Throttled'}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}