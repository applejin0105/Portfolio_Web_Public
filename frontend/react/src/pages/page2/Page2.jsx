import React, { useEffect, useCallback } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import Curriculum_Vitae from "@logos/Curriculum_Vitae.png";
import "@pageStyles/Page2.css";
import { useSound } from "@/hooks/useSound";

const BGM_KEY = "bgm_loading";

const Page2 = ({ progress }) => {
  const { playBgm, stopBgm } = useSound();

  useEffect(() => {
    playBgm(BGM_KEY);
    return () => {
      stopBgm(BGM_KEY);
    };
  }, [playBgm, stopBgm]);

  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  const particlesOptions = {
    fullScreen: { enable: false },
    fpsLimit: 60,
    particles: {
      number: { value: 30, density: { enable: true, area: 800 } },
      color: { value: ["#00aaff", "#ffffff"] },
      shape: { type: "circle" },
      opacity: {
        value: { min: 0.1, max: 0.5 },
        animation: { enable: true, speed: 0.5, sync: false },
      },
      size: { value: { min: 1, max: 3 } },
      move: {
        enable: true,
        speed: 0.8,
        direction: "none",
        random: true,
        outModes: "out",
      },
    },
  };

  return (
    <div className="page-wrapper page-enter">
      <Particles
        id="tsparticles"
        className="particles-canvas"
        init={particlesInit}
        options={particlesOptions}
      />

      <div className="icon-effect-container">
        <img
          className="icon haze-effect"
          alt="Loading Icon"
          src={Curriculum_Vitae}
        />
      </div>

      <div className="loading-bar-container">
        <div className="loading-bar-track">
          <div className="loading-bar-fill" style={{ width: `${progress}%` }} />
        </div>
        <div className="loading-text">LOADING... {Math.round(progress)}%</div>
      </div>
    </div>
  );
};

export default Page2;
