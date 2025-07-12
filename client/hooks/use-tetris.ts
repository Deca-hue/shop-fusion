import { useState, useEffect, useCallback, useRef } from "react";
import {
  GameState,
  Tetromino,
  Position,
  TetrominoType,
  createEmptyBoard,
  generateRandomTetromino,
  rotateTetromino,
  isValidPosition,
  placePieceOnBoard,
  clearCompletedLines,
  calculateScore,
  calculateLevel,
  calculateDropSpeed,
  BOARD_WIDTH,
  BOARD_HEIGHT,
} from "@/lib/tetris";
import { useRetroSounds } from "./use-retro-sounds";

export function useTetris() {
  const [gameState, setGameState] = useState<GameState>({
    board: createEmptyBoard(),
    currentPiece: null,
    nextPiece: null,
    score: 0,
    lines: 0,
    level: 0,
    isPlaying: false,
    isPaused: false,
    gameOver: false,
  });

  const dropTimeRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const previousLevelRef = useRef<number>(0);

  const sounds = useRetroSounds();

  // Start new game
  const startGame = useCallback(() => {
    const firstPiece = generateRandomTetromino();
    const secondPiece = generateRandomTetromino();

    setGameState({
      board: createEmptyBoard(),
      currentPiece: firstPiece,
      nextPiece: secondPiece,
      score: 0,
      lines: 0,
      level: 0,
      isPlaying: true,
      isPaused: false,
      gameOver: false,
    });

    dropTimeRef.current = 0;
    lastTimeRef.current = 0;
  }, []);

  // Pause/unpause game
  const togglePause = useCallback(() => {
    setGameState((prev) => ({
      ...prev,
      isPaused: !prev.isPaused,
    }));
  }, []);

  // Move piece
  const movePiece = useCallback(
    (deltaX: number, deltaY: number) => {
      setGameState((prev) => {
        if (
          !prev.currentPiece ||
          !prev.isPlaying ||
          prev.isPaused ||
          prev.gameOver
        ) {
          return prev;
        }

        const newPosition: Position = {
          x: prev.currentPiece.position.x + deltaX,
          y: prev.currentPiece.position.y + deltaY,
        };

        if (isValidPosition(prev.board, prev.currentPiece, newPosition)) {
          // Play move sound only for horizontal movement
          if (deltaX !== 0) {
            sounds.playMove();
          }

          return {
            ...prev,
            currentPiece: {
              ...prev.currentPiece,
              position: newPosition,
            },
          };
        }

        return prev;
      });
    },
    [sounds],
  );

  // Rotate piece
  const rotatePiece = useCallback(() => {
    setGameState((prev) => {
      if (
        !prev.currentPiece ||
        !prev.isPlaying ||
        prev.isPaused ||
        prev.gameOver
      ) {
        return prev;
      }

      const rotatedShape = rotateTetromino(prev.currentPiece.shape);
      const rotatedPiece = {
        ...prev.currentPiece,
        shape: rotatedShape,
      };

      if (
        isValidPosition(prev.board, rotatedPiece, prev.currentPiece.position)
      ) {
        sounds.playRotate();

        return {
          ...prev,
          currentPiece: rotatedPiece,
        };
      }

      return prev;
    });
  }, [sounds]);

  // Hard drop
  const hardDrop = useCallback(() => {
    setGameState((prev) => {
      if (
        !prev.currentPiece ||
        !prev.isPlaying ||
        prev.isPaused ||
        prev.gameOver
      ) {
        return prev;
      }

      let dropDistance = 0;
      let newY = prev.currentPiece.position.y;

      // Find the lowest valid position
      while (
        isValidPosition(prev.board, prev.currentPiece, {
          x: prev.currentPiece.position.x,
          y: newY + 1,
        })
      ) {
        newY++;
        dropDistance++;
      }

      if (dropDistance > 0) {
        sounds.playDrop();
      }

      const droppedPiece = {
        ...prev.currentPiece,
        position: { ...prev.currentPiece.position, y: newY },
      };

      // Place piece and generate new one
      const boardWithPiece = placePieceOnBoard(prev.board, droppedPiece);
      const { newBoard, linesCleared } = clearCompletedLines(boardWithPiece);

      const newLines = prev.lines + linesCleared;
      const newLevel = calculateLevel(newLines);
      const lineScore = calculateScore(linesCleared, prev.level);
      const dropScore = dropDistance * 2; // 2 points per cell dropped
      const newScore = prev.score + lineScore + dropScore;

      const nextPiece = generateRandomTetromino();

      // Check game over
      const gameOver = !isValidPosition(
        newBoard,
        prev.nextPiece!,
        prev.nextPiece!.position,
      );

      // Play appropriate sound effects
      if (linesCleared > 0) {
        sounds.playLineClear();
      }

      if (gameOver) {
        setTimeout(() => sounds.playGameOver(), 200);
      }

      return {
        ...prev,
        board: newBoard,
        currentPiece: gameOver ? null : prev.nextPiece,
        nextPiece: gameOver ? null : nextPiece,
        score: newScore,
        lines: newLines,
        level: newLevel,
        gameOver,
        isPlaying: !gameOver,
      };
    });
  }, [sounds]);

  // Drop piece one line
  const dropPiece = useCallback(() => {
    setGameState((prev) => {
      if (
        !prev.currentPiece ||
        !prev.isPlaying ||
        prev.isPaused ||
        prev.gameOver
      ) {
        return prev;
      }

      const newPosition: Position = {
        x: prev.currentPiece.position.x,
        y: prev.currentPiece.position.y + 1,
      };

      // If piece can move down, move it
      if (isValidPosition(prev.board, prev.currentPiece, newPosition)) {
        return {
          ...prev,
          currentPiece: {
            ...prev.currentPiece,
            position: newPosition,
          },
        };
      }

      // Otherwise, place piece and generate new one
      const boardWithPiece = placePieceOnBoard(prev.board, prev.currentPiece);
      const { newBoard, linesCleared } = clearCompletedLines(boardWithPiece);

      const newLines = prev.lines + linesCleared;
      const newLevel = calculateLevel(newLines);
      const newScore = prev.score + calculateScore(linesCleared, prev.level);

      const nextPiece = generateRandomTetromino();

      // Check game over
      const gameOver = !isValidPosition(
        newBoard,
        prev.nextPiece!,
        prev.nextPiece!.position,
      );

      // Play appropriate sound effects
      if (linesCleared > 0) {
        sounds.playLineClear();
      }

      if (gameOver) {
        setTimeout(() => sounds.playGameOver(), 200);
      }

      return {
        ...prev,
        board: newBoard,
        currentPiece: gameOver ? null : prev.nextPiece,
        nextPiece: gameOver ? null : nextPiece,
        score: newScore,
        lines: newLines,
        level: newLevel,
        gameOver,
        isPlaying: !gameOver,
      };
    });
  }, [sounds]);

  // Game loop
  useEffect(() => {
    if (!gameState.isPlaying || gameState.isPaused || gameState.gameOver) {
      return;
    }

    const gameLoop = (currentTime: number) => {
      if (lastTimeRef.current === 0) {
        lastTimeRef.current = currentTime;
      }

      const deltaTime = currentTime - lastTimeRef.current;
      dropTimeRef.current += deltaTime;

      const dropSpeed = calculateDropSpeed(gameState.level);

      if (dropTimeRef.current >= dropSpeed) {
        dropPiece();
        dropTimeRef.current = 0;
      }

      lastTimeRef.current = currentTime;

      if (gameState.isPlaying && !gameState.isPaused && !gameState.gameOver) {
        requestAnimationFrame(gameLoop);
      }
    };

    const animationId = requestAnimationFrame(gameLoop);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [
    gameState.isPlaying,
    gameState.isPaused,
    gameState.gameOver,
    gameState.level,
    dropPiece,
  ]);

  // Check for level up and play sound
  useEffect(() => {
    if (gameState.level > previousLevelRef.current && gameState.level > 0) {
      sounds.playLevelUp();
    }
    previousLevelRef.current = gameState.level;
  }, [gameState.level, sounds]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (!gameState.isPlaying) return;

      switch (event.key) {
        case "ArrowLeft":
          event.preventDefault();
          movePiece(-1, 0);
          break;
        case "ArrowRight":
          event.preventDefault();
          movePiece(1, 0);
          break;
        case "ArrowDown":
          event.preventDefault();
          movePiece(0, 1);
          break;
        case "ArrowUp":
        case " ": // Spacebar
          event.preventDefault();
          rotatePiece();
          break;
        case "Enter":
          event.preventDefault();
          hardDrop();
          break;
        case "p":
        case "P":
          event.preventDefault();
          togglePause();
          break;
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [gameState.isPlaying, movePiece, rotatePiece, hardDrop, togglePause]);

  // Get board with current piece
  const getBoardWithCurrentPiece =
    useCallback((): (TetrominoType | null)[][] => {
      if (!gameState.currentPiece) {
        return gameState.board;
      }

      return placePieceOnBoard(gameState.board, gameState.currentPiece);
    }, [gameState.board, gameState.currentPiece]);

  return {
    gameState,
    startGame,
    togglePause,
    movePiece,
    rotatePiece,
    hardDrop,
    getBoardWithCurrentPiece,
  };
}
