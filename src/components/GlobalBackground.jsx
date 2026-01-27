import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

/**
 * Global cursor-reactive animated background.
 * - fixed full viewport, z-index:-1
 * - smooth RAF damping
 * - throttled pointer tracking
 * - pauses when tab is inactive
 */
export default function GlobalBackground() {
  const containerRef = useRef(null);
  const rafRef = useRef(null);
  const visibleRef = useRef(true);

  const pointerRef = useRef({ x: 0, y: 0, t: 0, has: false });
  const lastRef = useRef({ x: 0, y: 0, t: 0, has: false });

  const targetRef = useRef({
    windX: 0,
    windY: 0,
    speedBoost: 0,
    repulse: 160,
    glow: 0.12,
  });
  const currentRef = useRef({
    windX: 0,
    windY: 0,
    speedBoost: 0,
    repulse: 160,
    glow: 0.12,
  });

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    containerRef.current = container ?? null;
  }, []);

  const options = useMemo(
    () => ({
      background: { color: { value: "transparent" } },
      fpsLimit: 60,
      detectRetina: true,
      interactivity: {
        detectsOn: "window",
        events: {
          onHover: { enable: true, mode: ["repulse"] },
          resize: true,
        },
        modes: {
          repulse: { distance: 160, duration: 0.25 },
        },
      },
      particles: {
        number: { value: 55, density: { enable: true, area: 1100 } },
        color: { value: ["#63e6ff", "#b69bff"] },
        opacity: { value: { min: 0.08, max: 0.32 } },
        size: { value: { min: 1, max: 2.5 } },
        links: {
          enable: true,
          distance: 160,
          opacity: 0.07,
          width: 1,
          color: "#7adfff",
        },
        move: {
          enable: true,
          speed: 0.6,
          random: true,
          direction: "none",
          outModes: { default: "bounce" },
        },
      },
    }),
    [],
  );

  useEffect(() => {
    const clamp = (v, min, max) => Math.min(max, Math.max(min, v));
    const lerp = (a, b, t) => a + (b - a) * t;

    const setGlow = (value) => {
      // drive CSS overlay intensity without re-render
      document.documentElement.style.setProperty("--bg-glow-opacity", String(value));
    };

    const updateTargetsFromPointer = () => {
      const p = pointerRef.current;
      if (!p.has) return;

      const last = lastRef.current;
      if (!last.has) {
        lastRef.current = { ...p, has: true };
        return;
      }

      const dt = Math.max(8, p.t - last.t);
      const dx = p.x - last.x;
      const dy = p.y - last.y;
      lastRef.current = { ...p, has: true };

      const dist = Math.hypot(dx, dy);
      const speedPxPerSec = (dist / dt) * 1000;
      const intensity = clamp(speedPxPerSec / 2400, 0, 1);

      const dirX = dist > 0.001 ? dx / dist : 0;
      const dirY = dist > 0.001 ? dy / dist : 0;

      // Particle direction influence ("wind")
      targetRef.current.windX = dirX;
      targetRef.current.windY = dirY;

      // Particle speed influence
      targetRef.current.speedBoost = intensity;

      // Repulsion radius influence
      targetRef.current.repulse = clamp(140 + intensity * 220, 120, 380);

      // Glow intensity influence
      // Dark theme baseline: keep subtle, no flashing
      targetRef.current.glow = clamp(0.10 + intensity * 0.14, 0.08, 0.26);
    };

    const tick = () => {
      rafRef.current = null;
      if (!visibleRef.current) return;

      updateTargetsFromPointer();

      // Smooth damping
      const d = 0.08;
      const cur = currentRef.current;
      const tgt = targetRef.current;

      cur.windX = lerp(cur.windX, tgt.windX, d);
      cur.windY = lerp(cur.windY, tgt.windY, d);
      cur.speedBoost = lerp(cur.speedBoost, tgt.speedBoost, d);
      cur.repulse = lerp(cur.repulse, tgt.repulse, d);
      cur.glow = lerp(cur.glow, tgt.glow, d);

      setGlow(cur.glow);

      const container = containerRef.current;
      if (container) {
        // Update repulsion distance smoothly
        const opts = container.actualOptions ?? container.options;
        if (opts?.interactivity?.modes?.repulse) {
          opts.interactivity.modes.repulse.distance = cur.repulse;
        }

        // Apply gentle wind + speed to current particle velocities
        const windStrength = 0.03 + cur.speedBoost * 0.14;
        const speedMul = 1 + cur.speedBoost * 0.015;
        const particles = container.particles?.array;

        if (Array.isArray(particles)) {
          for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            if (!p?.velocity) continue;

            p.velocity.x = p.velocity.x * speedMul + cur.windX * windStrength;
            p.velocity.y = p.velocity.y * speedMul + cur.windY * windStrength;

            // Clamp max speed so it stays soft
            const vmax = 1.8 + cur.speedBoost * 0.9;
            const v = Math.hypot(p.velocity.x, p.velocity.y);
            if (v > vmax) {
              const s = vmax / v;
              p.velocity.x *= s;
              p.velocity.y *= s;
            }
          }
        }
      }
    };

    // Throttle pointer events → update ref; work happens in RAF
    const onPointerMove = (e) => {
      pointerRef.current = { x: e.clientX, y: e.clientY, t: performance.now(), has: true };
      if (rafRef.current == null) rafRef.current = window.requestAnimationFrame(tick);
    };

    const onVisibility = () => {
      const visible = document.visibilityState === "visible";
      visibleRef.current = visible;

      const container = containerRef.current;
      if (container) {
        if (visible) container.play();
        else container.pause();
      }

      if (visible && rafRef.current == null) rafRef.current = window.requestAnimationFrame(tick);
      if (!visible && rafRef.current != null) {
        window.cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);

    // initialize glow
    setGlow(targetRef.current.glow);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("visibilitychange", onVisibility);
      if (rafRef.current != null) window.cancelAnimationFrame(rafRef.current);
      document.documentElement.style.removeProperty("--bg-glow-opacity");
    };
  }, []);

  return (
    <div
      aria-hidden
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -1,
        pointerEvents: "none",
      }}
    >
      {/* subtle gradient overlay (dark, non-flashy) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 70% 55% at 50% 10%, rgba(99,230,255,0.10), transparent 55%), radial-gradient(ellipse 55% 45% at 85% 70%, rgba(182,155,255,0.08), transparent 60%), linear-gradient(180deg, rgba(6,8,20,0.92), rgba(3,4,12,0.92))",
          opacity: mounted ? 1 : 0,
          transition: "opacity 500ms ease",
        }}
      />

      {/* glow layer driven by --bg-glow-opacity */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 60% 45% at 50% 25%, rgba(99,230,255,0.22), transparent 60%), radial-gradient(ellipse 50% 40% at 80% 65%, rgba(182,155,255,0.18), transparent 65%)",
          opacity: "var(--bg-glow-opacity)",
          transition: "opacity 120ms ease",
        }}
      />

      <Particles
        id="global-particles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={options}
        style={{ position: "absolute", inset: 0 }}
      />
    </div>
  );
}

