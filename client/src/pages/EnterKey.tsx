import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Key, Lock, Unlock, CheckCircle, XCircle, Crown, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function EnterKey() {
  const [proKey, setProKey] = useState("");
  const [isValidating, setIsValidating] = useState(false);
  const [keyStatus, setKeyStatus] = useState<"idle" | "valid" | "invalid">("idle");
  const [keyDetails, setKeyDetails] = useState<any>(null);
  const { toast } = useToast();

  // Mock key validation - in real app, this would call an API
  const validateKey = async () => {
    setIsValidating(true);
    setKeyStatus("idle");

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Mock validation logic
    const validKeys: Record<string, {
      tier: string;
      status: string;
      expires: string;
      features: string[];
    }> = {
      "NEXUS-PRO-DEMO": {
        tier: "Tier 1",
        status: "Active",
        expires: "2024-12-31",
        features: ["CPU Optimization", "RAM Management", "Network Tweaks"]
      },
      "NEXUS-PRO-T2-DEMO": {
        tier: "Tier 2",
        status: "Active", 
        expires: "2024-12-31",
        features: ["All Tier 1 Features", "Advanced Tweaks", "Registry Edits", "Security Bypass"]
      }
    };

    if (validKeys[proKey]) {
      setKeyStatus("valid");
      setKeyDetails(validKeys[proKey]);
      
      // Save to localStorage (in real app, this would be more secure)
      localStorage.setItem("nexusProKey", proKey);
      localStorage.setItem("nexusProDetails", JSON.stringify(validKeys[proKey]));
      
      toast({
        title: "Pro Key Activated!",
        description: `Welcome to NexusPlay Pro ${validKeys[proKey].tier}! Your optimizer has been unlocked.`,
      });
    } else {
      setKeyStatus("invalid");
      toast({
        title: "Invalid Pro Key",
        description: "Please check your key and try again, or contact support if you need help.",
        variant: "destructive",
      });
    }

    setIsValidating(false);
  };

  const clearKey = () => {
    setProKey("");
    setKeyStatus("idle");
    setKeyDetails(null);
    localStorage.removeItem("nexusProKey");
    localStorage.removeItem("nexusProDetails");
    
    toast({
      title: "Pro Key Cleared",
      description: "Your Pro features have been deactivated.",
    });
  };

  // Check for existing key on component mount
  useState(() => {
    const savedKey = localStorage.getItem("nexusProKey");
    const savedDetails = localStorage.getItem("nexusProDetails");
    
    if (savedKey && savedDetails) {
      setProKey(savedKey);
      setKeyDetails(JSON.parse(savedDetails));
      setKeyStatus("valid");
    }
  });

  return (
    <div className="min-h-screen bg-gradient-hero p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">
            Enter Pro <span className="bg-gradient-primary bg-clip-text text-transparent [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] text-primary">Key</span>
          </h1>
          <p className="text-muted-foreground">
            Activate your NexusPlay Pro license to unlock advanced optimizations.
          </p>
        </div>

        {/* Main Card */}
        <Card className="bg-gradient-card border-primary/20 shadow-gaming">
          <CardHeader className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-primary rounded-full flex items-center justify-center">
              <Key className="w-8 h-8 text-primary-foreground" />
            </div>
            <CardTitle className="text-2xl">Pro License Activation</CardTitle>
            <CardDescription>
              Enter your Pro key to unlock premium features and optimizations
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Key Input */}
            <div className="space-y-2">
              <Label htmlFor="proKey" className="text-sm font-medium">
                Pro License Key
              </Label>
              <div className="relative">
                <Input
                  id="proKey"
                  placeholder="NEXUS-PRO-XXXX-XXXX"
                  value={proKey}
                  onChange={(e) => setProKey(e.target.value.toUpperCase())}
                  className="pl-10 text-center font-mono tracking-wider"
                  disabled={isValidating || keyStatus === "valid"}
                />
                <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                {keyStatus === "valid" && (
                  <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gaming-green" />
                )}
                {keyStatus === "invalid" && (
                  <XCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-destructive" />
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              {keyStatus !== "valid" ? (
                <Button
                  onClick={validateKey}
                  disabled={!proKey || isValidating}
                  className="w-full bg-gradient-primary shadow-gaming"
                  size="lg"
                >
                  {isValidating ? (
                    <>
                      <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2" />
                      Validating...
                    </>
                  ) : (
                    <>
                      <Unlock className="w-4 h-4 mr-2" />
                      Activate Pro Key
                    </>
                  )}
                </Button>
              ) : (
                <Button
                  onClick={clearKey}
                  variant="outline"
                  className="w-full"
                  size="lg"
                >
                  <Lock className="w-4 h-4 mr-2" />
                  Deactivate Key
                </Button>
              )}
            </div>

            {/* Key Status Display */}
            {keyStatus === "valid" && keyDetails && (
              <Card className="bg-gaming-green/10 border-gaming-green/20">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2 mb-3">
                    <CheckCircle className="w-5 h-5 text-gaming-green" />
                    <span className="font-semibold text-gaming-green">Pro Key Active</span>
                    <Badge className="bg-gaming-green text-primary-foreground">
                      {keyDetails.tier}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Status:</span>
                      <span className="font-medium">{keyDetails.status}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Expires:</span>
                      <span className="font-medium">{keyDetails.expires}</span>
                    </div>
                  </div>

                  <div className="mt-4">
                    <h4 className="font-medium text-sm mb-2">Unlocked Features:</h4>
                    <div className="space-y-1">
                      {keyDetails.features.map((feature: string, index: number) => (
                        <div key={index} className="flex items-center space-x-2 text-sm">
                          <Zap className="w-3 h-3 text-gaming-green" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {keyStatus === "invalid" && (
              <Card className="bg-destructive/10 border-destructive/20">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2 text-destructive">
                    <XCircle className="w-5 h-5" />
                    <span className="font-semibold">Invalid Pro Key</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    The key you entered is not valid. Please check for typos or contact support.
                  </p>
                </CardContent>
              </Card>
            )}
          </CardContent>
        </Card>

        {/* Help Section */}
        <div className="mt-8 space-y-4">
          <Card className="bg-gradient-card">
            <CardHeader>
              <CardTitle className="text-lg flex items-center space-x-2">
                <Crown className="w-5 h-5" />
                <span>Don't have a Pro key?</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Purchase a NexusPlay Pro subscription to get your license key and unlock advanced features.
              </p>
              <Button variant="outline" className="w-full">
                <Crown className="w-4 h-4 mr-2" />
                Get Pro Key
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card">
            <CardHeader>
              <CardTitle className="text-lg">Demo Keys</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4 text-sm">
                Try these demo keys to test the Pro features:
              </p>
              <div className="space-y-2 text-sm font-mono">
                <div className="flex justify-between items-center p-2 bg-muted rounded">
                  <span>NEXUS-PRO-DEMO</span>
                  <Badge variant="secondary">Tier 1</Badge>
                </div>
                <div className="flex justify-between items-center p-2 bg-muted rounded">
                  <span>NEXUS-PRO-T2-DEMO</span>
                  <Badge variant="secondary">Tier 2</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}