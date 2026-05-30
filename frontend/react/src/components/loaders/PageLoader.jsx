/* src/components/loaders/PageLoader.jsx */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { preloadAssets } from "@/utils/resourceLoader";
import { PAGE_ASSETS } from "@/data/assetsMap";
import Page2 from "@/pages/page2/Page2";

const PageLoader = ({ target }) => {
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const loadTargetAssets = async () => {
      // target 주소에서 "Page6" 같은 키 추출
      const pageKey = target
        .replace("/", "")
        .replace(/^\w/, (c) => c.toUpperCase());

      const imagesToLoad = [...(PAGE_ASSETS[pageKey] || [])].filter(
        (url) => url && (url.endsWith(".png") || url.endsWith(".jpg")),
      );

      const soundsToLoad = [...(PAGE_ASSETS[pageKey] || [])].filter(
        (url) => url && (url.endsWith(".wav") || url.endsWith(".mp3")),
      );

      const startTime = Date.now();
      const MIN_TIME = 1500; // 짧은 로딩

      const interval = setInterval(() => {
        setProgress((prev) => (prev >= 95 ? prev : prev + 5));
      }, 50);

      try {
        await preloadAssets(imagesToLoad, soundsToLoad);

        const elapsed = Date.now() - startTime;
        const remain = Math.max(0, MIN_TIME - elapsed);
        if (remain > 0) await new Promise((r) => setTimeout(r, remain));

        clearInterval(interval);
        setProgress(100);

        setTimeout(() => {
          navigate(target, { replace: true });
        }, 500);
      } catch (e) {
        console.error("Page Load Failed", e);
        navigate(target, { replace: true });
      }
    };

    loadTargetAssets();
  }, [target, navigate]);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Page2 progress={progress} />
    </div>
  );
};

export default PageLoader;
