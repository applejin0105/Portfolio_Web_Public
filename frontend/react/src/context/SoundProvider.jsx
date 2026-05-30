/* src/context/SoundProvider.jsx */
import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { Howl, Howler } from "howler";
import { SOUND_MAP } from "@/data/assetsMap";
import { SoundContext } from "./SoundContext";

export const SoundProvider = ({ children }) => {
  const [currentBgmKey, setCurrentBgmKey] = useState(null);
  const [isMuted, setIsMuted] = useState(false);
  const [sfxVolume, setSfxVolume] = useState(0.3);
  const [bgmVolume, setBgmVolume] = useState(0.2);

  const bgmRef = useRef(null);

  useEffect(() => {
    const unlockAudio = () => {
      if (Howler.ctx && Howler.ctx.state === "suspended") {
        Howler.ctx.resume();
      }
    };
    document.addEventListener("click", unlockAudio);
    document.addEventListener("keydown", unlockAudio);

    return () => {
      document.removeEventListener("click", unlockAudio);
      document.removeEventListener("keydown", unlockAudio);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (bgmRef.current) {
        bgmRef.current.stop();
        bgmRef.current.unload();
      }
    };
  }, []);

  const playBgm = useCallback(
    (trackName, fadeDuration = 2000) => {
      if (Howler.ctx && Howler.ctx.state === "suspended") {
        console.warn("AudioContext suspended. User interaction required.");
      }

      if (currentBgmKey === trackName && bgmRef.current?.playing()) {
        bgmRef.current.fade(bgmRef.current.volume(), bgmVolume, 1000);
        return;
      }

      if (bgmRef.current) {
        bgmRef.current.stop();
        bgmRef.current.unload();
      }

      const src = SOUND_MAP[trackName];
      if (!src) return;

      const newBgm = new Howl({
        src: [src],
        loop: true,
        volume: 0,
        html5: true,
      });

      newBgm.play();
      newBgm.fade(0, bgmVolume, fadeDuration);

      bgmRef.current = newBgm;
      setCurrentBgmKey(trackName);
    },
    [bgmVolume, currentBgmKey],
  );

  const stopBgm = useCallback((fadeDuration = 1000) => {
    if (bgmRef.current && bgmRef.current.playing()) {
      const sound = bgmRef.current;
      sound.fade(sound.volume(), 0, fadeDuration);
      setTimeout(() => {
        sound.stop();
        sound.unload();
        if (bgmRef.current === sound) {
          bgmRef.current = null;
          setCurrentBgmKey(null);
        }
      }, fadeDuration);
    } else {
      if (bgmRef.current) bgmRef.current.unload();
      bgmRef.current = null;
      setCurrentBgmKey(null);
    }
  }, []);

  const playSfx = useCallback(
    (trackName) => {
      if (isMuted) return;
      const src = SOUND_MAP[trackName];
      if (!src) return;

      const sfx = new Howl({
        src: [src],
        volume: sfxVolume,
        loop: false,
        onend: function () {
          this.unload();
        },
      });
      sfx.play();
    },
    [sfxVolume, isMuted],
  );

  const contextValue = useMemo(
    () => ({
      playBgm,
      stopBgm,
      playSfx,
      isMuted,
      setIsMuted,
      sfxVolume,
      setSfxVolume,
      bgmVolume,
      setBgmVolume,
      currentBgmKey,
    }),
    [playBgm, stopBgm, playSfx, isMuted, sfxVolume, bgmVolume, currentBgmKey],
  );

  return (
    <SoundContext.Provider value={contextValue}>
      {children}
    </SoundContext.Provider>
  );
};
