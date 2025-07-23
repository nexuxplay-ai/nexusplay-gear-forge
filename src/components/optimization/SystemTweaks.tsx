import ToggleCard from "../ToggleCard";
import { Shield, Zap, HardDrive, Cpu, Settings, Trash } from "lucide-react";

export default function SystemTweaks() {
  const systemOptimizations = [
    {
      title: "Disable Telemetry",
      description: "Turn off unnecessary tracking to reduce background CPU usage",
      icon: Shield,
      tooltip: "Disables Windows diagnostic data collection for better privacy and performance"
    },
    {
      title: "Disable Startup Delay",
      description: "Speed up system boot time",
      icon: Zap,
      tooltip: "Removes artificial delays in Windows startup process"
    },
    {
      title: "Disable Xbox Game Bar",
      description: "Free up system resources for gaming",
      icon: Settings,
      tooltip: "Disables Windows Game Bar overlay and background processes"
    },
    {
      title: "Registry Cleanup",
      description: "Clean invalid registry entries",
      icon: Trash,
      tooltip: "Safely removes broken registry keys that can slow down the system"
    },
    {
      title: "Background Process Limiter",
      description: "Limit unnecessary background processes",
      icon: Cpu,
      tooltip: "Restricts non-essential Windows services during gaming"
    },
    {
      title: "Memory Compression",
      description: "Optimize RAM usage with compression",
      icon: HardDrive,
      tooltip: "Enables Windows memory compression for better RAM efficiency"
    },
    {
      title: "Fast Startup Disable",
      description: "Disable hybrid boot for true shutdowns",
      icon: Zap,
      tooltip: "May increase boot time but improves system stability"
    },
    {
      title: "Windows Search Indexing",
      description: "Disable search indexing on gaming drives",
      icon: HardDrive,
      tooltip: "Reduces disk usage during gaming sessions"
    }
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 mb-6">
        <Settings className="w-6 h-6 text-primary" />
        <h2 className="text-2xl font-bold">System Tweaks</h2>
      </div>
      <div className="grid gap-4">
        {systemOptimizations.map((opt, index) => (
          <ToggleCard
            key={index}
            title={opt.title}
            description={opt.description}
            icon={opt.icon}
            tooltip={opt.tooltip}
          />
        ))}
      </div>
    </div>
  );
}