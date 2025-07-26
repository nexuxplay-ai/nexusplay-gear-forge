import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Info, LucideIcon } from "lucide-react";

interface ToggleCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  disabled?: boolean;
  tier?: string;
  tooltip?: string;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
}

export default function ToggleCard({ 
  title, 
  description, 
  icon: Icon, 
  disabled = false, 
  tier, 
  tooltip,
  defaultChecked = false,
  onChange 
}: ToggleCardProps) {
  const [checked, setChecked] = useState(defaultChecked);

  const handleChange = (newChecked: boolean) => {
    setChecked(newChecked);
    onChange?.(newChecked);
  };

  return (
    <Card className={`transition-all duration-200 ${disabled ? "opacity-50" : "hover:shadow-gaming"}`}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 flex-1">
            <div className={`p-2 rounded-lg transition-colors ${
              disabled ? "bg-muted" : checked ? "bg-gradient-primary" : "bg-muted"
            }`}>
              <Icon className={`w-4 h-4 ${
                disabled ? "text-muted-foreground" : checked ? "text-primary-foreground" : "text-muted-foreground"
              }`} />
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <span className="font-medium">{title}</span>
                {tier && (
                  <Badge variant="secondary" className="text-xs">
                    {tier}
                  </Badge>
                )}
                {tooltip && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="w-4 h-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">{tooltip}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </div>
              <p className="text-sm text-muted-foreground">{description}</p>
            </div>
          </div>
          <Switch
            checked={checked}
            onCheckedChange={handleChange}
            disabled={disabled}
          />
        </div>
      </CardContent>
    </Card>
  );
}