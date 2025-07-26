import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { 
  Cpu, 
  MemoryStick, 
  HardDrive, 
  Thermometer, 
  Zap, 
  Wifi, 
  Monitor,
  Activity,
  Gauge,
  TrendingUp,
  Shield
} from "lucide-react";

interface SystemStats {
  cpu: {
    usage: number;
    temperature: number;
    cores: number;
    frequency: number;
  };
  memory: {
    used: number;
    total: number;
    available: number;
  };
  disk: {
    used: number;
    total: number;
    readSpeed: number;
    writeSpeed: number;
  };
  network: {
    download: number;
    upload: number;
    latency: number;
  };
  gpu: {
    usage: number;
    temperature: number;
    memory: number;
    power: number;
  };
  system: {
    uptime: number;
    processes: number;
    threats: number;
  };
}

export default function SystemMonitor() {
  const [stats, setStats] = useState<SystemStats>({
    cpu: { usage: 0, temperature: 0, cores: 8, frequency: 0 },
    memory: { used: 0, total: 16, available: 16 },
    disk: { used: 0, total: 512, readSpeed: 0, writeSpeed: 0 },
    network: { download: 0, upload: 0, latency: 0 },
    gpu: { usage: 0, temperature: 0, memory: 0, power: 0 },
    system: { uptime: 0, processes: 0, threats: 0 }
  });

  const [history, setHistory] = useState<{cpu: number[]; memory: number[]; network: number[]}>({
    cpu: Array(20).fill(0),
    memory: Array(20).fill(0),
    network: Array(20).fill(0)
  });

  const intervalRef = useRef<NodeJS.Timeout>();

  // Mock real-time data generation
  useEffect(() => {
    const generateStats = (): SystemStats => {
      const time = Date.now() / 1000;
      return {
        cpu: {
          usage: Math.max(5, Math.min(95, 30 + Math.sin(time * 0.5) * 20 + Math.random() * 10)),
          temperature: Math.max(35, Math.min(85, 55 + Math.sin(time * 0.3) * 15 + Math.random() * 5)),
          cores: 8,
          frequency: 3200 + Math.random() * 800
        },
        memory: {
          used: Math.max(2, Math.min(14, 8 + Math.sin(time * 0.2) * 3 + Math.random() * 2)),
          total: 16,
          available: 16 - (8 + Math.sin(time * 0.2) * 3 + Math.random() * 2)
        },
        disk: {
          used: 256,
          total: 512,
          readSpeed: Math.max(0, 150 + Math.sin(time * 0.7) * 100 + Math.random() * 50),
          writeSpeed: Math.max(0, 80 + Math.sin(time * 0.9) * 60 + Math.random() * 30)
        },
        network: {
          download: Math.max(0, 50 + Math.sin(time * 0.4) * 40 + Math.random() * 20),
          upload: Math.max(0, 20 + Math.sin(time * 0.6) * 15 + Math.random() * 10),
          latency: Math.max(1, 15 + Math.sin(time * 0.8) * 10 + Math.random() * 5)
        },
        gpu: {
          usage: Math.max(0, Math.min(100, 45 + Math.sin(time * 0.3) * 30 + Math.random() * 15)),
          temperature: Math.max(40, Math.min(90, 65 + Math.sin(time * 0.4) * 20 + Math.random() * 8)),
          memory: Math.max(2, Math.min(12, 6 + Math.sin(time * 0.25) * 3 + Math.random() * 2)),
          power: Math.max(50, Math.min(350, 180 + Math.sin(time * 0.35) * 80 + Math.random() * 40))
        },
        system: {
          uptime: Math.floor(time % 86400),
          processes: Math.floor(120 + Math.random() * 50),
          threats: Math.floor(Math.random() * 3)
        }
      };
    };

    intervalRef.current = setInterval(() => {
      const newStats = generateStats();
      setStats(newStats);
      
      setHistory(prev => ({
        cpu: [...prev.cpu.slice(1), newStats.cpu.usage],
        memory: [...prev.memory.slice(1), (newStats.memory.used / newStats.memory.total) * 100],
        network: [...prev.network.slice(1), newStats.network.download]
      }));
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const getStatusColor = (value: number, thresholds: [number, number]) => {
    if (value < thresholds[0]) return "text-green-400";
    if (value < thresholds[1]) return "text-yellow-400";
    return "text-red-400";
  };

  const MiniChart = ({ data, color = "#8b5cf6" }: { data: number[], color?: string }) => (
    <div className="h-8 w-24 flex items-end space-x-0.5">
      {data.map((value, index) => (
        <div
          key={index}
          className="flex-1 rounded-sm opacity-80"
          style={{
            height: `${Math.max(2, (value / 100) * 100)}%`,
            backgroundColor: color
          }}
        />
      ))}
    </div>
  );

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20">
            <Activity className="h-6 w-6 text-purple-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">System Monitor</h2>
            <p className="text-sm text-gray-400">Real-time performance metrics</p>
          </div>
        </div>
        <Badge variant="outline" className="border-green-500/30 text-green-400">
          <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse" />
          Live
        </Badge>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* CPU */}
        <Card className="bg-black/40 border-gray-800/50 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2 text-sm">
              <Cpu className="h-4 w-4 text-blue-400" />
              <span>CPU</span>
              <MiniChart data={history.cpu} color="#3b82f6" />
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-400">Usage</span>
              <span className={`text-sm font-mono ${getStatusColor(stats.cpu.usage, [60, 80])}`}>
                {stats.cpu.usage.toFixed(1)}%
              </span>
            </div>
            <Progress value={stats.cpu.usage} className="h-2" />
            
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-400">Temp</span>
                <span className={getStatusColor(stats.cpu.temperature, [70, 80])}>
                  {stats.cpu.temperature.toFixed(0)}°C
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Freq</span>
                <span className="text-white">{(stats.cpu.frequency / 1000).toFixed(1)}GHz</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Memory */}
        <Card className="bg-black/40 border-gray-800/50 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2 text-sm">
              <MemoryStick className="h-4 w-4 text-green-400" />
              <span>Memory</span>
              <MiniChart data={history.memory} color="#10b981" />
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-400">Usage</span>
              <span className={`text-sm font-mono ${getStatusColor((stats.memory.used / stats.memory.total) * 100, [70, 85])}`}>
                {((stats.memory.used / stats.memory.total) * 100).toFixed(1)}%
              </span>
            </div>
            <Progress value={(stats.memory.used / stats.memory.total) * 100} className="h-2" />
            
            <div className="text-xs space-y-1">
              <div className="flex justify-between">
                <span className="text-gray-400">Used</span>
                <span className="text-white">{stats.memory.used.toFixed(1)} GB</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Available</span>
                <span className="text-white">{stats.memory.available.toFixed(1)} GB</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* GPU */}
        <Card className="bg-black/40 border-gray-800/50 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2 text-sm">
              <Monitor className="h-4 w-4 text-purple-400" />
              <span>GPU</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-400">Usage</span>
              <span className={`text-sm font-mono ${getStatusColor(stats.gpu.usage, [70, 90])}`}>
                {stats.gpu.usage.toFixed(1)}%
              </span>
            </div>
            <Progress value={stats.gpu.usage} className="h-2" />
            
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-400">Temp</span>
                <span className={getStatusColor(stats.gpu.temperature, [75, 85])}>
                  {stats.gpu.temperature.toFixed(0)}°C
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Power</span>
                <span className="text-white">{stats.gpu.power.toFixed(0)}W</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Network */}
        <Card className="bg-black/40 border-gray-800/50 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2 text-sm">
              <Wifi className="h-4 w-4 text-cyan-400" />
              <span>Network</span>
              <MiniChart data={history.network} color="#06b6d4" />
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-400">Download</span>
                <span className="text-cyan-400 font-mono">{stats.network.download.toFixed(1)} Mbps</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Upload</span>
                <span className="text-cyan-400 font-mono">{stats.network.upload.toFixed(1)} Mbps</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Latency</span>
                <span className={`font-mono ${getStatusColor(stats.network.latency, [30, 60])}`}>
                  {stats.network.latency.toFixed(0)}ms
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Storage */}
        <Card className="bg-black/40 border-gray-800/50 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2 text-sm">
              <HardDrive className="h-4 w-4 text-orange-400" />
              <span>Storage</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-400">Used</span>
              <span className="text-sm font-mono text-orange-400">
                {((stats.disk.used / stats.disk.total) * 100).toFixed(1)}%
              </span>
            </div>
            <Progress value={(stats.disk.used / stats.disk.total) * 100} className="h-2" />
            
            <div className="text-xs space-y-1">
              <div className="flex justify-between">
                <span className="text-gray-400">Read</span>
                <span className="text-white">{stats.disk.readSpeed.toFixed(0)} MB/s</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Write</span>
                <span className="text-white">{stats.disk.writeSpeed.toFixed(0)} MB/s</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* System */}
        <Card className="bg-black/40 border-gray-800/50 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2 text-sm">
              <Shield className="h-4 w-4 text-emerald-400" />
              <span>System</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-400">Uptime</span>
                <span className="text-emerald-400 font-mono">
                  {Math.floor(stats.system.uptime / 3600)}h {Math.floor((stats.system.uptime % 3600) / 60)}m
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Processes</span>
                <span className="text-white font-mono">{stats.system.processes}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Threats</span>
                <span className={`font-mono ${stats.system.threats > 0 ? 'text-red-400' : 'text-green-400'}`}>
                  {stats.system.threats} detected
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}