import { useTetris } from "@/hooks/use-tetris";
import { GameBoard } from "./GameBoard";
import { NextPiece } from "./NextPiece";
import { GameStats } from "./GameStats";
import { GameControls } from "./GameControls";
import { cn } from "@/lib/utils";

interface TetrisGameProps {
  className?: string;
}

export function TetrisGame({ className }: TetrisGameProps) {
  const {
    gameState,
    startGame,
    togglePause,
    movePiece,
    rotatePiece,
    hardDrop,
    getBoardWithCurrentPiece,
  } = useTetris();

  const board = getBoardWithCurrentPiece();

  return (
    <div className={cn("w-full max-w-md mx-auto", className)}>
      {/* Game header */}
      <div className="text-center mb-6">
        <h1 className="retro-text text-2xl text-neon-cyan neon-pulse mb-2">
          TETRIS
        </h1>
        <div className="h-1 bg-gradient-to-r from-transparent via-neon-cyan to-transparent opacity-50" />
      </div>

      {/* Game status */}
      {gameState.gameOver && (
        <div className="text-center mb-4 p-4 bg-retro-dark border border-neon-pink rounded-lg">
          <h2 className="retro-text text-lg text-neon-pink mb-2 retro-blink">
            GAME OVER
          </h2>
          <p className="text-white font-mono">
            Final Score: {gameState.score.toLocaleString()}
          </p>
        </div>
      )}

      {gameState.isPaused && gameState.isPlaying && (
        <div className="text-center mb-4 p-4 bg-retro-dark border border-neon-yellow rounded-lg">
          <h2 className="retro-text text-lg text-neon-yellow retro-blink">
            PAUSED
          </h2>
        </div>
      )}

      {/* Game layout */}
      <div className="grid grid-cols-1 gap-4">
        {/* Top row - Stats and Next piece */}
        <div className="grid grid-cols-2 gap-4">
          <GameStats
            score={gameState.score}
            lines={gameState.lines}
            level={gameState.level}
          />
          <NextPiece piece={gameState.nextPiece} />
        </div>

        {/* Main game board */}
        <GameBoard board={board} className="mx-auto" />

        {/* Controls */}
        <GameControls
          onMoveLeft={() => movePiece(-1, 0)}
          onMoveRight={() => movePiece(1, 0)}
          onMoveDown={() => movePiece(0, 1)}
          onRotate={rotatePiece}
          onHardDrop={hardDrop}
          onTogglePause={togglePause}
          onStartGame={startGame}
          isPlaying={gameState.isPlaying}
          isPaused={gameState.isPaused}
          gameOver={gameState.gameOver}
        />
      </div>

      {/* Footer */}
      <div className="text-center mt-6 text-xs text-muted-foreground">
        <p>Mobile-optimized retro Tetris</p>
        <div className="flex justify-center items-center gap-2 mt-2">
          <div className="w-2 h-2 bg-neon-cyan rounded-full animate-pulse" />
          <div className="w-2 h-2 bg-neon-pink rounded-full animate-pulse delay-150" />
          <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse delay-300" />
        </div>
      </div>
    </div>
  );
}
