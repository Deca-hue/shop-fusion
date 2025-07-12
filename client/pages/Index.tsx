import { TetrisGame } from "@/components/tetris/TetrisGame";

export default function Index() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      {/* Retro background animation */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-retro-darker via-retro-dark to-retro-darker" />
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-neon-cyan rounded-full animate-pulse" />
          <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-neon-pink rounded-full animate-pulse delay-500" />
          <div className="absolute bottom-1/3 left-1/2 w-1 h-1 bg-neon-green rounded-full animate-pulse delay-1000" />
          <div className="absolute bottom-1/4 right-1/4 w-1 h-1 bg-neon-yellow rounded-full animate-pulse delay-1500" />
        </div>
        {/* Animated grid lines */}
        <div className="absolute inset-0 opacity-5">
          {Array.from({ length: 20 }, (_, i) => (
            <div
              key={`grid-h-${i}`}
              className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-neon-cyan to-transparent"
              style={{
                top: `${(i * 100) / 20}%`,
                animationDelay: `${i * 100}ms`,
              }}
            />
          ))}
          {Array.from({ length: 20 }, (_, i) => (
            <div
              key={`grid-v-${i}`}
              className="absolute top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-neon-cyan to-transparent"
              style={{
                left: `${(i * 100) / 20}%`,
                animationDelay: `${i * 100}ms`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Main game container */}
      <div className="relative z-10 w-full max-w-md">
        <TetrisGame />
      </div>

      {/* Retro footer */}
      <div className="relative z-10 mt-8 text-center">
        <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <span className="retro-text text-neon-cyan">◆</span>
          <span>Built with retro vibes</span>
          <span className="retro-text text-neon-pink">◆</span>
        </div>
      </div>
    </div>
  );
}
