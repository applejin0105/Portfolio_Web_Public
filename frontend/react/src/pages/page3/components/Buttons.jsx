import React, { useState } from "react";
import { useSound } from "@/hooks/useSound";

import Button_01_S from "@buttons/Button_01_S.png";
import Button_01_US from "@buttons/Button_01_US.png";
import Button_02_S from "@buttons/Button_02_S.png";
import Button_02_US from "@buttons/Button_02_US.png";
import Button_03_S from "@buttons/Button_03_S.png";
import Button_03_US from "@buttons/Button_03_US.png";
import Button_04_S from "@buttons/Button_04_S.png";
import Button_04_US from "@buttons/Button_04_US.png";

import Camera_C from "@logos/Camera_C.png";
import Camera_W from "@logos/Camera_W.png";
import Handle_C from "@logos/Handle_C.png";
import Handle_W from "@logos/Handle_W.png";
import Machine_C from "@logos/Machine_C.png";
import Machine_W from "@logos/Machine_W.png";
import Train_C from "@logos/Train_C.png";
import Train_W from "@logos/Train_W.png";

import ContainerButtons from "@frames/Button_Container.png";
import ButtonHandleRightMain from "@frames/Button_Container_Handle.png";

const BUTTON_DATA = [
  {
    id: 1,
    path: "/page4",
    label: "포트폴리오",
    className: "btn-pos-1",
    textSize: "small",
    icons: { w: Camera_W, c: Camera_C },
    bg: { us: Button_01_US, s: Button_01_S },
  },
  {
    id: 2,
    path: "/page5",
    label: "깃 프로젝트",
    className: "btn-pos-2",
    textSize: "",
    icons: { w: Handle_W, c: Handle_C },
    bg: { us: Button_02_US, s: Button_02_S },
  },
  {
    id: 3,
    path: "/loading-page6",
    label: "게임 플레이",
    className: "btn-pos-3",
    textSize: "x-small",
    icons: { w: Machine_W, c: Machine_C },
    bg: { us: Button_03_US, s: Button_03_S },
  },
  {
    id: 4,
    path: "/page7",
    label: "로드맵",
    className: "btn-pos-4",
    textSize: "",
    icons: { w: Train_W, c: Train_C },
    bg: { us: Button_04_US, s: Button_04_S },
  },
];

const Buttons = ({ onNavigate, className }) => {
  const [activeId, setActiveId] = useState(null);
  const { playSfx } = useSound();

  const handlePress = (id, targetPath) => {
    if (activeId !== null) return;

    playSfx("sfx_confirm");
    setActiveId(id);

    setTimeout(() => {
      setActiveId(null);
      setTimeout(() => {
        if (onNavigate) onNavigate(targetPath);
      }, 100);
    }, 300);
  };

  return (
    <div className={`buttons-container ${className || ""}`}>
      <div className="BG-buttons" />
      <img
        className="container-buttons-bg"
        alt="Container buttons"
        src={ContainerButtons}
      />

      {BUTTON_DATA.map((btn) => (
        <div
          key={btn.id}
          className={`button-item ${btn.className} ${activeId === btn.id ? "active" : ""}`}
          onClick={() => handlePress(btn.id, btn.path)}
          onMouseEnter={() => {
            if (activeId === null) playSfx("sfx_mousehover");
          }}
        >
          <div className="button-state unselected">
            <img className="btn-base" alt="Button US" src={btn.bg.us} />
            <img
              className={`btn-icon icon-${btn.icons.w === Camera_W ? "camera" : btn.icons.w === Handle_W ? "handle" : btn.icons.w === Machine_W ? "machine" : "train"}-w`}
              alt="Icon W"
              src={btn.icons.w}
            />
            <div className={`btn-text ${btn.textSize}`}>{btn.label}</div>
          </div>
          <div className="button-state selected">
            <img className="btn-base" alt="Button S" src={btn.bg.s} />
            <img
              className={`btn-icon icon-${btn.icons.c === Camera_C ? "camera" : btn.icons.c === Handle_C ? "handle" : btn.icons.c === Machine_C ? "machine" : "train"}-c`}
              alt="Icon C"
              src={btn.icons.c}
            />
            <div className={`btn-text highlight ${btn.textSize}`}>
              {btn.label}
            </div>
          </div>
        </div>
      ))}

      <div className="button-handle-right">
        <img
          className="handle-main"
          alt="Button handle right"
          src={ButtonHandleRightMain}
        />
      </div>
    </div>
  );
};

export default Buttons;
