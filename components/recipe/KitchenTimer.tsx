'use client';

import { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { formatTime, cn } from '@/lib/utils';

interface KitchenTimerProps {
  initialSeconds: number;
  onComplete?: () => void;
  autoStart?: boolean;
}

export function KitchenTimer({ initialSeconds, onComplete, autoStart = false }: KitchenTimerProps) {
  const [timeLeft, setTimeLeft] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(autoStart);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    if (!isRunning || timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsRunning(false);
          setIsCompleted(true);
          onComplete?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, timeLeft, onComplete]);

  const handleToggle = () => {
    setIsRunning(!isRunning);
    setIsCompleted(false);
  };

  const handleReset = () => {
    setTimeLeft(initialSeconds);
    setIsRunning(false);
    setIsCompleted(false);
  };

  if (initialSeconds === 0) return null;

  return (
    <Card className={cn(
      "border-2 transition-colors",
      isCompleted ? "border-green-500 bg-green-50" : "border-border"
    )}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <div className={cn(
              "text-3xl font-bold tabular-nums",
              isCompleted ? "text-green-600" : timeLeft <= 30 ? "text-red-600" : "text-foreground"
            )}>
              {formatTime(timeLeft)}
            </div>
            <div className="text-sm text-muted-foreground">
              {isCompleted ? 'Concluído!' : isRunning ? 'Em andamento' : 'Timer pausado'}
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button
              variant={isRunning ? "secondary" : "default"}
              size="lg"
              onClick={handleToggle}
              disabled={timeLeft <= 0 && !isCompleted}
            >
              {isRunning ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
            </Button>
            
            <Button variant="outline" size="lg" onClick={handleReset}>
              <RotateCcw className="h-5 w-5" />
            </Button>
            
            {isCompleted && (
              <Button variant="outline" size="lg">
                <Volume2 className="h-5 w-5" />
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}