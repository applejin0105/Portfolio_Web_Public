import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import { useSound } from "@/hooks/useSound";
import "@styles/pages/Page5.css";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

import Container from "@frames/Container.png";

import Git from "@logos/Git.png";
import Steam from "@logos/Steam.png";
import Tistory from "@logos/Tistory.png";
import Youtube from "@logos/Youtube.png";
import Homepage from "@logos/Homepage.png";

const extractImageUrls = (markdown) => {
  if (!markdown) return [];
  const regex = /!\[.*?\]\((.*?)\)/g;
  const urls = [];
  let match;
  while ((match = regex.exec(markdown)) !== null) {
    urls.push(match[1]);
  }
  return urls;
};

const ProjectDetail = ({ project, onClose }) => {
  const { playSfx } = useSound();
  const {
    name = "Project Name",
    period = "0000.00.00 - 0000.00.00",
    role = "All",
    status = "In Progress",
    description = "프로젝트 소개 내용이 들어갑니다.",
    tags = [],
    links = {},
  } = project || {};

  const [isClosing, setIsClosing] = useState(false);
  const textRef = useRef(null);
  const isLightboxOpenRef = useRef(false);

  const [lightboxIndex, setLightboxIndex] = useState(null);
  const galleryImages = useMemo(
    () => extractImageUrls(description),
    [description],
  );

  useEffect(() => {
    isLightboxOpenRef.current = lightboxIndex !== null;
  }, [lightboxIndex]);

  const openLightbox = useCallback(
    (src) => {
      const index = galleryImages.indexOf(src);
      if (index !== -1) {
        playSfx("sfx_confirm");
        setLightboxIndex(index);
      }
    },
    [galleryImages, playSfx],
  );

  const closeLightbox = useCallback(() => {
    playSfx("sfx_cancle");
    setLightboxIndex(null);
  }, [playSfx]);

  const navigateGallery = useCallback(
    (direction) => {
      playSfx("sfx_mousehover");
      setLightboxIndex((prev) => {
        if (prev === null) return null;
        if (direction === "prev") {
          return (prev - 1 + galleryImages.length) % galleryImages.length;
        } else {
          return (prev + 1) % galleryImages.length;
        }
      });
    },
    [galleryImages.length, playSfx],
  );

  const handleClose = useCallback(() => {
    playSfx("sfx_cancle");
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 700);
  }, [onClose, playSfx]);

  useEffect(() => {
    const el = textRef.current;
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
      if (isLightboxOpenRef.current) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }

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
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxIndex !== null) {
        if (e.key === "ArrowLeft") {
          navigateGallery("prev");
        } else if (e.key === "ArrowRight") {
          navigateGallery("next");
        } else if (e.key === "Escape") {
          closeLightbox();
        }
      } else {
        if (e.key === "Escape") {
          handleClose();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, navigateGallery, closeLightbox, handleClose]);

  const lastWheelTime = useRef(0);
  const handleLightboxWheel = (e) => {
    e.stopPropagation();
    const now = Date.now();
    if (now - lastWheelTime.current < 300) return;
    lastWheelTime.current = now;

    if (e.deltaY > 0) {
      navigateGallery("next");
    } else {
      navigateGallery("prev");
    }
  };

  const markdownComponents = {
    img: ({ src, alt, title }) => (
      <img
        src={src}
        alt={alt || "image"}
        title={title}
        className="markdown-thumbnail"
        onClick={() => openLightbox(src)}
      />
    ),
    a: ({ href, children }) => (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    ),
  };

  const wrapperClass = `project-detail-wrapper ${isClosing ? "closing" : ""} ${
    lightboxIndex !== null ? "locked" : ""
  }`;

  return (
    <>
      <div className={wrapperClass} onClick={(e) => e.stopPropagation()}>
        <div className="project-detail">
          <button className="btn-close-custom" onClick={handleClose}>
            X
          </button>

          <img className="BG-container" alt="Bg container" src={Container} />

          <div className="unified-scroll-view" ref={textRef}>
            <div className="project-header-info">
              <div className="project-title-text">{name}</div>
              <div className="project-meta-row">
                <span className="meta-label">개발 기간:</span> {period}
              </div>
              <div className="project-meta-row">
                <span className="meta-label">담당 파트:</span> {role}
              </div>
              <div className="project-meta-row">
                <span className="meta-label">현재 상태:</span> {status}
              </div>
            </div>

            <div className="markdown-body-project">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                components={markdownComponents}
              >
                {description}
              </ReactMarkdown>
            </div>

            <div style={{ height: "100px" }}></div>
          </div>

          <div className="tag-area">
            {tags.map((tag, index) =>
              tag.url ? (
                <a
                  key={index}
                  href={tag.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tech-tag link-tag"
                >
                  {tag.name}
                </a>
              ) : (
                <span key={index} className="tech-tag">
                  {tag.name}
                </span>
              ),
            )}
          </div>

          <div className="icons">
            {links.git && (
              <a
                href={links.git}
                target="_blank"
                rel="noopener noreferrer"
                className="icon-link-item"
              >
                <img src={Git} alt="GitHub" />
              </a>
            )}
            {links.youtube && (
              <a
                href={links.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="icon-link-item"
              >
                <img src={Youtube} alt="YouTube" />
              </a>
            )}
            {links.steam && (
              <a
                href={links.steam}
                target="_blank"
                rel="noopener noreferrer"
                className="icon-link-item"
              >
                <img src={Steam} alt="Steam" />
              </a>
            )}
            {links.tistory && (
              <a
                href={links.tistory}
                target="_blank"
                rel="noopener noreferrer"
                className="icon-link-item"
              >
                <img src={Tistory} alt="Tistory" />
              </a>
            )}
            {links.homepage && (
              <a
                href={links.homepage}
                target="_blank"
                rel="noopener noreferrer"
                className="icon-link-item"
              >
                <img src={Homepage} alt="Homepage" />
              </a>
            )}
          </div>
        </div>
      </div>

      {lightboxIndex !== null && (
        <div
          className="lightbox-overlay"
          onClick={(e) => {
            if (
              e.target.classList.contains("lightbox-overlay") ||
              e.target.classList.contains("lightbox-content")
            ) {
              closeLightbox();
            }
          }}
          onWheel={handleLightboxWheel}
        >
          <div className="lightbox-content">
            <img
              src={galleryImages[lightboxIndex]}
              alt={`Gallery ${lightboxIndex + 1}`}
              className="lightbox-image"
            />

            <button
              className="lightbox-nav prev"
              onClick={() => navigateGallery("prev")}
            >
              ◀
            </button>
            <button
              className="lightbox-nav next"
              onClick={() => navigateGallery("next")}
            >
              ▶
            </button>

            <div className="lightbox-counter">
              {lightboxIndex + 1} / {galleryImages.length}
            </div>

            <p className="close-hint">ESC 또는 배경 클릭하여 닫기</p>
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectDetail;
