import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Alert, AlertDescription } from "./ui/alert";
import { 
  Crown, 
  Lock, 
  Unlock, 
  Sparkles, 
  CheckCircle, 
  XCircle,
  Key,
  Star,
  Zap
} from "lucide-react";

interface ProKeyPanelProps {
  onUnlock: (isPro: boolean, tier?: number) => void;
  isOpen: boolean;
  onClose: () => void;
}

interface ProFeature {
  name: string;
  description: string;
  tier: number;
}

export default function ProKeyPanel({ onUnlock, isOpen, onClose }: ProKeyPanelProps) {
  const [key, setKey] = useState("");
  const [status, setStatus] = useState<'idle' | 'validating' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState("");
  const [unlockedTier, setUnlockedTier] = useState(0);

  const proFeatures: ProFeature[] = [
    {
      name: "GPU Overclocking",
      description: "Safe automated GPU overclocking with temperature monitoring",
      tier: 1
    },
    {
      name: "Advanced Network Optimization",
      description: "Deep packet inspection and buffer optimization",
      tier: 1
    },
    {
      name: "CPU Core Management",
      description: "Disable core parking and optimize thread scheduling",
      tier: 2
    },
    {
      name: "Registry Tweaking",
      description: "Advanced Windows registry optimizations",
      tier: 2
    },
    {
      name: "Background Services",
      description: "Automatic optimization while gaming",
      tier: 2
    },
    {
      name: "Custom Profiles",
      description: "Create and share optimization profiles",
      tier: 2
    }
  ];

  const handleUnlock = async () => {
    if (!key.trim()) return;
    
    setStatus('validating');
    setMessage("");

    // Simulate API validation delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Mock validation logic (replace with real API)
    const demoKeys: Record<string, { tier: number; name: string }> = {
      "NEXUS-PRO-DEMO": { tier: 1, name: "Pro Tier 1" },
      "NEXUS-PRO-T2-DEMO": { tier: 2, name: "Pro Tier 2" },
      "NEXUS-PRO-FREE": { tier: 1, name: "Pro Tier 1" },
      "NEXUS-PRO-MAX": { tier: 2, name: "Pro Tier 2" }
    };

    const keyData = demoKeys[key.toUpperCase()];
    
    if (keyData) {
      setStatus('success');
      setMessage(`✅ ${keyData.name} features unlocked!`);
      setUnlockedTier(keyData.tier);
      
      // Store in localStorage
      localStorage.setItem("nexus_pro_key", key);
      localStorage.setItem("nexus_pro_tier", keyData.tier.toString());
      
      // Notify parent component
      setTimeout(() => {
        onUnlock(true, keyData.tier);
        onClose();
      }, 2000);
      
    } else {
      setStatus('error');
      setMessage("❌ Invalid license key. Please check and try again.");
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  const handleKeyChange = (value: string) => {
    setKey(value);
    if (status === 'error') setStatus('idle');
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="w-full max-w-2xl"
        >
          <Card className="bg-gray-900/95 backdrop-blur-lg border-gray-700 shadow-2xl">
            <CardHeader className="text-center pb-2">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="mx-auto mb-4"
              >
                <div className="relative">
                  <Crown className="w-16 h-16 text-amber-500 mx-auto" />
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-2 -right-2"
                  >
                    <Sparkles className="w-6 h-6 text-yellow-400" />
                  </motion.div>
                </div>
              </motion.div>
              
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                Unlock Pro Features
              </CardTitle>
              <p className="text-gray-400 mt-2">
                Enter your license key to access advanced gaming optimizations
              </p>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Key Input Section */}
              <div className="space-y-4">
                <div className="relative">
                  <Input
                    placeholder="Enter your Pro license key (e.g., NEXUS-PRO-DEMO)"
                    value={key}
                    onChange={(e) => handleKeyChange(e.target.value)}
                    disabled={status === 'validating'}
                    className={`pl-12 h-12 text-center text-lg font-mono ${
                      status === 'error' ? 'border-red-500' : 
                      status === 'success' ? 'border-green-500' : 
                      'border-gray-600'
                    }`}
                  />
                  <Key className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>

                <Button
                  onClick={handleUnlock}
                  disabled={!key.trim() || status === 'validating'}
                  className="w-full h-12 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-semibold"
                >
                  {status === 'validating' ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="mr-2"
                    >
                      <Zap className="w-5 h-5" />
                    </motion.div>
                  ) : (
                    <Unlock className="w-5 h-5 mr-2" />
                  )}
                  {status === 'validating' ? 'Validating...' : 'Activate Pro License'}
                </Button>

                {/* Status Message */}
                <AnimatePresence>
                  {message && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      <Alert className={`${
                        status === 'success' ? 'border-green-500 bg-green-500/10' :
                        status === 'error' ? 'border-red-500 bg-red-500/10' :
                        'border-gray-600'
                      }`}>
                        <AlertDescription className="flex items-center gap-2">
                          {status === 'success' ? 
                            <CheckCircle className="w-4 h-4 text-green-500" /> :
                            <XCircle className="w-4 h-4 text-red-500" />
                          }
                          {message}
                        </AlertDescription>
                      </Alert>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Demo Keys */}
              <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                <h4 className="font-semibold mb-3 text-center">Try Demo Keys:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setKey("NEXUS-PRO-DEMO")}
                    className="font-mono text-xs"
                  >
                    NEXUS-PRO-DEMO
                    <Badge variant="secondary" className="ml-2">Tier 1</Badge>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setKey("NEXUS-PRO-T2-DEMO")}
                    className="font-mono text-xs"
                  >
                    NEXUS-PRO-T2-DEMO
                    <Badge variant="secondary" className="ml-2">Tier 2</Badge>
                  </Button>
                </div>
              </div>

              {/* Pro Features List */}
              <div className="space-y-4">
                <h4 className="font-semibold text-center">Pro Features:</h4>
                <div className="grid gap-3">
                  {proFeatures.map((feature, index) => (
                    <motion.div
                      key={feature.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index }}
                      className={`flex items-center gap-3 p-3 rounded-lg border ${
                        feature.tier === 1 ? 'border-blue-500/30 bg-blue-500/5' : 'border-purple-500/30 bg-purple-500/5'
                      }`}
                    >
                      <div className={`p-2 rounded-lg ${
                        feature.tier === 1 ? 'bg-blue-500/20' : 'bg-purple-500/20'
                      }`}>
                        <Star className={`w-4 h-4 ${
                          feature.tier === 1 ? 'text-blue-400' : 'text-purple-400'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h5 className="font-medium">{feature.name}</h5>
                          <Badge 
                            variant="outline" 
                            className={`text-xs ${
                              feature.tier === 1 ? 'border-blue-500 text-blue-400' : 'border-purple-500 text-purple-400'
                            }`}
                          >
                            Tier {feature.tier}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-400">{feature.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Close Button */}
              <div className="text-center pt-4">
                <Button
                  variant="ghost"
                  onClick={onClose}
                  className="text-gray-400 hover:text-white"
                >
                  Continue with Free Version
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}