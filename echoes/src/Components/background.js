import React, { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

const ParticlesBackground = () => {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        background: { color: "#000" },
        particles: {
          number: { value: 50, density: { enable: true, area: 500 } },
          color: { value: "#ffffff" },
          shape: { type: "square" },
          opacity: { value: 0.5 },
          size: { value: { min: 1, max: 3 } },
          links: {
            enable: true,
            distance: 250,
            color: "#888",
            opacity: 0.5,
            width: 1,
          },
          move: { enable: true, speed: 0.5, outModes: { default: "bounce" } },
        },
        interactivity: {
          events: {
            onHover: { enable: true, mode: "repulse" },
            onClick: { enable: true, mode: "push" },
          },
          modes: { repulse: { distance: 100 }, push: { quantity: 4 } },
        },
      }}
    />
  );
};

export default ParticlesBackground;
