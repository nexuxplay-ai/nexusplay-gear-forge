import ToggleCard from "../ToggleCard";
import { Monitor, Zap, Cpu, Shield } from "lucide-react";

export default function GPUTweaks() {
  const gpuOptimizations = [
    {
      title: "Hardware GPU Scheduling",
      description: "Improve frame pacing and reduce latency on modern GPUs",
      icon: Cpu,
      tooltip: "Requires Windows 10 version 2004 or later and a compatible GPU"
    },
    {
      title: "NVIDIA Low Latency Mode",
      description: "Enable ultra-low latency for NVIDIA GPUs",
      icon: Zap,
      tooltip: "Only affects NVIDIA graphics cards with driver 436.02 or newer"
    },
    {
      title: "AMD Anti-Lag",
      description: "Reduces input lag in GPU-heavy games",
      icon: Shield,
      tooltip: "Available on AMD Radeon RX 5000 series and newer"
    },
    {
      title: "Disable V-Sync in Registry",
      description: "Prevent input delay and unlock FPS",
      icon: Monitor,
      tooltip: "May cause screen tearing but reduces input lag"
    },
    {
      title: "GPU Memory Clock Boost",
      description: "Optimize GPU memory performance",
      icon: Cpu,
      tooltip: "Automatically applies safe memory optimizations"
    },
    {
      title: "DirectX 12 Optimizations",
      description: "Enable advanced DirectX 12 features",
      icon: Zap,
      tooltip: "Improves performance in DX12 compatible games"
    }
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 mb-6">
        <Monitor className="w-6 h-6 text-primary" />
        <h2 className="text-2xl font-bold">GPU Tweaks</h2>
      </div>
      <div className="grid gap-4">
        {gpuOptimizations.map((opt, index) => (
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