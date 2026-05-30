import React, { useState, useEffect, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSound } from "@/hooks/useSound";
import "@styles/pages/Page6.css";

import GameContainer from "./components/GameContainer";
import { PLAYED_GAMES_DETAILS } from "@data/playedGamesData";

import BG_Page6 from "@bg/Page6.png";
import Back from "@buttons/Back.png";
import BtnNext from "@buttons/Next.png";
import BtnPrev from "@buttons/Prev.png";

const BGM_KEY = "bgm_page6";

const CARD_WIDTH = 1702;
const GAP = 220;
const MOVE_DISTANCE = CARD_WIDTH + GAP;
const START_OFFSET = 110;

const PREFERRED_ORDER = [
  "Limbus Company",
  "Lobotomy Corporation",
  "Library Of Ruina",
  "Ristar",
];

const Page6 = () => {
  const [scale] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [isExiting, setIsExiting] = useState(false);
  const [contentPhase, setContentPhase] = useState("hidden");

  const navigate = useNavigate();
  const { playSfx, playBgm } = useSound();
  const isScrolling = useRef(false);

  useEffect(() => {
    playBgm(BGM_KEY);

    const entryTimer = setTimeout(() => {
      setContentPhase("enter");
      playSfx("sfx_uidown");
    }, 500);

    return () => clearTimeout(entryTimer);
  }, [playBgm, playSfx]);

  const gameList = useMemo(() => {
    const imagesGlob = import.meta.glob(
      "../../assets/images/thumbnails/*.{png,gif}",
      { eager: true },
    );

    let loadedImages = Object.keys(imagesGlob).map((filePath) => {
      const fileNameWithExt = filePath.split("/").pop();
      const rawName = fileNameWithExt.replace(/\.[^/.]+$/, "");
      const gameName = rawName.replaceAll("_", " ");

      return {
        name: gameName,
        thumbnail: imagesGlob[filePath].default,
      };
    });

    loadedImages.sort((a, b) => {
      const indexA = PREFERRED_ORDER.indexOf(a.name);
      const indexB = PREFERRED_ORDER.indexOf(b.name);

      if (indexA !== -1 && indexB !== -1) return indexA - indexB;
      if (indexA !== -1) return -1;
      if (indexB !== -1) return 1;

      return a.name.localeCompare(b.name);
    });

    return loadedImages
      .map((imgData) => {
        const details = PLAYED_GAMES_DETAILS[imgData.name];
        if (!details) return null;
        return {
          ...imgData,
          ...details,
          comment: details.comment || "코멘트가 없습니다.",
          scores: details.scores || {},
          playTime: details.playTime || "0h",
        };
      })
      .filter(Boolean);
  }, []);

  const maxIndex = Math.max(0, gameList.length - 1);

  const goToPrev = () => {
    playSfx("sfx_click");
    setCurrentIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
  };

  const goToNext = () => {
    playSfx("sfx_click");
    setCurrentIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
  };

  useEffect(() => {
    const handleWheel = (e) => {
      if (e.target.closest(".comment")) return;

      if (isScrolling.current) return;

      if (Math.abs(e.deltaY) > 30) {
        isScrolling.current = true;
        playSfx("sfx_mousehover");

        if (e.deltaY > 0) {
          setCurrentIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
        } else {
          setCurrentIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
        }

        setTimeout(() => {
          isScrolling.current = false;
        }, 500);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [maxIndex, playSfx]);

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

  return (
    <div className="page-wrapper">
      <div
        className="scalable-wrapper"
        style={{ transform: `scale(${scale})` }}
      >
        <div
          className={`element-playedgame ${isExiting ? "page-exit" : "page-enter"}`}
        >
          <img className="BG-playedgame" alt="Bg playedgame" src={BG_Page6} />

          <button
            className={`btn-back-wrapper ${contentPhase}`}
            onClick={handleGoBack}
            onMouseEnter={() => playSfx("sfx_mousehover")}
          >
            <img className="btn-back" alt="Btn back" src={Back} />
          </button>

          {gameList.length > 1 && (
            <>
              <img
                className="btn-prev"
                alt="Btn prev"
                src={BtnPrev}
                onClick={goToPrev}
              />
              <img
                className="btn-next"
                alt="Btn next"
                src={BtnNext}
                onClick={goToNext}
              />
            </>
          )}

          <div className="game-carousel-viewport">
            <div
              className="game-carousel-track"
              style={{
                transform: `translateX(calc(${START_OFFSET}px - ${currentIndex * MOVE_DISTANCE}px))`,
                transition: "transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)",
              }}
            >
              {gameList.map((game, index) => (
                <GameContainer
                  key={game.name}
                  gameData={game}
                  index={index}
                  totalCount={gameList.length}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page6;
