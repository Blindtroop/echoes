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
          number: { value: 100, density: { enable: true, area: 400 } },
          color: { value: "#ffffff" },
          shape: { type: "circle" },
          opacity: { value: 0.5 },
          size: { value: { min: 1, max: 2 } },
          links: {
            enable: false,
            distance: 250,
            color: "#888888",
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
          modes: { repulse: { distance: 50 }, push: { quantity: 1 } },
        },
      }}
    />
  );
};

export default ParticlesBackground;
