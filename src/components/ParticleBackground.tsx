import { useCallback, useEffect, useRef } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import type { Container, Engine } from "tsparticles-engine";

const ParticleBackground = () => {
  const containerRef = useRef<Container | null>(null);
  const rafRef = useRef<number | null>(null);
  const lastRef = useRef<{ x: number; y: number; t: number; initialized: boolean }>({
    x: 0,
    y: 0,
    t: 0,
    initialized: false,
  });
  const latestRef = useRef<{ x: number; y: number; t: number }>({ x: 0, y: 0, t: 0 });

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(async (container?: Container) => {
    containerRef.current = container ?? null;
  }, []);

  useEffect(() => {
    const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

    const applyCursorInfluence = () => {
      rafRef.current = null;

      const container = containerRef.current as any;
      if (!container) return;

      const { x, y, t } = latestRef.current;
      const last = lastRef.current;
      if (!last.initialized) {
        lastRef.current = { x, y, t, initialized: true };
        return;
      }

      const dt = Math.max(8, t - last.t);
      const dx = x - last.x;
      const dy = y - last.y;

      lastRef.current = { x, y, t, initialized: true };

      const dist = Math.hypot(dx, dy);
      const speedPxPerSec = (dist / dt) * 1000;
      const intensity = clamp(speedPxPerSec / 2200, 0, 1);

      // Subtle glow boost
      const glowOpacity = clamp(0.08 + intensity * 0.12, 0.06, 0.22);
      document.documentElement.style.setProperty("--bg-glow-opacity", String(glowOpacity));

      // Dynamic repulse radius (cursor speed → radius)
      const repulseDistance = clamp(130 + intensity * 210, 110, 360);
      const grabDistance = clamp(130 + intensity * 90, 110, 260);

      const opts = container.actualOptions ?? container.options;
      if (opts?.interactivity?.modes?.repulse) opts.interactivity.modes.repulse.distance = repulseDistance;
      if (opts?.interactivity?.modes?.grab) opts.interactivity.modes.grab.distance = grabDistance;

      // Cursor "wind" slightly steers particle velocity in movement direction
      if (dist > 0.5) {
        const dirX = dx / dist;
        const dirY = dy / dist;
        const wind = 0.02 + intensity * 0.12;

        const particles = container.particles?.array;
        if (Array.isArray(particles)) {
          for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            if (p?.velocity) {
              p.velocity.x += dirX * wind;
              p.velocity.y += dirY * wind;
            }
          }
        }
      }
    };

    const onPointerMove = (e: PointerEvent) => {
      latestRef.current = { x: e.clientX, y: e.clientY, t: performance.now() };
      if (rafRef.current == null) rafRef.current = window.requestAnimationFrame(applyCursorInfluence);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      if (rafRef.current != null) window.cancelAnimationFrame(rafRef.current);
      document.documentElement.style.removeProperty("--bg-glow-opacity");
    };
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        background: {
          color: {
            value: "transparent",
          },
        },
        fpsLimit: 60,
        interactivity: {
          detectsOn: "window",
          events: {
            onHover: {
              enable: true,
              mode: ["grab", "repulse"],
            },
          },
          modes: {
            grab: {
              distance: 150,
              links: {
                opacity: 0.5,
              },
            },
            repulse: {
              distance: 160,
              duration: 0.25,
            },
          },
        },
        particles: {
          color: {
            value: ["#00d4ff", "#a855f7", "#06b6d4"],
          },
          links: {
            color: "#00d4ff",
            distance: 150,
            enable: true,
            opacity: 0.1,
            width: 1,
          },
          move: {
            direction: "none",
            enable: true,
            outModes: {
              default: "bounce",
            },
            random: true,
            speed: 0.9,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 1000,
            },
            value: 80,
          },
          opacity: {
            value: { min: 0.1, max: 0.5 },
            animation: {
              enable: true,
              speed: 0.5,
              minimumValue: 0.1,
            },
          },
          shape: {
            type: "circle",
          },
          size: {
            value: { min: 1, max: 3 },
          },
        },
        detectRetina: true,
      }}
      className="particles-container"
    />
  );
};

export default ParticleBackground;
