import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { useSound } from "@/hooks/useSound";
import { Basic_Info } from "@data/page4Data";

import PDFViewer from "@frames/PDFViewer.png";
import Board from "@frames/Board.png";
import PictureFrame from "@frames/PictureFrame.png";
import MyPhoto from "@etc/MyPhoto.png";
import Ishmael from "@logos/Ishmael.png";

import Bargain from "@etc/Bargain.png";
import Money from "@etc/Money.png";
import Fimally from "@etc/Fimally.png";

const docList = [
  { id: "thesis", title: "졸업논문", file: "/secure_docs/thesis.pdf" },
  { id: "grad", title: "졸업증명서", file: "/secure_docs/graduation.pdf" },
  { id: "army", title: "병적증명서", file: "/secure_docs/military.pdf" },
];

const BasicInfo = () => {
  const { playSfx } = useSound();

  const [showPdfModal, setShowPdfModal] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [passwordInput, setPasswordInput] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [animClass, setAnimClass] = useState("");
  const [showTooltip, setShowTooltip] = useState(false);

  const [pdfBlobUrl, setPdfBlobUrl] = useState(null);
  const [selectedDocId, setSelectedDocId] = useState(null);

  const timerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const viewerRef = useRef(null);
  const screenRef = useRef(null);
  const tooltipRef = useRef(null);

  const currentDoc = docList[currentIndex];

  const triggerRandomEffect = () => {
    if (animClass) return;

    const startSounds = [
      "sfx_Ish00",
      "sfx_Ish01",
      "sfx_Ish02",
      "sfx_Ish03",
      "sfx_Ish04",
      "sfx_Ish05",
      "sfx_Ish06",
      "sfx_Ish07",
      "sfx_Ish08",
      "sfx_Ish09",
      "sfx_Ish10",
    ];
    const randomSound =
      startSounds[Math.floor(Math.random() * startSounds.length)];
    playSfx(randomSound);

    const effects = ["anim-spin", "anim-rainbow", "anim-dash", "anim-jelly"];
    const randomEffect = effects[Math.floor(Math.random() * effects.length)];

    setAnimClass(randomEffect);

    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      setAnimClass("");
    }, 1000);
  };

  const handleDecoClick = () => {
    window.open(
      "https://m.work24.go.kr/cm/c/f/1100/selecSystInfo.do?currentPageNo=1&recordCountPerPage=12&systClId=SC00000119&systId=SI00000370&menuId=MENU2178",
      "_blank",
      "noopener,noreferrer",
    );
  };

  useEffect(() => {
    const viewer = viewerRef.current;
    if (!viewer) return;

    const handleWheelNative = (e) => {
      e.preventDefault();
      e.stopPropagation();

      if (e.deltaY > 0) {
        setCurrentIndex((prev) => (prev + 1) % docList.length);
      } else {
        setCurrentIndex((prev) => (prev - 1 + docList.length) % docList.length);
      }
    };

    viewer.addEventListener("wheel", handleWheelNative, { passive: false });
    return () => {
      viewer.removeEventListener("wheel", handleWheelNative);
    };
  }, []);

  useEffect(() => {
    const el = screenRef.current;
    if (!el) return;

    let currentScroll = el.scrollTop;
    let targetScroll = el.scrollTop;
    let isAnimating = false;
    let animationFrameId;
    const ease = 0.08;

    const render = () => {
      if (Math.abs(targetScroll - currentScroll) < 0.5) {
        currentScroll = targetScroll;
        isAnimating = false;
      } else {
        currentScroll += (targetScroll - currentScroll) * ease;
        el.scrollTop = currentScroll;
        animationFrameId = requestAnimationFrame(render);
      }
    };

    const onWheel = (e) => {
      e.preventDefault();
      const maxScroll = el.scrollHeight - el.clientHeight;
      targetScroll += e.deltaY * 1.5;
      targetScroll = Math.max(0, Math.min(targetScroll, maxScroll));

      if (!isAnimating) {
        isAnimating = true;
        render();
      }
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      el.removeEventListener("wheel", onWheel);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleDocClick = (id) => {
    playSfx("sfx_confirm");
    setSelectedDocId(id);
    setPasswordInput("");
    setErrorMsg("");
    setIsAuthorized(false);
    setPdfBlobUrl(null);
    setShowPdfModal(true);
  };

  const checkPassword = async () => {
    try {
      setErrorMsg("");

      const response = await axios.post(
        "/api/view-pdf",
        {
          password: passwordInput,
          docId: selectedDocId,
        },
        { responseType: "blob" },
      );

      const pdfBlob = new Blob([response.data], { type: "application/pdf" });
      const url = URL.createObjectURL(pdfBlob);

      setPdfBlobUrl(url);
      setIsAuthorized(true);
    } catch (error) {
      console.error("인증 실패", error);
      if (error.response && error.response.status === 401) {
        setErrorMsg("비밀번호가 일치하지 않습니다.");
      } else if (error.response && error.response.status === 404) {
        setErrorMsg("해당 문서를 찾을 수 없습니다.");
      } else {
        setErrorMsg("서버 오류가 발생했습니다.");
      }
    }
  };

  const closeModal = () => {
    setShowPdfModal(false);
    setIsAuthorized(false);
  };

  const handleCloseModal = () => {
    playSfx("sfx_cancle");
    if (pdfBlobUrl) {
      URL.revokeObjectURL(pdfBlobUrl);
      setPdfBlobUrl(null);
    }
    setIsAuthorized(false);
    setPasswordInput("");
    setErrorMsg("");
    closeModal();
  };

  const handleMouseMove = (e) => {
    if (showTooltip && tooltipRef.current) {
      tooltipRef.current.style.left = `${e.clientX + 15}px`;
      tooltipRef.current.style.top = `${e.clientY - 30}px`;
    }
  };

  return (
    <div
      className="content-glitch-enter"
      style={{ width: "100%", height: "100%", position: "relative" }}
    >
      <div className="screen-mask" onMouseMove={handleMouseMove}>
        <div className="screen tv-effect" ref={screenRef}>
          <div className="info-text-container">
            {Basic_Info.map((section, index) => (
              <div className="info-section" key={section.id || index}>
                <div className="section-title">{section.title}</div>

                {section.items.map((item, itemIndex) => (
                  <div className="info-row" key={itemIndex}>
                    <span className="school-name">{item.name}</span>
                    {item.date && (
                      <span className="date-span">{item.date}</span>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>

          <p className="github-git-baekjoon">
            <span className="text-wrapper-3">
              🪢 링크
              <br />
            </span>
            <span className="text-wrapper-4 link-content">
              <a
                href="https://github.com/applejin0105"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
              >
                - GitHub
              </a>
              <br />
              <a
                href="https://www.acmicpc.net/user/applejin0105"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
              >
                - BaekJoon
              </a>
              <br />
              <a
                href="https://waterglass0105.tistory.com/"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
              >
                - Tistory
              </a>
              <br />
              <a
                href="https://steamcommunity.com/profiles/76561198125248769/"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
              >
                - Steam
              </a>
            </span>
          </p>

          <div className="dororngImgPage">
            <img
              className={`dororong-ishmael-basic ${animClass}`}
              alt="Dororong ishmael"
              src={Ishmael}
              onClick={triggerRandomEffect}
              onMouseEnter={() => playSfx("sfx_mousehover")}
              title="눌러보세요!"
              style={{ transform: animClass ? undefined : "none" }}
            />
          </div>

          <div className="viewer" onClick={() => handleDocClick(currentDoc.id)}>
            <img className="back-board" alt="Back board" src={Board} />
            <img className="BG-viewer" alt="Frame" src={PDFViewer} />

            <div className="text-overlay-content" ref={viewerRef}>
              <div className="doc-label">SECURE DOCS</div>
              <div className="doc-title-wrapper">
                <div key={currentDoc.id} className="doc-title fade-text">
                  {currentDoc.title}
                </div>
              </div>
              <div className="doc-pagination">
                {currentIndex + 1} / {docList.length}
              </div>
              <div className="viewer-hint">
                SCROLL to Select
                <br />
                CLICK to Unlock
              </div>
            </div>
          </div>

          <div className="picture">
            <img className="my-photo" alt="My Profile" src={MyPhoto} />
            <img
              className="picture-frame"
              alt="Picture frame"
              src={PictureFrame}
            />
            <img className="deco01" alt="Bargain" src={Bargain} />
            <img
              className="deco02"
              alt="Money"
              src={Money}
              onClick={handleDecoClick}
            />
            <img className="deco03" alt="Fimally" src={Fimally} />
            <div className="text-wrapper-5">
              김종진
              <br />
              준비된-신입-프로그래머
            </div>
          </div>
        </div>
      </div>

      {showTooltip &&
        ReactDOM.createPortal(
          <div
            ref={tooltipRef}
            className="mouse-tooltip"
            style={{
              position: "fixed",
              zIndex: 99999,
              pointerEvents: "none",
            }}
          >
            클릭하여 이동
          </div>,
          document.body,
        )}

      {showPdfModal &&
        ReactDOM.createPortal(
          <div className="pdf-modal-overlay" onClick={handleCloseModal}>
            <div
              className="pdf-modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              {!isAuthorized ? (
                <div className="auth-container">
                  <h2>🔒 보안 문서 접근</h2>
                  <p>문서를 열람하려면 비밀번호를 입력하세요.</p>
                  <input
                    type="password"
                    value={passwordInput}
                    autoFocus
                    onChange={(e) => setPasswordInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && checkPassword()}
                    placeholder="Password"
                  />
                  <div className="error-text">{errorMsg}</div>
                  <button className="auth-btn" onClick={checkPassword}>
                    확인
                  </button>
                </div>
              ) : (
                <iframe
                  src={pdfBlobUrl}
                  title="Secure Document"
                  width="100%"
                  height="100%"
                />
              )}

              <button className="close-btn" onClick={closeModal}>
                CLOSE
              </button>
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
};

export default BasicInfo;
