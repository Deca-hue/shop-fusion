import { Tetromino, TETROMINO_COLORS } from "@/lib/tetris";
import { cn } from "@/lib/utils";

interface NextPieceProps {
  piece: Tetromino | null;
  className?: string;
}

export function NextPiece({ piece, className }: NextPieceProps) {
  return (
    <div
      className={cn(
        "bg-retro-dark border border-neon-purple/50 rounded-lg p-3",
        "shadow-md shadow-neon-purple/20",
        className,
      )}
    >
      <h3 className="retro-text text-xs text-neon-purple mb-2 text-center">
        NEXT
      </h3>
      <div className="grid grid-cols-4 gap-[1px] w-16 h-16 mx-auto">
        {Array.from({ length: 16 }, (_, index) => {
          const row = Math.floor(index / 4);
          const col = index % 4;
          const hasBlock = piece?.shape[row]?.[col];

          return (
            <div
              key={index}
              className={cn(
                "aspect-square w-3 h-3 rounded-sm transition-all duration-150",
                hasBlock && piece
                  ? cn(TETROMINO_COLORS[piece.type], "neon-glow")
                  : "bg-retro-darker/30",
              )}
            />
          );
        })}
      </div>
    </div>
  );
}
