// Tetris game types and logic

export type TetrominoType = "I" | "O" | "T" | "S" | "Z" | "J" | "L";

export interface Position {
  x: number;
  y: number;
}

export interface Tetromino {
  type: TetrominoType;
  shape: number[][];
  position: Position;
  color: string;
}

export interface GameState {
  board: (TetrominoType | null)[][];
  currentPiece: Tetromino | null;
  nextPiece: Tetromino | null;
  score: number;
  lines: number;
  level: number;
  isPlaying: boolean;
  isPaused: boolean;
  gameOver: boolean;
}

// Tetromino shapes (4x4 grids)
export const TETROMINO_SHAPES: Record<TetrominoType, number[][]> = {
  I: [
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
  O: [
    [0, 0, 0, 0],
    [0, 1, 1, 0],
    [0, 1, 1, 0],
    [0, 0, 0, 0],
  ],
  T: [
    [0, 0, 0, 0],
    [0, 1, 0, 0],
    [1, 1, 1, 0],
    [0, 0, 0, 0],
  ],
  S: [
    [0, 0, 0, 0],
    [0, 1, 1, 0],
    [1, 1, 0, 0],
    [0, 0, 0, 0],
  ],
  Z: [
    [0, 0, 0, 0],
    [1, 1, 0, 0],
    [0, 1, 1, 0],
    [0, 0, 0, 0],
  ],
  J: [
    [0, 0, 0, 0],
    [1, 0, 0, 0],
    [1, 1, 1, 0],
    [0, 0, 0, 0],
  ],
  L: [
    [0, 0, 0, 0],
    [0, 0, 1, 0],
    [1, 1, 1, 0],
    [0, 0, 0, 0],
  ],
};

export const TETROMINO_COLORS: Record<TetrominoType, string> = {
  I: "bg-tetris-block-I",
  O: "bg-tetris-block-O",
  T: "bg-tetris-block-T",
  S: "bg-tetris-block-S",
  Z: "bg-tetris-block-Z",
  J: "bg-tetris-block-J",
  L: "bg-tetris-block-L",
};

// Game constants
export const BOARD_WIDTH = 10;
export const BOARD_HEIGHT = 20;
export const PREVIEW_SIZE = 4;

// Initialize empty board
export function createEmptyBoard(): (TetrominoType | null)[][] {
  return Array.from({ length: BOARD_HEIGHT }, () =>
    Array.from({ length: BOARD_WIDTH }, () => null),
  );
}

// Generate random tetromino
export function generateRandomTetromino(): Tetromino {
  const types: TetrominoType[] = ["I", "O", "T", "S", "Z", "J", "L"];
  const type = types[Math.floor(Math.random() * types.length)];

  return {
    type,
    shape: TETROMINO_SHAPES[type],
    position: { x: Math.floor(BOARD_WIDTH / 2) - 2, y: 0 },
    color: TETROMINO_COLORS[type],
  };
}

// Rotate tetromino shape 90 degrees clockwise
export function rotateTetromino(shape: number[][]): number[][] {
  const size = shape.length;
  const rotated = Array.from({ length: size }, () => Array(size).fill(0));

  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      rotated[j][size - 1 - i] = shape[i][j];
    }
  }

  return rotated;
}

// Check if position is valid (no collision)
export function isValidPosition(
  board: (TetrominoType | null)[][],
  piece: Tetromino,
  newPosition: Position,
): boolean {
  for (let y = 0; y < piece.shape.length; y++) {
    for (let x = 0; x < piece.shape[y].length; x++) {
      if (piece.shape[y][x]) {
        const newX = newPosition.x + x;
        const newY = newPosition.y + y;

        // Check boundaries
        if (newX < 0 || newX >= BOARD_WIDTH || newY >= BOARD_HEIGHT) {
          return false;
        }

        // Check collision with existing blocks (but allow negative Y for spawning)
        if (newY >= 0 && board[newY][newX] !== null) {
          return false;
        }
      }
    }
  }

  return true;
}

// Place piece on board
export function placePieceOnBoard(
  board: (TetrominoType | null)[][],
  piece: Tetromino,
): (TetrominoType | null)[][] {
  const newBoard = board.map((row) => [...row]);

  for (let y = 0; y < piece.shape.length; y++) {
    for (let x = 0; x < piece.shape[y].length; x++) {
      if (piece.shape[y][x]) {
        const boardX = piece.position.x + x;
        const boardY = piece.position.y + y;

        if (
          boardY >= 0 &&
          boardY < BOARD_HEIGHT &&
          boardX >= 0 &&
          boardX < BOARD_WIDTH
        ) {
          newBoard[boardY][boardX] = piece.type;
        }
      }
    }
  }

  return newBoard;
}

// Check and clear completed lines
export function clearCompletedLines(board: (TetrominoType | null)[][]): {
  newBoard: (TetrominoType | null)[][];
  linesCleared: number;
} {
  const completedLines: number[] = [];

  // Find completed lines
  for (let y = 0; y < BOARD_HEIGHT; y++) {
    if (board[y].every((cell) => cell !== null)) {
      completedLines.push(y);
    }
  }

  if (completedLines.length === 0) {
    return { newBoard: board, linesCleared: 0 };
  }

  // Create new board without completed lines
  let newBoard = board.filter((_, index) => !completedLines.includes(index));

  // Add empty lines at the top
  const emptyLines = Array.from({ length: completedLines.length }, () =>
    Array.from({ length: BOARD_WIDTH }, () => null),
  );

  newBoard = [...emptyLines, ...newBoard];

  return { newBoard, linesCleared: completedLines.length };
}

// Calculate score based on lines cleared and level
export function calculateScore(linesCleared: number, level: number): number {
  const baseScores = [0, 40, 100, 300, 1200]; // Single, double, triple, tetris
  return baseScores[linesCleared] * (level + 1);
}

// Calculate level based on lines cleared
export function calculateLevel(totalLines: number): number {
  return Math.floor(totalLines / 10);
}

// Calculate drop speed based on level
export function calculateDropSpeed(level: number): number {
  return Math.max(50, 1000 - level * 50); // Minimum 50ms, decreases with level
}
