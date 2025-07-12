import { cn } from "@/lib/utils";

interface GameStatsProps {
  score: number;
  lines: number;
  level: number;
  className?: string;
}

export function GameStats({ score, lines, level, className }: GameStatsProps) {
  return (
    <div
      className={cn(
        "bg-retro-dark border border-neon-green/50 rounded-lg p-3 space-y-3",
        "shadow-md shadow-neon-green/20",
        className,
      )}
    >
      <div className="text-center">
        <h3 className="retro-text text-xs text-neon-green mb-1">SCORE</h3>
        <p className="text-white font-mono text-lg font-bold">
          {score.toLocaleString()}
        </p>
      </div>

      <div className="text-center">
        <h3 className="retro-text text-xs text-neon-yellow mb-1">LINES</h3>
        <p className="text-white font-mono text-lg font-bold">{lines}</p>
      </div>

      <div className="text-center">
        <h3 className="retro-text text-xs text-neon-orange mb-1">LEVEL</h3>
        <p className="text-white font-mono text-lg font-bold">{level}</p>
      </div>
    </div>
  );
}
