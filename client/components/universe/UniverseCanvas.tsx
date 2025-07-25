import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface UniverseCanvasProps {
  className?: string;
  universeState?: any;
}

export const UniverseCanvas = forwardRef<
  HTMLCanvasElement,
  UniverseCanvasProps
>(({ className, universeState }, ref) => {
  return (
    <div className={cn("relative w-full h-full overflow-hidden", className)}>
      <canvas
        ref={ref}
        className="absolute inset-0 w-full h-full cursor-crosshair"
        style={{
          background: "linear-gradient(135deg, #0a0a15 0%, #1a1a2e 100%)",
        }}
      />

      {/* Click hint overlay */}
      <div className="absolute top-4 left-4 pointer-events-none">
        <div className="bg-space-deep/80 backdrop-blur-sm border border-cosmic-purple/30 rounded-lg p-3">
          <p className="text-cosmic-purple text-sm font-space">
            ✨ Click to create plasma explosions
          </p>
          <p className="text-cosmic-blue text-xs mt-1">
            Watch the cosmic dance unfold...
          </p>
        </div>
      </div>

      {/* Particle count display */}
      {universeState && (
        <div className="absolute top-4 right-4 pointer-events-none">
          <div className="bg-space-deep/80 backdrop-blur-sm border border-cosmic-teal/30 rounded-lg p-3">
            <div className="text-cosmic-teal text-sm font-space">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-cosmic-teal rounded-full animate-pulse" />
                <span>{universeState.particleCount || 0} particles</span>
              </div>
              <div className="text-cosmic-gold text-xs mt-1">
                {universeState.attractors || 0} attractors
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Status indicator */}
      {universeState && (
        <div className="absolute bottom-4 left-4 pointer-events-none">
          <div className="bg-space-deep/80 backdrop-blur-sm border border-cosmic-green/30 rounded-lg p-2">
            <div className="flex items-center gap-2 text-cosmic-green text-sm font-space">
              <div
                className={cn(
                  "w-2 h-2 rounded-full",
                  universeState.isPlaying
                    ? "bg-cosmic-green animate-pulse"
                    : "bg-cosmic-orange",
                )}
              />
              <span>{universeState.isPlaying ? "ACTIVE" : "PAUSED"}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

UniverseCanvas.displayName = "UniverseCanvas";
