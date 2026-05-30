import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSound } from "@/hooks/useSound";

import "@pageStyles/Page1.css";

import Trigger_Warning from "@logos/Trigger_Warning.png";
import Test from "@logos/Test.png";
import Word from "@logos/Word.png";
import Touch_To_Start from "@buttons/Touch_To_Start.png";

const Page1 = () => {
  const navigate = useNavigate();
  const { playSfx } = useSound();

  const [isExiting, setIsExiting] = useState(false);

  const isLocked = useRef(false);

  const tech_left = [
    "C++",
    "C#",
    "Linux",
    "Object Pascal",
  ];
  const tech_right = [
    "Unity",
    "Unreal",
    "Delphi",
    "WPF",
    "React",
  ];

  useEffect(() => {
    playSfx("sfx_intro");
  }, []);

  const handleNextPage = () => {
    if (isLocked.current) return;

    isLocked.current = true;

    setIsExiting(true);

    playSfx("sfx_confirm");

    const startSounds = ["sfx_start1", "sfx_start2", "sfx_start3"];
    const randomSound =
      startSounds[Math.floor(Math.random() * startSounds.length)];
    playSfx(randomSound);

    setTimeout(() => {
      navigate("/loading");
    }, 1000);
  };

  return (
    <div
      className={`page-wrapper ${isExiting ? "page-fade-out" : "page-fade-in"}`}
    >
      <div className="element-warning">
        <div className="Trigger-Warning">
          <img className="Test-Warning" alt="Test Warning" src={Test} />
          <img className="Word-Warning" alt="Word Warning" src={Word} />
        </div>

        <div className="tech-stack-container">
          <div className="tech-column left">
            {tech_left.map((tech, index) => (
              <span key={index}>{tech}</span>
            ))}
          </div>

          <div className="tech-column right">
            {tech_right.map((tech, index) => (
              <span key={index}>{tech}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="main-text-container">
        <div className="warning-header">
          <img
            className="warning-icon"
            alt="Warning Icon"
            src={Trigger_Warning}
          />
          <h1 className="warning-title">WARNING</h1>
          <img
            className="warning-icon"
            alt="Warning Icon"
            src={Trigger_Warning}
          />
        </div>

        <div className="warning-body">
          <p className="primary-text">
            <span className="highlight">
              본 홈페이지는 프로젝트문 입사를 위해 제작된 포트폴리오
              홈페이지입니다.
            </span>
            <span>
              홈페이지 제작에 사용된 모든 리소스에 대한 원 저작권은 프로젝트문에
              있습니다.
            </span>
            <span className="emphasis">
              이 홈페이지는 어떠한 경우에도 상업적으로 이용하지 않으며, 오직
              입사 지원을 위한 포트폴리오 용으로만 사용됩니다.
            </span>
            <span>
              또한, 이 홈페이지로 인한 문제가 발생할 경우, 홈페이지 제작자에게
              모든 책임이 있습니다.
            </span>
          </p>

          <p className="secondary-text">
            <span>
              이 홈페이지에는 초보 개발자의 여러 기술 요소를 포함하고 있습니다.
            </span>
            <span>
              상기 명시된 소재는 모두 직접 공부하고, 구현해본 요소이거나
              학습중인 요소입니다.
            </span>
            <span>
              개발자 본인은 이러한 요소들을 학습하고, 탐구하고 거짓없이
              공부하였습니다.
            </span>
          </p>
        </div>

        <img
          className="Touch-To-Start"
          alt="Touch to Start"
          src={Touch_To_Start}
          onClick={handleNextPage}
          style={{ cursor: "pointer" }}
        />
      </div>
    </div>
  );
};

export default Page1;
