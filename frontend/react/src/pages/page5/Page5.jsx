/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSound } from "@/hooks/useSound";
import { PROJECT_DATA } from "@data/ProjectData";
import ProjectDetail from "./components/ProjectDetail";

import "@styles/pages/Page5.css";

import BG_Page5 from "@bg/Page5.png";
import Back from "@buttons/Back.png";
import ProjectContainer from "@frames/ProjectContainer.png";

const BGM_KEY = "bgm_main";

const CARD_WIDTH = 508;
const CARD_GAP = 100;
const MOVE_DISTANCE = CARD_WIDTH + CARD_GAP;
const VISIBLE_COUNT = 3;
const START_OFFSET = 98;

const Page5 = () => {
  const navigate = useNavigate();
  const { playSfx, playBgm } = useSound();

  const [selectedProject, setSelectedProject] = useState(null);
  const [scale] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [isExiting, setIsExiting] = useState(false);
  const [contentPhase, setContentPhase] = useState("hidden");

  const projectList = Object.values(PROJECT_DATA);
  const maxIndex = Math.max(0, projectList.length - VISIBLE_COUNT);

  useEffect(() => {
    playBgm(BGM_KEY);

    const entryTimer = setTimeout(() => {
      setContentPhase("enter");
      playSfx("sfx_uidown");
    }, 500);

    return () => clearTimeout(entryTimer);
  }, [playBgm, playSfx]);

  useEffect(() => {
    const handleWheel = (e) => {
      if (selectedProject) return;
      if (Math.abs(e.deltaY) > 30) {
        if (e.deltaY > 0) {
          setCurrentIndex((prev) => {
            if (prev < maxIndex) playSfx("sfx_mousehover");
            return Math.min(prev + 1, maxIndex);
          });
        } else {
          setCurrentIndex((prev) => {
            if (prev > 0) playSfx("sfx_mousehover");
            return Math.max(prev - 1, 0);
          });
        }
      }
    };
    window.addEventListener("wheel", handleWheel);
    return () => window.removeEventListener("wheel", handleWheel);
  }, [maxIndex, selectedProject, playSfx]);

  const handleCardClick = (project) => {
    playSfx("sfx_confirm");
    setSelectedProject(project);
  };

  const handleCloseDetail = () => {
    playSfx("sfx_cancle");
    setSelectedProject(null);
  };

  const handleGoBack = () => {
    if (isExiting) return;

    playSfx("sfx_cancle");
    playSfx("sfx_uiup");

    setIsExiting(true);
    setContentPhase("exit");

    setTimeout(() => {
      navigate("/page3");
    }, 1000);
  };

  const handleNavClick = (direction) => {
    playSfx("sfx_click");
    if (direction === "left") {
      setCurrentIndex((prev) => Math.max(prev - 1, 0));
    } else {
      setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
    }
  };

  return (
    <div className="page-wrapper">
      <div
        className="scalable-wrapper"
        style={{ transform: `scale(${scale})` }}
      >
        <div
          className={`page5-content ${isExiting ? "page-exit" : "page-enter"}`}
        >
          <img className="bg-unity-projects" alt="Background" src={BG_Page5} />

          <div
            className={`btn-back-wrapper ${contentPhase}`}
            onClick={handleGoBack}
            onMouseEnter={() => playSfx("sfx_mousehover")}
          >
            <img className="btn-back-img" alt="Back" src={Back} />
          </div>

          {currentIndex > 0 && (
            <div
              className={`nav-arrow left-arrow ${contentPhase}`}
              onClick={() => handleNavClick("left")}
              onMouseEnter={() => playSfx("sfx_mousehover")}
            >
              ◀
            </div>
          )}

          {currentIndex < maxIndex && (
            <div
              className={`nav-arrow right-arrow ${contentPhase}`}
              onClick={() => handleNavClick("right")}
              onMouseEnter={() => playSfx("sfx_mousehover")}
            >
              ▶
            </div>
          )}

          <div className={`carousel-viewport ${contentPhase}`}>
            <div
              className="carousel-track"
              style={{
                transform: `translateX(calc(${START_OFFSET}px - ${currentIndex * MOVE_DISTANCE}px))`,
              }}
            >
              {projectList.map((project, index) => (
                <div
                  key={`${project.id}-${index}`}
                  className="project-card"
                  onClick={() => handleCardClick(project)}
                  onMouseEnter={() => playSfx("sfx_mousehover")}
                >
                  <img
                    className="card-frame"
                    alt="Frame"
                    src={ProjectContainer}
                  />
                  <div className="card-content">
                    <div className="card-thumbnail">
                      {project.decoIcon && (
                        <div className="deco-icon-wrapper">
                          <img
                            className={`deco-icon ${project.decoClass || ""}`}
                            alt="Deco"
                            src={project.decoIcon}
                          />
                        </div>
                      )}
                    </div>
                    <div
                      className={`card-title ${project.id === "Cultist" ? "title-large" : ""}`}
                    >
                      {project.name}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {selectedProject && (
            <div className="project-detail-overlay">
              <ProjectDetail
                project={selectedProject}
                onClose={handleCloseDetail}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page5;
