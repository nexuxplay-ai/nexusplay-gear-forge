import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Settings, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import OptimizerPanel from "@/components/OptimizerPanel";
import ProKeyPanel from "@/components/ProKeyPanel";
import FPSOverlay from "@/components/FPSOverlay";

export default function Optimizer() {
  const [isPro, setIsPro] = useState(false);
  const [proTier, setProTier] = useState(0);
  const [showProKeyPanel, setShowProKeyPanel] = useState(false);
  const [showFPSOverlay, setShowFPSOverlay] = useState(false);

  // Check for existing Pro license on component mount
  useEffect(() => {
    const storedKey = localStorage.getItem("nexus_pro_key");
    const storedTier = localStorage.getItem("nexus_pro_tier");
    
    if (storedKey && storedTier) {
      setIsPro(true);
      setProTier(parseInt(storedTier));
    }
  }, []);

  const handleProUnlock = (isUnlocked: boolean, tier?: number) => {
    setIsPro(isUnlocked);
    if (tier) setProTier(tier);
  };

  const handleUpgrade = () => {
    setShowProKeyPanel(true);
  };

  return (
    <div className="min-h-screen bg-black text-white relative">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.1)_0%,transparent_70%)]" />
      
      {/* Header */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative z-10 border-b border-gray-800/50 backdrop-blur-lg bg-black/20"
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Settings className="w-6 h-6 text-purple-400" />
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Gaming Optimizer
                </h1>
              </div>
              
              <div className="flex items-center gap-2">
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                  System Online
                </Badge>
                
                {isPro ? (
                  <Badge className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-400 border-amber-500/30">
                    <Crown className="w-3 h-3 mr-1" />
                    Pro Tier {proTier}
                  </Badge>
                ) : (
                  <Badge 
                    className="bg-gray-500/20 text-gray-400 border-gray-500/30 cursor-pointer hover:bg-amber-500/20 hover:text-amber-400 hover:border-amber-500/30 transition-all"
                    onClick={handleUpgrade}
                  >
                    Free Tier
                  </Badge>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* FPS Overlay Toggle */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFPSOverlay(!showFPSOverlay)}
                className="border-gray-600 hover:border-purple-500"
              >
                {showFPSOverlay ? 'Hide' : 'Show'} FPS Overlay
              </Button>

              {/* Upgrade Button for Free Users */}
              {!isPro && (
                <Button
                  onClick={handleUpgrade}
                  className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white"
                >
                  <Crown className="w-4 h-4 mr-2" />
                  Upgrade to Pro
                </Button>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Optimizer Panel */}
      <div className="relative z-10">
        <OptimizerPanel />
      </div>

      {/* Pro Key Unlock Modal */}
      <ProKeyPanel
        isOpen={showProKeyPanel}
        onClose={() => setShowProKeyPanel(false)}
        onUnlock={handleProUnlock}
      />

      {/* FPS Overlay */}
      {showFPSOverlay && (
        <FPSOverlay
          isVisible={showFPSOverlay}
          onToggle={() => setShowFPSOverlay(false)}
        />
      )}
    </div>
  );
}