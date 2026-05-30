import React, { useRef, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { SCORE_DESCRIPTIONS } from "@data/playedGamesData";

import GameFrame from "@frames/GameContainer.png";

const GameContainer = ({ gameData, index, totalCount }) => {
  const { name, thumbnail, comment, scores, playTime, steamLink } = gameData;
  const commentRef = useRef(null);

  const [tooltipText, setTooltipText] = useState(null);
  const tooltipRef = useRef(null);

  const renderStars = (score) => {
    const validScore = typeof score === "number" ? score : 0;
    const filledCount = Math.round(Math.max(0, Math.min(5, validScore)));
    const emptyCount = 5 - filledCount;
    return "★".repeat(filledCount) + "☆".repeat(emptyCount);
  };

  const handleThumbnailClick = (e) => {
    e.stopPropagation();
    if (steamLink) window.open(steamLink, "_blank");
  };

  useEffect(() => {
    const element = commentRef.current;
    if (!element) return;
    const handleWheel = (e) => {
      if (element.scrollHeight > element.clientHeight) {
        e.stopPropagation();
        if (
          (element.scrollTop === 0 && e.deltaY < 0) ||
          (element.scrollTop + element.clientHeight === element.scrollHeight &&
            e.deltaY > 0)
        ) {
          e.preventDefault();
        }
      }
    };
    element.addEventListener("wheel", handleWheel, { passive: false });
    return () => element.removeEventListener("wheel", handleWheel);
  }, []);

  const handleMouseMove = (e) => {
    if (tooltipRef.current) {
      const tooltip = tooltipRef.current;
      const offset = 20;
      const tooltipWidth = tooltip.offsetWidth;
      const windowWidth = window.innerWidth;

      let leftPos = e.clientX + offset;

      if (leftPos + tooltipWidth > windowWidth) {
        leftPos = e.clientX - offset - tooltipWidth;
      }

      tooltip.style.left = `${leftPos}px`;
      tooltip.style.top = `${e.clientY - 50}px`;
    }
  };

  return (
    <>
      <div className="box" onMouseMove={handleMouseMove}>
        <div className="game-container">
          <img className="BG-container" alt="Bg container" src={GameFrame} />

          <div
            className="thumbnail-wrapper"
            onClick={handleThumbnailClick}
            title="스팀 페이지 이동"
          >
            <img className="thumbnail" alt="Thumbnail" src={thumbnail} />
          </div>

          <div className="index-indicator">
            {index + 1} / {totalCount}
          </div>

          <div className="comment" ref={commentRef}>
            {Array.isArray(comment)
              ? comment.map((item, i) => {
                  if (item.type === "image") {
                    return (
                      <img
                        key={i}
                        src={item.content}
                        alt="Comment Detail"
                        className="comment-img"
                      />
                    );
                  } else {
                    return (
                      <span key={i} className="comment-text">
                        {item.content}
                      </span>
                    );
                  }
                })
              : comment}
          </div>

          <div className="scores">
            <div className="game-title-text">{name}</div>

            <ScoreRow
              className="originality"
              label="Originality"
              score={renderStars(scores?.originality)}
              tooltipKey="originality"
              setTooltip={setTooltipText}
            />
            <ScoreRow
              className="developers-soul"
              label="Developer’s Soul"
              score={renderStars(scores?.soul)}
              tooltipKey="soul"
              setTooltip={setTooltipText}
            />
            <ScoreRow
              className="uniqueness"
              label="Uniqueness"
              score={renderStars(scores?.uniqueness)}
              tooltipKey="uniqueness"
              setTooltip={setTooltipText}
            />
            <ScoreRow
              className="atmosphere-vibe"
              label="Atmosphere & Vibe"
              score={renderStars(scores?.vibe)}
              tooltipKey="vibe"
              setTooltip={setTooltipText}
            />
            <ScoreRow
              className="immersion-density"
              label="Immersion Density"
              score={renderStars(scores?.immersion)}
              tooltipKey="immersion"
              setTooltip={setTooltipText}
            />
            <ScoreRow
              className="memorable-impact"
              label="Memorable Impact"
              score={renderStars(scores?.impact)}
              tooltipKey="impact"
              setTooltip={setTooltipText}
            />

            <div className="score-row play-time">
              <div className="label">Play Time</div>
              <div className="play-time-h">{playTime}</div>
            </div>
          </div>
        </div>
      </div>

      {tooltipText &&
        createPortal(
          <div className="mouse-tooltip" ref={tooltipRef}>
            {tooltipText}
          </div>,
          document.body,
        )}
    </>
  );
};

const ScoreRow = ({ className, label, score, tooltipKey, setTooltip }) => {
  return (
    <div
      className={`score-row ${className}`}
      onMouseEnter={() => setTooltip(SCORE_DESCRIPTIONS[tooltipKey])}
      onMouseLeave={() => setTooltip(null)}
    >
      <div className="label">{label}</div>
      <div className="score">{score}</div>
    </div>
  );
};

export default GameContainer;
