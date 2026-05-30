import React, { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Career_Data } from "@data/page4Data";

const Career = () => {
  const screenRef = useRef(null);

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

  return (
    <div
      className="content-glitch-enter"
      style={{ width: "100%", height: "100%" }}
    >
      <div className="screen-mask">
        <div className="screen tv-effect" ref={screenRef}>
          <div className="markdown-content">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                a: ({ ...props }) => (
                  <a {...props} target="_blank" rel="noopener noreferrer" />
                ),
              }}
            >
              {Career_Data}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
