import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSound } from "@/hooks/useSound";
import { preloadAssets } from "@/utils/resourceLoader";
import { PAGE_ASSETS } from "@/data/assetsMap";

import Buttons from "./components/Buttons";
import UserInfo from "./components/UserInfo";
import ProfileCard from "./components/ProfileCard";
import ClickableDeco from "./components/ClickableDeco";
import bgImage from "@bg/Page3.png";
import "@pageStyles/Page3.css";

const BGM_KEY = "bgm_main";

const Page3 = () => {
  const navigate = useNavigate();
  const { playSfx, playBgm, stopBgm } = useSound();

  const [scale] = useState(1);
  const [showToast, setShowToast] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    playBgm(BGM_KEY);

    const entryTimer = setTimeout(() => {
      playSfx("sfx_uidown");
    }, 1000);

    const loadFutureAssets = async () => {
      setTimeout(async () => {
        const futureAssets = [
          ...(PAGE_ASSETS.Page4 || []),
          ...(PAGE_ASSETS.Page5 || []),
        ];
        const images = futureAssets.filter((src) =>
          src?.match(/\.(png|gif)$/i),
        );
        const sounds = futureAssets.filter((src) => src?.match(/\.(wav)$/i));
        try {
          await preloadAssets(images, sounds);
        } catch (error) {
          console.warn(error);
        }
      }, 1000);
    };
    loadFutureAssets();

    return () => {
      clearTimeout(entryTimer);
    };
  }, [playSfx, playBgm, stopBgm]);

  const handlePageTransition = (targetPath) => {
    if (isExiting) return;

    setTimeout(() => {
      playSfx("sfx_uiup");
      setIsExiting(true);

      if (targetPath === "/page6") {
        stopBgm(1000);
      }

      setTimeout(() => {
        if (targetPath === "/page6") {
          navigate("/page2", {
            state: { target: "/page6" },
          });
        } else {
          navigate(targetPath);
        }
      }, 1000);
    }, 1000);
  };

  const handleCopySuccess = () => {
    setShowToast(true);
    playSfx("sfx_dding");
    setTimeout(() => setShowToast(false), 2000);
  };

  const exitClass = isExiting ? "exit" : "";

  return (
    <div className="page-wrapper">
      <div
        className="scalable-wrapper"
        style={{ transform: `scale(${scale})` }}
      >
        <div className="element-page3">
          <img
            className={`BG ${exitClass}`}
            src={bgImage}
            alt="Main Background"
          />

          <ProfileCard onCopy={handleCopySuccess} className={exitClass} />
          <UserInfo onCopy={handleCopySuccess} className={exitClass} />

          <Buttons onNavigate={handlePageTransition} className={exitClass} />

          <ClickableDeco className={exitClass} />

          <div className={`toast-message ${showToast ? "show" : ""}`}>
            클립보드에 복사되었습니다
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page3;
