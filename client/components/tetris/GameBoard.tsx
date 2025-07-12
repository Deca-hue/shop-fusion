import { TetrominoType, TETROMINO_COLORS } from "@/lib/tetris";
import { cn } from "@/lib/utils";

interface GameBoardProps {
  board: (TetrominoType | null)[][];
  className?: string;
}

export function GameBoard({ board, className }: GameBoardProps) {
  return (
    <div
      className={cn(
        "game-board relative bg-retro-dark border-2 border-neon-cyan/50 rounded-lg p-2",
        "shadow-lg shadow-neon-cyan/20",
        className,
      )}
    >
      <div className="grid grid-cols-10 gap-[1px]">
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={cn(
                "tetris-block aspect-square w-6 h-6 rounded-sm transition-all duration-150",
                cell
                  ? cn(TETROMINO_COLORS[cell], "neon-glow")
                  : "bg-retro-darker/50 border border-retro-grid/30",
              )}
            />
          )),
        )}
      </div>

      {/* Grid overlay for retro effect */}
      <div className="absolute inset-2 pointer-events-none">
        <div className="w-full h-full opacity-10">
          {Array.from({ length: 19 }, (_, i) => (
            <div
              key={`h-${i}`}
              className="absolute left-0 right-0 h-[1px] bg-neon-cyan"
              style={{ top: `${((i + 1) * 100) / 20}%` }}
            />
          ))}
          {Array.from({ length: 9 }, (_, i) => (
            <div
              key={`v-${i}`}
              className="absolute top-0 bottom-0 w-[1px] bg-neon-cyan"
              style={{ left: `${((i + 1) * 100) / 10}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
