import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import {
  Sparkles,
  Zap,
  Galaxy,
  Target,
  Trash2,
  Play,
  Pause,
  RotateCcw,
  Settings,
} from "lucide-react";
import { ParticleType, PhysicsConfig } from "@/lib/particle-physics";

interface ControlPanelProps {
  isPlaying: boolean;
  config: PhysicsConfig;
  onTogglePlay: () => void;
  onCreateExplosion: (type: ParticleType, count?: number) => void;
  onCreateGalaxy: () => void;
  onAddAttractor: () => void;
  onClear: () => void;
  onUpdateConfig: (config: Partial<PhysicsConfig>) => void;
  onCreateStarField: () => void;
  onCreateNebulaCloud: () => void;
  className?: string;
}

export function ControlPanel({
  isPlaying,
  config,
  onTogglePlay,
  onCreateExplosion,
  onCreateGalaxy,
  onAddAttractor,
  onClear,
  onUpdateConfig,
  onCreateStarField,
  onCreateNebulaCloud,
  className,
}: ControlPanelProps) {
  return (
    <div
      className={cn(
        "bg-space-deep/90 backdrop-blur-md border border-cosmic-purple/30 rounded-xl p-6",
        "shadow-2xl shadow-cosmic-purple/20",
        className,
      )}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Settings className="w-5 h-5 text-cosmic-purple" />
        <h2 className="text-lg font-space text-cosmic-purple">
          Universe Controls
        </h2>
      </div>

      {/* Play Controls */}
      <div className="space-y-4 mb-6">
        <div className="flex gap-2">
          <Button
            onClick={onTogglePlay}
            className={cn(
              "flex-1 font-space text-sm",
              isPlaying
                ? "bg-cosmic-orange hover:bg-cosmic-orange/80 text-space-deep"
                : "bg-cosmic-green hover:bg-cosmic-green/80 text-space-deep",
            )}
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4 mr-2" />
                PAUSE
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2" />
                PLAY
              </>
            )}
          </Button>

          <Button
            onClick={onClear}
            variant="outline"
            className="border-cosmic-pink/50 text-cosmic-pink hover:bg-cosmic-pink/10"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Creation Tools */}
      <div className="space-y-4 mb-6">
        <h3 className="text-sm font-space text-cosmic-blue">Create</h3>
        <div className="grid grid-cols-2 gap-2">
          <Button
            onClick={() => onCreateExplosion("star", 100)}
            className="bg-particle-star/20 border border-particle-star/50 text-particle-star hover:bg-particle-star/30 text-sm"
            variant="outline"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Stars
          </Button>

          <Button
            onClick={() => onCreateExplosion("plasma", 80)}
            className="bg-particle-plasma/20 border border-particle-plasma/50 text-particle-plasma hover:bg-particle-plasma/30 text-sm"
            variant="outline"
          >
            <Zap className="w-4 h-4 mr-2" />
            Plasma
          </Button>

          <Button
            onClick={onCreateGalaxy}
            className="bg-particle-galaxy/20 border border-particle-galaxy/50 text-particle-galaxy hover:bg-particle-galaxy/30 text-sm"
            variant="outline"
          >
            <Galaxy className="w-4 h-4 mr-2" />
            Galaxy
          </Button>

          <Button
            onClick={onAddAttractor}
            className="bg-cosmic-teal/20 border border-cosmic-teal/50 text-cosmic-teal hover:bg-cosmic-teal/30 text-sm"
            variant="outline"
          >
            <Target className="w-4 h-4 mr-2" />
            Attractor
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Button
            onClick={onCreateStarField}
            className="bg-cosmic-gold/20 border border-cosmic-gold/50 text-cosmic-gold hover:bg-cosmic-gold/30 text-sm"
            variant="outline"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Star Field
          </Button>

          <Button
            onClick={onCreateNebulaCloud}
            className="bg-particle-nebula/20 border border-particle-nebula/50 text-particle-nebula hover:bg-particle-nebula/30 text-sm"
            variant="outline"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Nebula
          </Button>
        </div>
      </div>

      {/* Physics Controls */}
      <div className="space-y-4">
        <h3 className="text-sm font-space text-cosmic-purple">Physics</h3>

        <div className="space-y-3">
          <div>
            <label className="text-xs text-cosmic-blue block mb-2">
              Gravity: {config.gravity.toFixed(4)}
            </label>
            <Slider
              value={[config.gravity * 1000]}
              onValueChange={([value]) =>
                onUpdateConfig({ gravity: value / 1000 })
              }
              max={10}
              min={0}
              step={0.1}
              className="w-full"
            />
          </div>

          <div>
            <label className="text-xs text-cosmic-teal block mb-2">
              Attraction: {config.attraction.toFixed(2)}
            </label>
            <Slider
              value={[config.attraction * 10]}
              onValueChange={([value]) =>
                onUpdateConfig({ attraction: value / 10 })
              }
              max={5}
              min={0}
              step={0.1}
              className="w-full"
            />
          </div>

          <div>
            <label className="text-xs text-cosmic-pink block mb-2">
              Time Scale: {config.timeScale.toFixed(1)}x
            </label>
            <Slider
              value={[config.timeScale]}
              onValueChange={([value]) => onUpdateConfig({ timeScale: value })}
              max={3}
              min={0.1}
              step={0.1}
              className="w-full"
            />
          </div>

          <div>
            <label className="text-xs text-cosmic-green block mb-2">
              Damping: {(config.damping * 100).toFixed(1)}%
            </label>
            <Slider
              value={[config.damping * 100]}
              onValueChange={([value]) =>
                onUpdateConfig({ damping: value / 100 })
              }
              max={100}
              min={90}
              step={0.1}
              className="w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
