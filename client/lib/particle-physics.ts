import * as THREE from "three";

export interface Particle {
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  acceleration: THREE.Vector3;
  mass: number;
  size: number;
  color: THREE.Color;
  life: number;
  maxLife: number;
  type: ParticleType;
}

export type ParticleType = "star" | "nebula" | "comet" | "galaxy" | "plasma";

export interface PhysicsConfig {
  gravity: number;
  damping: number;
  attraction: number;
  repulsion: number;
  maxVelocity: number;
  timeScale: number;
}

export class ParticleUniverse {
  private particles: Particle[] = [];
  private config: PhysicsConfig;
  private attractors: THREE.Vector3[] = [];
  private scene: THREE.Scene;
  private geometry: THREE.BufferGeometry;
  private material: THREE.PointsMaterial;
  private points: THREE.Points;
  private positions: Float32Array;
  private colors: Float32Array;
  private sizes: Float32Array;

  constructor(scene: THREE.Scene, config: Partial<PhysicsConfig> = {}) {
    this.scene = scene;
    this.config = {
      gravity: 0.001,
      damping: 0.99,
      attraction: 0.1,
      repulsion: 0.05,
      maxVelocity: 5,
      timeScale: 1,
      ...config,
    };

    this.initializeParticleSystem();
  }

  private initializeParticleSystem() {
    const maxParticles = 2000;
    this.positions = new Float32Array(maxParticles * 3);
    this.colors = new Float32Array(maxParticles * 3);
    this.sizes = new Float32Array(maxParticles);

    this.geometry = new THREE.BufferGeometry();
    this.geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(this.positions, 3),
    );
    this.geometry.setAttribute(
      "color",
      new THREE.BufferAttribute(this.colors, 3),
    );
    this.geometry.setAttribute(
      "size",
      new THREE.BufferAttribute(this.sizes, 1),
    );

    this.material = new THREE.PointsMaterial({
      size: 2,
      sizeAttenuation: true,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });

    this.points = new THREE.Points(this.geometry, this.material);
    this.scene.add(this.points);
  }

  createParticle(
    position: THREE.Vector3,
    velocity: THREE.Vector3,
    type: ParticleType,
    customProps: Partial<Particle> = {},
  ): Particle {
    const typeConfig = this.getParticleTypeConfig(type);

    const particle: Particle = {
      position: position.clone(),
      velocity: velocity.clone(),
      acceleration: new THREE.Vector3(),
      mass: Math.random() * 2 + 0.5,
      size: Math.random() * 3 + 1,
      color: typeConfig.color.clone(),
      life: typeConfig.maxLife,
      maxLife: typeConfig.maxLife,
      type,
      ...customProps,
    };

    this.particles.push(particle);
    return particle;
  }

  private getParticleTypeConfig(type: ParticleType) {
    const configs = {
      star: {
        color: new THREE.Color(0xffffff),
        maxLife: 1000 + Math.random() * 2000,
      },
      nebula: {
        color: new THREE.Color().setHSL(0.8 + Math.random() * 0.2, 0.8, 0.7),
        maxLife: 1500 + Math.random() * 2500,
      },
      comet: {
        color: new THREE.Color().setHSL(0.5 + Math.random() * 0.3, 0.9, 0.8),
        maxLife: 800 + Math.random() * 1200,
      },
      galaxy: {
        color: new THREE.Color().setHSL(0.9 + Math.random() * 0.1, 0.7, 0.6),
        maxLife: 2000 + Math.random() * 3000,
      },
      plasma: {
        color: new THREE.Color().setHSL(0.4 + Math.random() * 0.4, 1.0, 0.7),
        maxLife: 600 + Math.random() * 800,
      },
    };
    return configs[type];
  }

  createExplosion(
    center: THREE.Vector3,
    count: number = 50,
    type: ParticleType = "star",
  ) {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 2;
      const speed = Math.random() * 10 + 5;

      const velocity = new THREE.Vector3(
        Math.cos(angle) * speed,
        Math.sin(angle) * speed,
        (Math.random() - 0.5) * speed,
      );

      const position = new THREE.Vector3(
        center.x + (Math.random() - 0.5) * radius,
        center.y + (Math.random() - 0.5) * radius,
        center.z + (Math.random() - 0.5) * radius,
      );

      this.createParticle(position, velocity, type);
    }
  }

  createGalaxy(
    center: THREE.Vector3,
    arms: number = 3,
    particlesPerArm: number = 100,
  ) {
    const armAngle = (Math.PI * 2) / arms;

    for (let arm = 0; arm < arms; arm++) {
      for (let i = 0; i < particlesPerArm; i++) {
        const t = i / particlesPerArm;
        const radius = t * 30 + Math.random() * 5;
        const angle = arm * armAngle + t * Math.PI * 4 + Math.random() * 0.5;

        const x = center.x + Math.cos(angle) * radius;
        const y = center.y + (Math.random() - 0.5) * 2;
        const z = center.z + Math.sin(angle) * radius;

        const position = new THREE.Vector3(x, y, z);
        const velocity = new THREE.Vector3(
          -Math.sin(angle) * radius * 0.02,
          0,
          Math.cos(angle) * radius * 0.02,
        );

        this.createParticle(position, velocity, "galaxy", {
          mass: 0.1 + t * 0.5,
          size: 1 + t * 2,
        });
      }
    }
  }

  addAttractor(position: THREE.Vector3) {
    this.attractors.push(position.clone());
  }

  removeAttractor(index: number) {
    this.attractors.splice(index, 1);
  }

  clearAttractors() {
    this.attractors = [];
  }

  updateConfig(newConfig: Partial<PhysicsConfig>) {
    this.config = { ...this.config, ...newConfig };
  }

  update(deltaTime: number) {
    const dt = deltaTime * this.config.timeScale;

    // Update particles
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const particle = this.particles[i];

      // Reset acceleration
      particle.acceleration.set(0, 0, 0);

      // Apply gravity from attractors
      this.attractors.forEach((attractor) => {
        const distance = particle.position.distanceTo(attractor);
        if (distance > 0.1) {
          const force = attractor.clone().sub(particle.position);
          force.normalize();
          force.multiplyScalar(
            (this.config.attraction * particle.mass) / (distance * distance),
          );
          particle.acceleration.add(force);
        }
      });

      // Particle-to-particle interactions
      for (let j = 0; j < this.particles.length; j++) {
        if (i === j) continue;

        const other = this.particles[j];
        const distance = particle.position.distanceTo(other.position);

        if (distance > 0.1 && distance < 10) {
          const force = other.position.clone().sub(particle.position);
          force.normalize();

          // Attraction between different types
          if (particle.type !== other.type) {
            force.multiplyScalar(
              (this.config.attraction * 0.1) / (distance * distance),
            );
            particle.acceleration.add(force);
          }

          // Repulsion when too close
          if (distance < 3) {
            force.multiplyScalar(
              -this.config.repulsion / (distance * distance),
            );
            particle.acceleration.add(force);
          }
        }
      }

      // Apply gravity
      particle.acceleration.y -= this.config.gravity;

      // Update velocity and position
      particle.velocity.add(particle.acceleration.clone().multiplyScalar(dt));
      particle.velocity.multiplyScalar(this.config.damping);

      // Limit velocity
      if (particle.velocity.length() > this.config.maxVelocity) {
        particle.velocity.normalize().multiplyScalar(this.config.maxVelocity);
      }

      particle.position.add(particle.velocity.clone().multiplyScalar(dt));

      // Update life
      particle.life -= dt;

      // Remove dead particles
      if (particle.life <= 0) {
        this.particles.splice(i, 1);
      }
    }

    this.updateBuffers();
  }

  private updateBuffers() {
    const particleCount = this.particles.length;

    for (let i = 0; i < particleCount; i++) {
      const particle = this.particles[i];
      const i3 = i * 3;

      // Update positions
      this.positions[i3] = particle.position.x;
      this.positions[i3 + 1] = particle.position.y;
      this.positions[i3 + 2] = particle.position.z;

      // Update colors with life-based alpha
      const alpha = particle.life / particle.maxLife;
      this.colors[i3] = particle.color.r * alpha;
      this.colors[i3 + 1] = particle.color.g * alpha;
      this.colors[i3 + 2] = particle.color.b * alpha;

      // Update sizes
      this.sizes[i] = particle.size * alpha;
    }

    // Clear unused positions
    for (let i = particleCount; i < this.positions.length / 3; i++) {
      const i3 = i * 3;
      this.positions[i3] = 0;
      this.positions[i3 + 1] = 0;
      this.positions[i3 + 2] = 0;
      this.colors[i3] = 0;
      this.colors[i3 + 1] = 0;
      this.colors[i3 + 2] = 0;
      this.sizes[i] = 0;
    }

    this.geometry.attributes.position.needsUpdate = true;
    this.geometry.attributes.color.needsUpdate = true;
    this.geometry.attributes.size.needsUpdate = true;
    this.geometry.setDrawRange(0, particleCount);
  }

  getParticleCount(): number {
    return this.particles.length;
  }

  clear() {
    this.particles = [];
    this.updateBuffers();
  }

  dispose() {
    this.geometry.dispose();
    this.material.dispose();
    this.scene.remove(this.points);
  }
}
