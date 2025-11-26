import React, { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

export default function ParticleBackground() {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full -z-40 pointer-events-none">
      <Particles
        id="galaxy-starfield"
        init={particlesInit}
        options={{
          fullScreen: { enable: false },

          particles: {
            number: { value: 350, density: { enable: true, area: 900 } },

            color: { value: "#ffffff" },

            opacity: {
              value: 0.9,
              random: true,
              animation: { enable: true, speed: 0.6 },
            },

            size: { value: { min: 0.5, max: 2 } },

            move: { enable: true, speed: 0.15 },
          },

          background: { color: "transparent" },
        }}
        style={{
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  );
}
