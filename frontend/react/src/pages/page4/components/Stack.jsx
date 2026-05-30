import React, { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeExternalLinks from "rehype-external-links";

import { BOOK_GROUPS } from "@/data/stackData";

const useSmoothScroll = (ref) => {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let targetScroll = el.scrollTop;
    let isAnimating = false;
    let animationFrameId = null;
    const ease = 0.15;

    const render = () => {
      if (!el) return;
      const currentScroll = el.scrollTop;
      const diff = targetScroll - currentScroll;

      if (Math.abs(diff) < 0.5) {
        el.scrollTop = targetScroll;
        isAnimating = false;
      } else {
        el.scrollTop = currentScroll + diff * ease;
        animationFrameId = requestAnimationFrame(render);
      }
    };

    const onWheel = (e) => {
      if (el.scrollHeight <= el.clientHeight) return;

      e.preventDefault();
      e.stopPropagation();

      if (!isAnimating) {
        targetScroll = el.scrollTop;
        isAnimating = true;
        requestAnimationFrame(render);
      }

      const delta = e.deltaY;
      const moveAmount = delta * 0.8;
      const maxScroll = el.scrollHeight - el.clientHeight;

      targetScroll += moveAmount;
      targetScroll = Math.max(0, Math.min(targetScroll, maxScroll));
    };

    el.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      if (el) el.removeEventListener("wheel", onWheel);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [ref]);
};

const ScrollGroup = ({ title, items, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`group-wrapper ${isOpen ? "open" : "closed"}`}>
      <h3 className="group-title" onClick={() => setIsOpen(!isOpen)}>
        <span className="toggle-icon">{isOpen ? "▼" : "▶"}</span> {title}
      </h3>

      {isOpen && (
        <ul className="group-list-container">
          {items.map((item) => (
            <li
              key={item.id}
              className="list-item"
              onClick={() => onSelect(item)}
            >
              <div className="item-text">{item.title}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const Stack = () => {
  const [selectedItem, setSelectedItem] = useState(null);

  const leftListRef = useRef(null);
  const rightListRef = useRef(null);

  const handleClose = () => setSelectedItem(null);

  useSmoothScroll(leftListRef);
  useSmoothScroll(rightListRef);

  return (
    <div
      className="content-glitch-enter"
      style={{ width: "100%", height: "100%" }}
    >
      <div className="screen-mask">
        <div
          className="screen tv-effect stack-screen"
          style={{ overflowX: "hidden" }}
        >
          <div className="stack-container">
            <div className="stack-column left-column">
              <div className="column-header">
                <h2 className="column-title-text">Books</h2>
              </div>
              <div className="stack-scroll-area" ref={leftListRef}>
                {BOOK_GROUPS?.map((group, index) => (
                  <ScrollGroup
                    key={index}
                    title={group.groupTitle}
                    items={group.items}
                    onSelect={setSelectedItem}
                  />
                ))}
              </div>
            </div>
          </div>

          {selectedItem && (
            <div className="md-modal-overlay" onClick={handleClose}>
              <div
                className="md-modal-content"
                onClick={(e) => e.stopPropagation()}
              >
                <button className="md-close-btn" onClick={handleClose}>
                  X
                </button>
                <h2 className="md-modal-title">
                  {selectedItem.link ? (
                    <a
                      href={selectedItem.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {selectedItem.title}
                    </a>
                  ) : (
                    selectedItem.title
                  )}
                </h2>
                <div className="markdown-body">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[
                      [
                        rehypeExternalLinks,
                        {
                          target: "_blank",
                          rel: ["noopener", "noreferrer"],
                        },
                      ],
                    ]}
                  >
                    {selectedItem.content}
                  </ReactMarkdown>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Stack;
