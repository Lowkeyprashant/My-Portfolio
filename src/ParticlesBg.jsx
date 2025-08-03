import React from 'react';
import Particles from 'react-tsparticles';

const ParticlesBg = () => {
  const particlesInit = (main) => {
    // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
  };

  const particlesLoaded = (container) => {
    // container is the particles instance, you can use it to access its properties
  };

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        fps_limit: 60,
        interactivity: {
          events: {
            onClick: { enable: true, mode: 'push' },
            onHover: {
              enable: true,
              mode: 'repulse',
              parallax: { enable: false, force: 2, smooth: 10 }
            },
            resize: true
          },
          modes: {
            push: { quantity: 4 },
            repulse: { distance: 200, duration: 0.4 }
          }
        },
        particles: {
          number: { value: 80, density: { enable: true, value_area: 800 } },
          color: { value: '#ffffff' },
          shape: {
            type: 'circle',
            stroke: { width: 0, color: '#000000' },
            polygon: { nb_sides: 5 }
          },
          opacity: {
            value: 0.5,
            random: false,
            anim: { enable: false, speed: 1, opacity_min: 0.1, sync: false }
          },
          size: {
            value: 3,
            random: true,
            anim: { enable: false, speed: 40, size_min: 0.1, sync: false }
          },
          line_linked: {
            enable: true,
            distance: 150,
            color: '#ffffff',
            opacity: 0.4,
            width: 1
          },
          move: {
            enable: true,
            speed: 6,
            direction: 'none',
            random: false,
            straight: false,
            out_mode: 'out',
            bounce: false,
            attract: { enable: false, rotateX: 600, rotateY: 1200 }
          }
        },
        retina_detect: true
      }}
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}
    />
  );
};

export default ParticlesBg;