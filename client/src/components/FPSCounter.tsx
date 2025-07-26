import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Monitor, Activity } from 'lucide-react';

export default function FPSCounter() {
  const [fps, setFps] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    let animationId: number;

    const updateFPS = (currentTime: number) => {
      frameCount++;
      
      if (currentTime >= lastTime + 1000) {
        setFps(Math.round((frameCount * 1000) / (currentTime - lastTime)));
        frameCount = 0;
        lastTime = currentTime;
      }
      
      animationId = requestAnimationFrame(updateFPS);
    };

    animationId = requestAnimationFrame(updateFPS);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  const getFPSColor = (fps: number) => {
    if (fps >= 60) return 'text-gaming-green';
    if (fps >= 30) return 'text-gaming-yellow';
    return 'text-gaming-red';
  };

  if (!isVisible) return null;

  return (
    <div className="fixed top-4 right-4 z-50">
      <Card className="bg-background/80 backdrop-blur-sm border-primary/20">
        <CardContent className="p-3">
          <div className="flex items-center space-x-2">
            <Activity className="w-4 h-4 text-gaming-blue" />
            <span className="text-sm font-mono">
              <span className={getFPSColor(fps)}>{fps}</span>
              <span className="text-muted-foreground ml-1">FPS</span>
            </span>
            <button
              onClick={() => setIsVisible(false)}
              className="ml-2 text-muted-foreground hover:text-foreground text-xs"
            >
              ×
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}