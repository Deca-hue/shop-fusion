import { useCallback, useRef } from "react";

// Web Audio API-based retro sound generator
export function useRetroSounds() {
  const audioContextRef = useRef<AudioContext | null>(null);

  const getAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext ||
        (window as any).webkitAudioContext)();
    }
    return audioContextRef.current;
  }, []);

  const playTone = useCallback(
    (frequency: number, duration: number, type: OscillatorType = "square") => {
      try {
        const audioContext = getAudioContext();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.setValueAtTime(
          frequency,
          audioContext.currentTime,
        );
        oscillator.type = type;

        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(
          0.01,
          audioContext.currentTime + duration,
        );

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + duration);
      } catch (error) {
        // Silently fail if audio context is not supported
        console.warn("Audio not supported:", error);
      }
    },
    [getAudioContext],
  );

  const playMove = useCallback(() => {
    playTone(200, 0.1, "square");
  }, [playTone]);

  const playRotate = useCallback(() => {
    playTone(300, 0.15, "triangle");
  }, [playTone]);

  const playDrop = useCallback(() => {
    // Create a descending tone effect
    try {
      const audioContext = getAudioContext();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.setValueAtTime(400, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(
        100,
        audioContext.currentTime + 0.3,
      );
      oscillator.type = "sawtooth";

      gainNode.gain.setValueAtTime(0.15, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(
        0.01,
        audioContext.currentTime + 0.3,
      );

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.3);
    } catch (error) {
      console.warn("Audio not supported:", error);
    }
  }, [getAudioContext]);

  const playLineClear = useCallback(() => {
    // Create an ascending tone effect
    try {
      const audioContext = getAudioContext();
      const frequencies = [261.63, 329.63, 392.0, 523.25]; // C4, E4, G4, C5

      frequencies.forEach((freq, index) => {
        setTimeout(() => {
          playTone(freq, 0.2, "sine");
        }, index * 50);
      });
    } catch (error) {
      console.warn("Audio not supported:", error);
    }
  }, [playTone]);

  const playGameOver = useCallback(() => {
    // Create a descending sequence
    try {
      const audioContext = getAudioContext();
      const frequencies = [523.25, 392.0, 329.63, 261.63]; // C5, G4, E4, C4

      frequencies.forEach((freq, index) => {
        setTimeout(() => {
          playTone(freq, 0.5, "triangle");
        }, index * 200);
      });
    } catch (error) {
      console.warn("Audio not supported:", error);
    }
  }, [playTone]);

  const playLevelUp = useCallback(() => {
    // Create an uplifting sequence
    try {
      const frequencies = [261.63, 329.63, 392.0, 523.25, 659.25]; // C4, E4, G4, C5, E5

      frequencies.forEach((freq, index) => {
        setTimeout(() => {
          playTone(freq, 0.15, "sine");
        }, index * 80);
      });
    } catch (error) {
      console.warn("Audio not supported:", error);
    }
  }, [playTone]);

  return {
    playMove,
    playRotate,
    playDrop,
    playLineClear,
    playGameOver,
    playLevelUp,
  };
}
