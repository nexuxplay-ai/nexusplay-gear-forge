import ToggleCard from "../ToggleCard";
import { Zap, Battery, Cpu, Monitor, Shield } from "lucide-react";

export default function PowerTweaks() {
  const powerOptimizations = [
    {
      title: "Ultimate Performance Plan",
      description: "Uncaps CPU power for smoother multitasking and gaming",
      icon: Zap,
      tooltip: "Enables Windows Ultimate Performance power plan for maximum CPU performance"
    },
    {
      title: "Prevent Sleep During Gameplay",
      description: "Keeps system active while running games or benchmarks",
      icon: Monitor,
      tooltip: "Automatically prevents system sleep when games are detected"
    },
    {
      title: "CPU Core Parking Disable",
      description: "Keep all CPU cores active",
      icon: Cpu,
      tooltip: "Prevents Windows from parking CPU cores, ensuring consistent performance"
    },
    {
      title: "USB Selective Suspend",
      description: "Disable USB power saving",
      icon: Shield,
      tooltip: "Prevents USB devices from entering power saving mode during games"
    },
    {
      title: "PCI Express Link State",
      description: "Disable PCIe power management",
      icon: Zap,
      tooltip: "Keeps PCIe devices at full power for consistent performance"
    },
    {
      title: "Processor Power State",
      description: "Optimize CPU power states",
      icon: Cpu,
      tooltip: "Configures CPU to maintain higher performance states"
    },
    {
      title: "Display Timeout Override",
      description: "Extend display timeout during gaming",
      icon: Monitor,
      tooltip: "Prevents display from turning off during long gaming sessions"
    },
    {
      title: "Battery Saver Disable",
      description: "Disable battery optimizations when plugged in",
      icon: Battery,
      tooltip: "Ensures maximum performance when on AC power"
    }
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 mb-6">
        <Zap className="w-6 h-6 text-primary" />
        <h2 className="text-2xl font-bold">Power Tweaks</h2>
      </div>
      <div className="grid gap-4">
        {powerOptimizations.map((opt, index) => (
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