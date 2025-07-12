import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  RotateCw,
  ArrowLeft,
  ArrowRight,
  ArrowDown,
  Play,
  Pause,
  Square,
} from "lucide-react";

interface GameControlsProps {
  onMoveLeft: () => void;
  onMoveRight: () => void;
  onMoveDown: () => void;
  onRotate: () => void;
  onHardDrop: () => void;
  onTogglePause: () => void;
  onStartGame: () => void;
  isPlaying: boolean;
  isPaused: boolean;
  gameOver: boolean;
  className?: string;
}

export function GameControls({
  onMoveLeft,
  onMoveRight,
  onMoveDown,
  onRotate,
  onHardDrop,
  onTogglePause,
  onStartGame,
  isPlaying,
  isPaused,
  gameOver,
  className,
}: GameControlsProps) {
  const handleTouchStart = (callback: () => void) => {
    return (e: React.TouchEvent) => {
      e.preventDefault();
      callback();
    };
  };

  return (
    <div className={cn("space-y-4", className)}>
      {/* Game state controls */}
      <div className="flex gap-2 justify-center">
        {!isPlaying || gameOver ? (
          <Button
            onClick={onStartGame}
            className={cn(
              "retro-text text-xs bg-neon-green text-retro-dark border-2 border-neon-green",
              "hover:bg-neon-green/90 hover:shadow-lg hover:shadow-neon-green/50",
              "active:scale-95 transition-all duration-150",
              "px-6 py-3 min-w-[100px]",
            )}
          >
            <Play className="w-4 h-4 mr-2" />
            {gameOver ? "RESTART" : "START"}
          </Button>
        ) : (
          <Button
            onClick={onTogglePause}
            className={cn(
              "retro-text text-xs bg-neon-yellow text-retro-dark border-2 border-neon-yellow",
              "hover:bg-neon-yellow/90 hover:shadow-lg hover:shadow-neon-yellow/50",
              "active:scale-95 transition-all duration-150",
              "px-6 py-3 min-w-[100px]",
            )}
          >
            {isPaused ? (
              <>
                <Play className="w-4 h-4 mr-2" />
                RESUME
              </>
            ) : (
              <>
                <Pause className="w-4 h-4 mr-2" />
                PAUSE
              </>
            )}
          </Button>
        )}
      </div>

      {/* Movement controls */}
      {isPlaying && !gameOver && (
        <>
          <div className="grid grid-cols-3 gap-2 max-w-[200px] mx-auto">
            {/* Top row - Rotate */}
            <div />
            <Button
              onTouchStart={handleTouchStart(onRotate)}
              onClick={onRotate}
              className={cn(
                "bg-neon-purple/20 border-2 border-neon-purple text-neon-purple",
                "hover:bg-neon-purple/30 hover:shadow-lg hover:shadow-neon-purple/50",
                "active:scale-95 transition-all duration-150",
                "aspect-square p-0 h-12 w-12",
              )}
              disabled={isPaused}
            >
              <RotateCw className="w-5 h-5" />
            </Button>
            <div />

            {/* Middle row - Left, Down, Right */}
            <Button
              onTouchStart={handleTouchStart(onMoveLeft)}
              onClick={onMoveLeft}
              className={cn(
                "bg-neon-cyan/20 border-2 border-neon-cyan text-neon-cyan",
                "hover:bg-neon-cyan/30 hover:shadow-lg hover:shadow-neon-cyan/50",
                "active:scale-95 transition-all duration-150",
                "aspect-square p-0 h-12 w-12",
              )}
              disabled={isPaused}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>

            <Button
              onTouchStart={handleTouchStart(onMoveDown)}
              onClick={onMoveDown}
              className={cn(
                "bg-neon-green/20 border-2 border-neon-green text-neon-green",
                "hover:bg-neon-green/30 hover:shadow-lg hover:shadow-neon-green/50",
                "active:scale-95 transition-all duration-150",
                "aspect-square p-0 h-12 w-12",
              )}
              disabled={isPaused}
            >
              <ArrowDown className="w-5 h-5" />
            </Button>

            <Button
              onTouchStart={handleTouchStart(onMoveRight)}
              onClick={onMoveRight}
              className={cn(
                "bg-neon-cyan/20 border-2 border-neon-cyan text-neon-cyan",
                "hover:bg-neon-cyan/30 hover:shadow-lg hover:shadow-neon-cyan/50",
                "active:scale-95 transition-all duration-150",
                "aspect-square p-0 h-12 w-12",
              )}
              disabled={isPaused}
            >
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>

          {/* Hard drop button */}
          <div className="flex justify-center">
            <Button
              onTouchStart={handleTouchStart(onHardDrop)}
              onClick={onHardDrop}
              className={cn(
                "retro-text text-xs bg-neon-orange/20 border-2 border-neon-orange text-neon-orange",
                "hover:bg-neon-orange/30 hover:shadow-lg hover:shadow-neon-orange/50",
                "active:scale-95 transition-all duration-150",
                "px-4 py-2",
              )}
              disabled={isPaused}
            >
              <Square className="w-4 h-4 mr-2" />
              DROP
            </Button>
          </div>
        </>
      )}

      {/* Instructions */}
      <div className="text-center text-xs text-muted-foreground space-y-1 max-w-[280px] mx-auto">
        {!isPlaying || gameOver ? (
          <p>Tap START to begin playing Tetris!</p>
        ) : (
          <>
            <p>Touch controls: Move pieces and rotate</p>
            <p className="hidden sm:block">
              Keyboard: Arrow keys, Space (rotate), Enter (drop), P (pause)
            </p>
          </>
        )}
      </div>
    </div>
  );
}
