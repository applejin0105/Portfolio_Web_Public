import React, { useState, useEffect, useRef } from "react";
import { useSound } from "@/hooks/useSound";

import UserInfoFrame from "@frames/UserInfoFrame.png";
import Madness from "@logos/Madness.png";
import Ishmael from "@logos/Ishmael.png";
import Copy from "@buttons/Copy.png";

const UserInfo = ({ onCopy, className }) => {
  const [animClass, setAnimClass] = useState("");
  const { playSfx } = useSound();

  const timerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

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

  const handleCopyText = (text) => {
    playSfx("sfx_confirm");
    navigator.clipboard
      .writeText(text)
      .then(() => {
        if (onCopy) onCopy();
      })
      .catch((err) => console.error(err));
  };

  const phoneNumber = "010-6646-1509";
  const emailAddress = "applejin0105@gmail.com";

  return (
    <div
      className={`user-info ${className || ""}`}
      style={{ position: "relative", overflow: "visible", zIndex: 10 }}
    >
      <img className="BG-userinfo" alt="Bg userinfo" src={UserInfoFrame} />

      <div className="limbus-info">
        <div className="ID">NO. D598223387</div>
        <div className="text-wrapper">LV</div>
        <div className="level">116</div>
      </div>

      <div className="info">
        <div className="depart">프로그래머</div>
        <div className="name">김종진</div>
        <img className="deco" alt="Deco" src={Madness} />
      </div>

      <p className="PH">
        <span className="span">Tel.</span>
        <span className="text-wrapper-2">&nbsp;</span>
        <span className="text-wrapper-3">{phoneNumber}</span>
        <img
          className="copy-btn"
          src={Copy}
          alt="copy"
          onClick={() => handleCopyText(phoneNumber)}
          onMouseEnter={() => playSfx("sfx_mousehover")}
          title="전화번호 복사"
        />
        <span className="spacer" style={{ width: "100%", height: "0" }}></span>
        <span className="span">E-Mail.</span>
        <span className="text-wrapper-2">&nbsp;</span>
        <span className="text-wrapper-3">{emailAddress}</span>
        <img
          className="copy-btn"
          src={Copy}
          alt="copy"
          onClick={() => handleCopyText(emailAddress)}
          onMouseEnter={() => playSfx("sfx_mousehover")}
          title="이메일 복사"
        />
        <span className="spacer" style={{ width: "100%", height: "0" }}></span>
        <span className="span">Sex.</span>
        <span className="text-wrapper-2">&nbsp;</span>
        <span className="text-wrapper-3">Male</span>
        <span className="spacer" style={{ width: "100%", height: "0" }}></span>
        <span className="span">Oshi.</span>
        <span className="text-wrapper-2">&nbsp;</span>
        <span className="text-wrapper-3">Ishmael</span>
        <span className="text-wrapper-2"> ⛪</span>
      </p>

      <img
        className={`dororong-ishmael ${animClass}`}
        alt="Dororong ishmael"
        src={Ishmael}
        onClick={triggerRandomEffect}
        onMouseEnter={() => playSfx("sfx_mousehover")}
        title="눌러보세요!"
        style={{ transform: animClass ? undefined : "none" }}
      />
    </div>
  );
};

export default UserInfo;
