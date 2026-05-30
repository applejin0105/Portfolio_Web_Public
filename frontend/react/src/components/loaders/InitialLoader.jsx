import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { preloadAssets } from "@/utils/resourceLoader";
import { PAGE_ASSETS } from "@data/assetsMap";
import Page2 from "@/pages/page2/Page2";

const InitialLoader = () => {
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const loadInitAssets = async () => {
      const imagesToLoad = [
        ...(PAGE_ASSETS.Common || []),
        ...(PAGE_ASSETS.Page0 || []),
        ...(PAGE_ASSETS.Page1 || []),
      ].filter((url) => url && (url.endsWith(".png") || url.endsWith(".jpg")));

      const soundsToLoad = [...(PAGE_ASSETS.Common || [])].filter(
        (url) => url && (url.endsWith(".wav") || url.endsWith(".mp3")),
      );

      const startTime = Date.now();
      const MIN_TIME = 2000;

      const interval = setInterval(() => {
        setProgress((prev) => (prev >= 95 ? prev : prev + 2));
      }, 50);

      try {
        await preloadAssets(imagesToLoad, soundsToLoad);

        const elapsed = Date.now() - startTime;
        const remain = Math.max(0, MIN_TIME - elapsed);
        if (remain > 0) await new Promise((r) => setTimeout(r, remain));

        clearInterval(interval);
        setProgress(100);

        setTimeout(() => {
          navigate("/auth", { replace: true });
        }, 500);
      } catch (e) {
        console.error("Init Load Failed", e);
        navigate("/auth", { replace: true });
      }
    };

    loadInitAssets();
  }, [navigate]);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Page2 progress={progress} />
    </div>
  );
};

export default InitialLoader;
