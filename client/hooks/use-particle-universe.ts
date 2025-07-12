import { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import {
  ParticleUniverse,
  PhysicsConfig,
  ParticleType,
} from "@/lib/particle-physics";
import { useCosmicSounds } from "./use-cosmic-sounds";

export interface UniverseState {
  particleCount: number;
  attractors: number;
  isPlaying: boolean;
  config: PhysicsConfig;
}

export function useParticleUniverse(
  canvasRef: React.RefObject<HTMLCanvasElement>,
) {
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const universeRef = useRef<ParticleUniverse | null>(null);
  const frameIdRef = useRef<number | null>(null);
  const mouseRef = useRef<THREE.Vector2>(new THREE.Vector2());
  const raycasterRef = useRef<THREE.Raycaster>(new THREE.Raycaster());
  const clockRef = useRef<THREE.Clock>(new THREE.Clock());

  const sounds = useCosmicSounds();

  const [universeState, setUniverseState] = useState<UniverseState>({
    particleCount: 0,
    attractors: 0,
    isPlaying: true,
    config: {
      gravity: 0.001,
      damping: 0.99,
      attraction: 0.1,
      repulsion: 0.05,
      maxVelocity: 5,
      timeScale: 1,
    },
  });

  // Initialize Three.js scene
  const initializeScene = useCallback(() => {
    if (!canvasRef.current) return;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a15);
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    camera.position.set(0, 20, 50);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    rendererRef.current = renderer;

    // Particle Universe
    const universe = new ParticleUniverse(scene, universeState.config);
    universeRef.current = universe;

    // Add some initial cosmic effects
    createStarField();
    createNebulaCloud();

    // Start animation loop
    clockRef.current.start();
    animate();

    return () => {
      if (frameIdRef.current) {
        cancelAnimationFrame(frameIdRef.current);
      }
      universe.dispose();
      renderer.dispose();
    };
  }, [canvasRef, universeState.config]);

  // Animation loop
  const animate = useCallback(() => {
    if (
      !sceneRef.current ||
      !rendererRef.current ||
      !cameraRef.current ||
      !universeRef.current
    ) {
      return;
    }

    if (universeState.isPlaying) {
      const deltaTime = clockRef.current.getDelta();
      universeRef.current.update(deltaTime * 16.67); // Convert to ~60fps timing

      // Update state
      setUniverseState((prev) => ({
        ...prev,
        particleCount: universeRef.current!.getParticleCount(),
        attractors: universeRef.current!["attractors"]?.length || 0,
      }));
    }

    // Auto-rotate camera
    if (cameraRef.current) {
      const time = clockRef.current.getElapsedTime();
      cameraRef.current.position.x = Math.cos(time * 0.1) * 50;
      cameraRef.current.position.z = Math.sin(time * 0.1) * 50;
      cameraRef.current.lookAt(0, 0, 0);
    }

    rendererRef.current.render(sceneRef.current, cameraRef.current);
    frameIdRef.current = requestAnimationFrame(animate);
  }, [universeState.isPlaying]);

  // Create star field
  const createStarField = useCallback(() => {
    if (!universeRef.current) return;

    for (let i = 0; i < 200; i++) {
      const position = new THREE.Vector3(
        (Math.random() - 0.5) * 200,
        (Math.random() - 0.5) * 200,
        (Math.random() - 0.5) * 200,
      );
      const velocity = new THREE.Vector3(
        (Math.random() - 0.5) * 0.1,
        (Math.random() - 0.5) * 0.1,
        (Math.random() - 0.5) * 0.1,
      );
      universeRef.current.createParticle(position, velocity, "star");
    }
  }, []);

  // Create nebula cloud
  const createNebulaCloud = useCallback(() => {
    if (!universeRef.current) return;

    const center = new THREE.Vector3(0, 0, 0);
    for (let i = 0; i < 100; i++) {
      const radius = Math.random() * 20 + 5;
      const angle = Math.random() * Math.PI * 2;
      const height = (Math.random() - 0.5) * 10;

      const position = new THREE.Vector3(
        center.x + Math.cos(angle) * radius,
        center.y + height,
        center.z + Math.sin(angle) * radius,
      );
      const velocity = new THREE.Vector3(
        (Math.random() - 0.5) * 0.5,
        (Math.random() - 0.5) * 0.5,
        (Math.random() - 0.5) * 0.5,
      );
      universeRef.current.createParticle(position, velocity, "nebula");
    }
  }, []);

  // Control functions
  const createExplosion = useCallback(
    (type: ParticleType = "star", count: number = 50) => {
      if (!universeRef.current) return;

      const center = new THREE.Vector3(
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 40,
      );
      universeRef.current.createExplosion(center, count, type);

      // Play appropriate sound
      if (type === "star") {
        sounds.playStarExplosion();
      } else if (type === "plasma") {
        sounds.playPlasmaExplosion();
      }
    },
    [sounds],
  );

  const createGalaxy = useCallback(() => {
    if (!universeRef.current) return;

    const center = new THREE.Vector3(
      (Math.random() - 0.5) * 20,
      (Math.random() - 0.5) * 10,
      (Math.random() - 0.5) * 20,
    );
    universeRef.current.createGalaxy(
      center,
      3 + Math.floor(Math.random() * 3),
      80,
    );
  }, []);

  const addAttractor = useCallback((position?: THREE.Vector3) => {
    if (!universeRef.current) return;

    const attractorPos =
      position ||
      new THREE.Vector3(
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 30,
      );
    universeRef.current.addAttractor(attractorPos);
  }, []);

  const clearUniverse = useCallback(() => {
    if (!universeRef.current) return;
    universeRef.current.clear();
    universeRef.current.clearAttractors();
  }, []);

  const togglePlay = useCallback(() => {
    setUniverseState((prev) => ({ ...prev, isPlaying: !prev.isPlaying }));
  }, []);

  const updateConfig = useCallback((newConfig: Partial<PhysicsConfig>) => {
    setUniverseState((prev) => ({
      ...prev,
      config: { ...prev.config, ...newConfig },
    }));
    if (universeRef.current) {
      universeRef.current.updateConfig(newConfig);
    }
  }, []);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current) return;

      cameraRef.current.aspect = window.innerWidth / window.innerHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Mouse interaction
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (!canvasRef.current) return;

      const rect = canvasRef.current.getBoundingClientRect();
      mouseRef.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouseRef.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    };

    const handleClick = (event: MouseEvent) => {
      if (!cameraRef.current || !universeRef.current) return;

      raycasterRef.current.setFromCamera(mouseRef.current, cameraRef.current);
      const intersectionPoint = new THREE.Vector3();
      raycasterRef.current.ray.at(25, intersectionPoint);

      createExplosion("plasma", 30);
    };

    if (canvasRef.current) {
      canvasRef.current.addEventListener("mousemove", handleMouseMove);
      canvasRef.current.addEventListener("click", handleClick);

      return () => {
        if (canvasRef.current) {
          canvasRef.current.removeEventListener("mousemove", handleMouseMove);
          canvasRef.current.removeEventListener("click", handleClick);
        }
      };
    }
  }, [canvasRef, createExplosion]);

  return {
    universeState,
    initializeScene,
    createExplosion,
    createGalaxy,
    addAttractor,
    clearUniverse,
    togglePlay,
    updateConfig,
    createStarField,
    createNebulaCloud,
  };
}
