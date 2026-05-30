import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Howler } from "howler";
import { useSound } from "@/hooks/useSound";

import ContainerBG from "@frames/Container.png";
import NumberBG from "@buttons/Number.png";
import Confirm from "@buttons/Confirm.png";
import Correct from "@buttons/Correct.png";
import Error from "@buttons/Error.png";

import "@pageStyles/Page0.css";

const MAX_ATTEMPTS = 5;
const BLOCK_TIME = 30 * 1000;

export const PasswordWindow = ({ onExitStart }) => {
  const [digits, setDigits] = useState([0, 0, 0, 0, 0, 0]);
  const [status, setStatus] = useState("idle");
  const [blockTimer, setBlockTimer] = useState(0);
  const navigate = useNavigate();
  const { playSfx } = useSound();

  const unlockAudio = () => {
    if (Howler.ctx && Howler.ctx.state === "suspended") {
      Howler.ctx.resume();
    }
  };

  useEffect(() => {
    const blockedUntil = localStorage.getItem("blockedUntil");
    const now = Date.now();
    if (blockedUntil && now < parseInt(blockedUntil)) {
      setStatus("blocked");
      setBlockTimer(Math.ceil((parseInt(blockedUntil) - now) / 1000));
    }
  }, []);

  useEffect(() => {
    let timer;
    if (status === "blocked" && blockTimer > 0) {
      timer = setInterval(() => {
        setBlockTimer((prev) => {
          if (prev <= 1) {
            setStatus("idle");
            localStorage.removeItem("blockedUntil");
            localStorage.setItem("failCount", "0");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [status, blockTimer]);

  const handleDigitClick = (index) => {
    if (status !== "idle") return;

    unlockAudio();

    playSfx("sfx_confirm");
    setDigits((prev) => {
      const newDigits = [...prev];
      newDigits[index] = (newDigits[index] + 1) % 10;
      return newDigits;
    });
  };

  const runSuccessSequence = async () => {
    setStatus("success");
    for (let i = 0; i < 6; i++) {
      await new Promise((resolve) => setTimeout(resolve, 350));
      setDigits((prev) => {
        const next = [...prev];
        next[i] = 8;
        return next;
      });
      playSfx("sfx_dding");
    }

    if (onExitStart) onExitStart();

    playSfx("sfx_uiup");
    playSfx("bgm_suc");

    setTimeout(() => {
      localStorage.removeItem("failCount");
      localStorage.removeItem("blockedUntil");

      navigate("/intro");
    }, 4000);
  };

  const handleConfirm = async () => {
    if (status !== "idle") return;

    unlockAudio();

    playSfx("sfx_confirm");
    setStatus("loading");

    const inputPassword = digits.join("");

    try {
      const response = await axios.post(
        "/api/verify-password",
        { password: inputPassword },
        { timeout: 5000 },
      );

      if (response.data.success) {
        await runSuccessSequence();
      } else {
        throw new Error("Invalid Password");
      }
    } catch (error) {
      console.error("Login Error:", error);

      if (error.code === "ECONNABORTED" || !error.response) {
        playSfx("sfx_beep");
        setStatus("error");
        setTimeout(() => setStatus("idle"), 1000);
        return;
      }

      if (error.response && error.response.status === 429) {
        blockUser();
        return;
      }

      let fails = parseInt(localStorage.getItem("failCount") || "0") + 1;
      localStorage.setItem("failCount", fails.toString());

      if (fails >= MAX_ATTEMPTS) {
        blockUser();
      } else {
        playSfx("sfx_beep");
        setStatus("error");
        setTimeout(() => setStatus("idle"), 1000);
      }
    }
  };

  const blockUser = () => {
    const blockUntil = Date.now() + BLOCK_TIME;
    localStorage.setItem("blockedUntil", blockUntil.toString());

    setStatus("blocked");
    setBlockTimer(BLOCK_TIME / 1000);

    playSfx("sfx_timeout");
  };

  const getButtonImage = () => {
    if (status === "error" || status === "blocked") return Error;
    if (status === "success") return Correct;
    return Confirm;
  };

  return (
    <div
      className={`password-panel-container ${status !== "idle" ? "disabled" : ""}`}
      onClick={unlockAudio}
    >
      <img className="panel-bg" src={ContainerBG} alt="Container Background" />

      <div className="status-overlay-wrapper">
        <div className={`status-content ${status}`}>
          {status === "error" && "ACCESS DENIED"}
          {status === "blocked" && `SYSTEM LOCKED: ${blockTimer}s`}
        </div>
      </div>

      <div className="digits-area">
        {digits.map((digit, index) => (
          <div
            key={index}
            className="digit-box"
            onMouseEnter={() => {
              if (Howler.ctx.state === "running") playSfx("sfx_mousehover");
            }}
            onClick={(e) => {
              e.stopPropagation();
              handleDigitClick(index);
            }}
          >
            <img className="digit-bg" src={NumberBG} alt="frame" />
            <span
              className={`digit-text ${status === "success" ? "success-text" : ""}`}
            >
              {digit}
            </span>
          </div>
        ))}
      </div>

      <div
        className="confirm-btn-area"
        onMouseEnter={() => playSfx("sfx_mousehover")}
        onClick={(e) => {
          e.stopPropagation();
          handleConfirm();
        }}
      >
        <img src={getButtonImage()} alt="Confirm" draggable="false" />
      </div>
    </div>
  );
};
