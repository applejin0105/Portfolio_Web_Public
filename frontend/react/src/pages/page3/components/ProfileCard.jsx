import React, { useState, useRef } from "react";
import { useSound } from "@/hooks/useSound";

import CopyButton from "@buttons/Copy_Container.png";
import FullIshmael from "@etc/Full_Ishmael.png";
import BannerCultist from "@logos/Banner_Cultist.png";
import BannerDevgear from "@logos/Banner_Devgear.png";
import BannerKnu from "@logos/Banner_Knu.png";
import BannerMrKoo from "@logos/Banner_MrKoo.png";
import TextBox from "@frames/TextBox.png";
import UserNameTagTicketL from "@frames/UserNameTag_Ticket_L.png";
import UserNameTagTicketR from "@frames/UserNameTag_Ticket_R.png";

const ProfileCard = ({ onCopy, className }) => {
  const cardRef = useRef(null);
  const transitionTimeoutRef = useRef(null);
  const [spinningIcons, setSpinningIcons] = useState([]);
  const { playSfx } = useSound();

  const handleIconClick = (iconId) => {
    if (spinningIcons.includes(iconId)) return;
    playSfx("sfx_dding");
    setSpinningIcons((prev) => [...prev, iconId]);
    setTimeout(() => {
      setSpinningIcons((prev) => prev.filter((id) => id !== iconId));
    }, 3000);
  };

  const handleCopyID = (e) => {
    e.stopPropagation();
    playSfx("sfx_confirm");
    const idText = "D598223387";
    navigator.clipboard
      .writeText(idText)
      .then(() => {
        if (onCopy) onCopy();
      })
      .catch((err) => console.error(err));
  };

  const handleMouseEnter = () => {
    const card = cardRef.current;
    if (!card) return;
    if (transitionTimeoutRef.current)
      clearTimeout(transitionTimeoutRef.current);
    card.style.transition = "transform 0.4s cubic-bezier(0.23, 1, 0.32, 1)";
    transitionTimeoutRef.current = setTimeout(() => {
      card.style.transition = "none";
    }, 400);
  };

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * 10;
    const rotateY = ((x - centerX) / centerX) * -10;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    if (transitionTimeoutRef.current)
      clearTimeout(transitionTimeoutRef.current);
    card.style.transition = "transform 0.5s ease-out";
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  };

  return (
    <div
      className={`profile-card ${className || ""}`}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="card-inner" ref={cardRef}>
        <div className="ishmael-wrapper wiping-effect">
          <img className="ishmael-img" alt="Ishmael" src={FullIshmael} />
        </div>
        <img
          className="usernametag-ticket-l"
          alt="ticket l"
          src={UserNameTagTicketL}
        />
        <img
          className="usernametag-ticket-r"
          alt="ticket r"
          src={UserNameTagTicketR}
        />
        <div className="copy" onClick={handleCopyID} title="ID 복사">
          <div className="text-wrapper">복사</div>
          <img className="copy-button" alt="Copy button" src={CopyButton} />
        </div>
        <p className="ID">
          <span className="span">NO</span>
          <span className="text-wrapper-2"> D598223387</span>
        </p>
        <img
          className={`qr icon-3d ${spinningIcons.includes("mrkoo") ? "spinning" : ""}`}
          alt="Mr.Koo"
          src={BannerMrKoo}
          onClick={(e) => {
            e.stopPropagation();
            handleIconClick("mrkoo");
          }}
          onMouseEnter={() => playSfx("sfx_mousehover")}
        />
        <img
          className={`cultist icon-3d ${spinningIcons.includes("cultist") ? "spinning" : ""}`}
          alt="Cultist"
          src={BannerCultist}
          onClick={(e) => {
            e.stopPropagation();
            handleIconClick("cultist");
          }}
          onMouseEnter={() => playSfx("sfx_mousehover")}
        />
        <img
          className={`devgear icon-3d ${spinningIcons.includes("devgear") ? "spinning" : ""}`}
          alt="Devgear"
          src={BannerDevgear}
          onClick={(e) => {
            e.stopPropagation();
            handleIconClick("devgear");
          }}
          onMouseEnter={() => playSfx("sfx_mousehover")}
        />
        <img
          className={`knu icon-3d ${spinningIcons.includes("knu") ? "spinning" : ""}`}
          alt="Knu"
          src={BannerKnu}
          onClick={(e) => {
            e.stopPropagation();
            handleIconClick("knu");
          }}
          onMouseEnter={() => playSfx("sfx_mousehover")}
        />
        <div className="text">
          <img className="text-box" alt="Text box" src={TextBox} />
          <div className="div">이곳에 취업하여 뼈를 묻으리라.</div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
