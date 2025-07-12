import { useState, useCallback } from "react";
import { UniverseCanvas } from "./UniverseCanvas";
import { ControlPanel } from "./ControlPanel";
import { cn } from "@/lib/utils";
import { ParticleType, PhysicsConfig } from "@/lib/particle-physics";
import { useParticleUniverse } from "@/hooks/use-particle-universe";
import { useRef } from "react";

interface ParticleUniverseProps {
  className?: string;
}

export function ParticleUniverse({ className }: ParticleUniverseProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [showControls, setShowControls] = useState(true);
  const [universeState, setUniverseState] = useState<any>(null);

  const {
    universeState: hookState,
    createExplosion,
    createGalaxy,
    addAttractor,
    clearUniverse,
    togglePlay,
    updateConfig,
    createStarField,
    createNebulaCloud,
  } = useParticleUniverse(canvasRef);

  const handleStateChange = useCallback((state: any) => {
    setUniverseState(state);
  }, []);

  return (
    <div className={cn("relative w-full h-screen overflow-hidden", className)}>
      {/* Main Canvas */}
      <div className="absolute inset-0">
        <UniverseCanvas
          ref={canvasRef}
          onStateChange={handleStateChange}
          className="w-full h-full"
        />
      </div>

      {/* Header */}
      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-10">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-space text-cosmic-purple mb-2">
            <span className="bg-gradient-to-r from-cosmic-purple via-cosmic-pink to-cosmic-blue bg-clip-text text-transparent">
              PARTICLE
            </span>
          </h1>
          <h2 className="text-2xl md:text-3xl font-space text-cosmic-blue">
            <span className="bg-gradient-to-r from-cosmic-blue via-cosmic-teal to-cosmic-green bg-clip-text text-transparent">
              UNIVERSE
            </span>
          </h2>
          <div className="h-1 bg-gradient-to-r from-transparent via-cosmic-purple to-transparent mt-4 opacity-60" />
        </div>
      </div>

      {/* Control Panel Toggle */}
      <button
        onClick={() => setShowControls(!showControls)}
        className={cn(
          "absolute bottom-6 right-6 z-20",
          "bg-space-deep/90 backdrop-blur-md border border-cosmic-purple/50",
          "rounded-full p-3 text-cosmic-purple hover:text-cosmic-pink",
          "transition-all duration-300 hover:scale-110",
          "shadow-lg shadow-cosmic-purple/20",
        )}
      >
        <div className="w-6 h-6 flex flex-col justify-center space-y-1">
          <div className="w-full h-0.5 bg-current transition-all duration-300" />
          <div
            className={cn(
              "w-full h-0.5 bg-current transition-all duration-300",
              showControls && "opacity-0",
            )}
          />
          <div className="w-full h-0.5 bg-current transition-all duration-300" />
        </div>
      </button>

      {/* Control Panel */}
      <div
        className={cn(
          "absolute bottom-6 left-6 z-10 transition-all duration-500",
          showControls
            ? "transform translate-y-0 opacity-100"
            : "transform translate-y-full opacity-0 pointer-events-none",
        )}
      >
        <ControlPanel
          isPlaying={hookState.isPlaying}
          config={hookState.config}
          onTogglePlay={togglePlay}
          onCreateExplosion={createExplosion}
          onCreateGalaxy={createGalaxy}
          onAddAttractor={addAttractor}
          onClear={clearUniverse}
          onUpdateConfig={updateConfig}
          onCreateStarField={createStarField}
          onCreateNebulaCloud={createNebulaCloud}
          className="w-80"
        />
      </div>

      {/* Cosmic Background Effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Animated stars */}
        <div className="absolute inset-0">
          {Array.from({ length: 50 }, (_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-cosmic-gold rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>

        {/* Gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cosmic-purple/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cosmic-blue/5 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-cosmic-pink/5 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      {/* Instructions */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10">
        <div className="bg-space-deep/80 backdrop-blur-sm border border-cosmic-teal/30 rounded-lg px-4 py-2">
          <p className="text-cosmic-teal text-sm font-cosmic text-center">
            Click anywhere to create explosions • Use controls to shape the
            universe
          </p>
        </div>
      </div>
    </div>
  );
}
