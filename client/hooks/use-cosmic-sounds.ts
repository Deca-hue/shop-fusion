import { useCallback, useRef } from "react";

export function useCosmicSounds() {
  const audioContextRef = useRef<AudioContext | null>(null);

  const getAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext ||
        (window as any).webkitAudioContext)();
    }
    return audioContextRef.current;
  }, []);

  const playTone = useCallback(
    (
      frequency: number,
      duration: number,
      type: OscillatorType = "sine",
      volume: number = 0.1,
    ) => {
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

        gainNode.gain.setValueAtTime(volume, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(
          0.001,
          audioContext.currentTime + duration,
        );

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + duration);
      } catch (error) {
        console.warn("Audio not supported:", error);
      }
    },
    [getAudioContext],
  );

  const playChord = useCallback(
    (
      frequencies: number[],
      duration: number,
      type: OscillatorType = "sine",
    ) => {
      frequencies.forEach((freq, index) => {
        setTimeout(() => {
          playTone(freq, duration, type, 0.05);
        }, index * 50);
      });
    },
    [playTone],
  );

  const playStarExplosion = useCallback(() => {
    // Bright, shimmering sound
    const frequencies = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    playChord(frequencies, 0.8, "sine");

    // Add sparkle effect
    setTimeout(() => {
      for (let i = 0; i < 5; i++) {
        setTimeout(() => {
          playTone(1500 + Math.random() * 1000, 0.2, "triangle", 0.03);
        }, i * 100);
      }
    }, 200);
  }, [playChord, playTone]);

  const playPlasmaExplosion = useCallback(() => {
    // Electric, crackling sound
    try {
      const audioContext = getAudioContext();
      const duration = 0.6;

      // Main plasma burst
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      const filter = audioContext.createBiquadFilter();

      oscillator.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.type = "sawtooth";
      oscillator.frequency.setValueAtTime(80, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(
        400,
        audioContext.currentTime + duration,
      );

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(2000, audioContext.currentTime);
      filter.frequency.exponentialRampToValueAtTime(
        4000,
        audioContext.currentTime + duration,
      );

      gainNode.gain.setValueAtTime(0.15, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(
        0.001,
        audioContext.currentTime + duration,
      );

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + duration);

      // Add crackling effect
      for (let i = 0; i < 8; i++) {
        setTimeout(() => {
          playTone(200 + Math.random() * 800, 0.1, "square", 0.02);
        }, i * 80);
      }
    } catch (error) {
      console.warn("Audio not supported:", error);
    }
  }, [getAudioContext, playTone]);

  const playGalaxyCreation = useCallback(() => {
    // Deep, majestic sound
    const baseFreq = 110; // A2
    const harmonics = [1, 1.5, 2, 2.5, 3, 4, 5];

    harmonics.forEach((harmonic, index) => {
      setTimeout(() => {
        playTone(baseFreq * harmonic, 2, "sine", 0.08 / harmonic);
      }, index * 200);
    });

    // Add swirling effect
    setTimeout(() => {
      for (let i = 0; i < 10; i++) {
        setTimeout(() => {
          const freq = 200 + i * 50;
          playTone(freq, 0.5, "triangle", 0.03);
        }, i * 150);
      }
    }, 500);
  }, [playTone]);

  const playAttractorPulse = useCallback(() => {
    // Rhythmic gravitational pulse
    try {
      const audioContext = getAudioContext();
      const duration = 1.5;

      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      const lfo = audioContext.createOscillator();
      const lfoGain = audioContext.createGain();

      // Setup LFO for tremolo effect
      lfo.frequency.setValueAtTime(8, audioContext.currentTime);
      lfo.connect(lfoGain);
      lfoGain.gain.setValueAtTime(0.3, audioContext.currentTime);
      lfoGain.connect(gainNode.gain);

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(55, audioContext.currentTime); // A1

      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(
        0.001,
        audioContext.currentTime + duration,
      );

      oscillator.start(audioContext.currentTime);
      lfo.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + duration);
      lfo.stop(audioContext.currentTime + duration);
    } catch (error) {
      console.warn("Audio not supported:", error);
    }
  }, [getAudioContext]);

  const playNebulaWhoosh = useCallback(() => {
    // Ethereal, whooshing sound
    try {
      const audioContext = getAudioContext();
      const duration = 1.2;

      // Create noise buffer
      const bufferSize = audioContext.sampleRate * duration;
      const buffer = audioContext.createBuffer(
        1,
        bufferSize,
        audioContext.sampleRate,
      );
      const output = buffer.getChannelData(0);

      // Generate pink noise
      for (let i = 0; i < bufferSize; i++) {
        output[i] = (Math.random() * 2 - 1) * 0.1;
      }

      const source = audioContext.createBufferSource();
      const filter = audioContext.createBiquadFilter();
      const gainNode = audioContext.createGain();

      source.buffer = buffer;
      source.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(audioContext.destination);

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(300, audioContext.currentTime);
      filter.frequency.exponentialRampToValueAtTime(
        1200,
        audioContext.currentTime + duration,
      );

      gainNode.gain.setValueAtTime(0.05, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(
        0.001,
        audioContext.currentTime + duration,
      );

      source.start(audioContext.currentTime);
    } catch (error) {
      console.warn("Audio not supported:", error);
    }
  }, [getAudioContext]);

  const playAmbientSpace = useCallback(() => {
    // Continuous ambient space sound
    try {
      const audioContext = getAudioContext();
      const duration = 30; // Long ambient sound

      // Create multiple layers
      const frequencies = [55, 82.5, 110, 165]; // A1, E2, A2, E3

      frequencies.forEach((freq, index) => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        const filter = audioContext.createBiquadFilter();

        oscillator.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.type = "sine";
        oscillator.frequency.setValueAtTime(freq, audioContext.currentTime);

        filter.type = "lowpass";
        filter.frequency.setValueAtTime(800, audioContext.currentTime);

        gainNode.gain.setValueAtTime(0, audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(
          0.02 / (index + 1),
          audioContext.currentTime + 3,
        );
        gainNode.gain.linearRampToValueAtTime(
          0,
          audioContext.currentTime + duration - 3,
        );

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + duration);
      });
    } catch (error) {
      console.warn("Audio not supported:", error);
    }
  }, [getAudioContext]);

  return {
    playStarExplosion,
    playPlasmaExplosion,
    playGalaxyCreation,
    playAttractorPulse,
    playNebulaWhoosh,
    playAmbientSpace,
  };
}
