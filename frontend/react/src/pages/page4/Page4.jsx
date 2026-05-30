import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSound } from "@/hooks/useSound";

import "@pageStyles/Page4.css";

import BG_Page4 from "@bg/Page4.png";
import Index from "@frames/Index.png";
import IndexMain from "@frames/IndexMain.png";
import Sub from "@frames/Sub.png";
import Back from "@buttons/Back.png";

import BasicInfo from "./components/BasicInfo";
import Intro from "./components/Intro";
import Reason from "./components/Reason";
import Philosophy from "./components/Philosophy";
import Stack from "./components/Stack";
import Career from "./components/Career";

const SHARED_BGM_KEY = "bgm_main";

const Page4 = () => {
  const navigate = useNavigate();
  const { playSfx, playBgm } = useSound();

  const [activeTab, setActiveTab] = useState("basic");
  const [isExiting, setIsExiting] = useState(false);
  const [contentPhase, setContentPhase] = useState("hidden");
  const [scale] = useState(1);

  const isLocked = useRef(false);

  useEffect(() => {
    playBgm(SHARED_BGM_KEY);

    const entryTimer = setTimeout(() => {
      setContentPhase("enter");
      playSfx("sfx_uidown");

      setTimeout(() => {
        playSfx("sfx_uidown");
      }, 800);
    }, 500);

    return () => clearTimeout(entryTimer);
  }, [playBgm, playSfx]);

  const handleTabClick = (tabName) => {
    if (activeTab === tabName) return;
    playSfx("sfx_confirm");
    setActiveTab(tabName);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "basic":
        return <BasicInfo />;
      case "intro":
        return <Intro />;
      case "reason":
        return <Reason />;
      case "philosophy":
        return <Philosophy />;
      case "stack":
        return <Stack />;
      case "career":
        return <Career />;
      default:
        return null;
    }
  };

  const handleGoBack = () => {
    if (isLocked.current) return;
    isLocked.current = true;

    playSfx("sfx_cancle");
    playSfx("sfx_uiup");

    setIsExiting(true);
    setContentPhase("exit");

    setTimeout(() => {
      playSfx("sfx_uiup");
    }, 300);

    setTimeout(() => {
      navigate("/page3");
    }, 1000);
  };

  return (
    <div className="page-wrapper">
      <div
        className="scalable-wrapper"
        style={{ transform: `scale(${scale})` }}
      >
        <div
          className={`page4-wrapper ${isExiting ? "page-exit" : "page-enter"}`}
        >
          <div className="box-profile-detail">
            <img className="BG-page4" src={BG_Page4} alt="Main Background" />

            <div className="layout">
              <div
                className={`back-button-wrapper ${contentPhase}`}
                onClick={handleGoBack}
                onMouseEnter={() => playSfx("sfx_mousehover")}
              >
                <img className="back-icon-img" src={Back} alt="Back Button" />
              </div>

              <img
                className={`BG-index elem-left ${contentPhase}`}
                alt="Bg index"
                src={Index}
              />
              <img
                className={`BG-main elem-right ${contentPhase}`}
                alt="Bg main"
                src={IndexMain}
              />
              <img
                className={`BG-sub elem-right-delayed ${contentPhase}`}
                alt="Bg sub"
                src={Sub}
              />

              <div className={`content-container ${contentPhase}`}>
                {renderContent()}
              </div>

              {[
                "basic",
                "intro",
                "reason",
                "philosophy",
                "stack",
                "career",
              ].map((tab) => (
                <div
                  key={tab}
                  className={`menu-item text-${tab} ${activeTab === tab ? "active" : ""} ${contentPhase}`}
                  onClick={() => handleTabClick(tab)}
                  onMouseEnter={() => playSfx("sfx_mousehover")}
                >
                  {getTabLabel(tab)}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const getTabLabel = (key) => {
  const map = {
    basic: "기본 정보",
    intro: "자기소개",
    reason: "지원 동기",
    philosophy: "나에게 게임, 그리고 개발이란",
    stack: "기술 스택",
    career: "경력",
  };
  return map[key];
};

export default Page4;
