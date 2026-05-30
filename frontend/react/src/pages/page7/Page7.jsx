import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { useSound } from "@/hooks/useSound";

import "@styles/pages/Page7.css";
import { INTERACTIVE_TEXTS } from "@/data/roadmapData";

import Road from "@etc/Road.png";
import Back from "@buttons/Back.png";

const BGM_KEY = "bgm_page7";

const Page7 = () => {
  const [scale] = useState(1);
  const [modalData, setModalData] = useState(null);
  const [isExiting, setIsExiting] = useState(false);
  const [contentPhase, setContentPhase] = useState("hidden");

  const navigate = useNavigate();
  const { playSfx, playBgm, stopBgm } = useSound();

  const [previewImage, setPreviewImage] = useState(null);

  const modalContentRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && previewImage) {
        setPreviewImage(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [previewImage]);

  useEffect(() => {
    playBgm(BGM_KEY);

    const entryTimer = setTimeout(() => {
      setContentPhase("enter");
      playSfx("sfx_uidown");
    }, 500);

    return () => clearTimeout(entryTimer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!modalData || !modalContentRef.current) return;

    const el = modalContentRef.current;
    el.scrollTop = 0;

    let currentScroll = 0;
    let targetScroll = 0;
    let isAnimating = false;
    let animationFrameId;
    const ease = 0.08;

    const render = () => {
      if (!el) return;
      if (Math.abs(targetScroll - currentScroll) < 0.5) {
        currentScroll = targetScroll;
        el.scrollTop = currentScroll;
        isAnimating = false;
      } else {
        currentScroll += (targetScroll - currentScroll) * ease;
        el.scrollTop = currentScroll;
        animationFrameId = requestAnimationFrame(render);
      }
    };

    const handleWheel = (e) => {
      e.preventDefault();
      e.stopPropagation();
      const maxScroll = el.scrollHeight - el.clientHeight;
      targetScroll += e.deltaY * 1.5;
      targetScroll = Math.max(0, Math.min(targetScroll, maxScroll));
      if (!isAnimating) {
        isAnimating = true;
        currentScroll = el.scrollTop;
        render();
      }
    };

    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      el.removeEventListener("wheel", handleWheel);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [modalData]);

  const handleGoBack = () => {
    if (isExiting) return;

    playSfx("sfx_cancle");
    playSfx("sfx_uiup");

    stopBgm(1500);

    setIsExiting(true);
    setContentPhase("exit");

    setTimeout(() => {
      navigate("/page3");
    }, 1500);
  };

  const openModal = (data) => {
    playSfx("sfx_confirm");
    setModalData(data);
  };

  const closeModal = () => {
    playSfx("sfx_cancle");
    setModalData(null);
  };

  return (
    <div className="page-wrapper">
      <div
        className="scalable-wrapper"
        style={{ transform: `scale(${scale})` }}
      >
        <div
          className={`page7-content ${isExiting ? "page-exit" : "page-enter"}`}
        >
          <div className="fade-in-text title-future">FACING THE FUTURE</div>
          <div className="fade-in-text title-plan">BUILD THE PLAN</div>

          <div className="road-wrapper">
            <img className="road-element" alt="Road" src={Road} />
          </div>

          {INTERACTIVE_TEXTS.map((item) => (
            <div
              key={item.id}
              className="text-position-wrapper"
              style={{ top: item.top, left: item.left }}
            >
              <div
                className="interactive-text"
                onClick={() => openModal(item)}
                onMouseEnter={() => playSfx("sfx_mousehover")}
              >
                {item.label}
              </div>
            </div>
          ))}

          <div
            className={`btn-back-wrapper ${contentPhase}`}
            onClick={handleGoBack}
            onMouseEnter={() => playSfx("sfx_mousehover")}
          >
            <img className="btn-back" alt="Back" src={Back} />
          </div>

          {modalData && (
            <div className="modal-overlay" onClick={closeModal}>
              <div
                className="modal-content"
                onClick={(e) => e.stopPropagation()}
              >
                <h2 className="modal-title">{modalData.modalTitle}</h2>

                <div className="modal-desc-wrapper" ref={modalContentRef}>
                  {modalData.contentImage && (
                    <div className="content-image-wrapper">
                      <img
                        src={modalData.contentImage}
                        alt="Content Visual"
                        className="modal-content-image clickable-image"
                        onClick={(e) => {
                          e.stopPropagation();
                          setPreviewImage(modalData.contentImage);
                        }}
                      />
                    </div>
                  )}
                  <div className="markdown-body">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      rehypePlugins={[rehypeRaw]}
                      components={{
                        a: ({ href, children }) => (
                          <a
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {children}
                          </a>
                        ),
                        img: ({ src, alt }) => (
                          <img
                            src={src}
                            alt={alt}
                            className="clickable-image"
                            onClick={(e) => {
                              e.stopPropagation();
                              setPreviewImage(src);
                            }}
                          />
                        ),
                      }}
                    >
                      {modalData.modalContent}
                    </ReactMarkdown>
                  </div>
                </div>

                <button
                  className="modal-close-btn"
                  onClick={closeModal}
                  onMouseEnter={() => playSfx("sfx_mousehover")}
                >
                  닫기
                </button>
              </div>
            </div>
          )}
          {previewImage &&
            createPortal(
              <div
                className="lightbox-overlay"
                onClick={() => setPreviewImage(null)}
              >
                <div
                  className="lightbox-content"
                  onClick={(e) => e.stopPropagation()}
                >
                  <img
                    src={previewImage}
                    alt="Full Screen"
                    className="lightbox-image"
                  />
                  <button
                    className="lightbox-close-btn"
                    onClick={() => setPreviewImage(null)}
                  >
                    X
                  </button>
                  <p className="lightbox-hint">ESC 또는 배경을 클릭하여 닫기</p>
                </div>
              </div>,
              document.body,
            )}
        </div>
      </div>
    </div>
  );
};

export default Page7;
