import React, { useState } from "react";
import { PasswordWindow } from "./components/PasswordWindow";
import PageBG from "@bg/Page0.png";
import "@pageStyles/Page0.css";

const Page0 = () => {
  const [isExiting, setIsExiting] = useState(false);

  return (
    <div className="page-wrapper">
      <img src={PageBG} className="page-background" alt="Background" />

      <div className={`slide-in-panel ${isExiting ? "exit" : ""}`}>
        <PasswordWindow onExitStart={() => setIsExiting(true)} />
      </div>

      <div className={`transition-overlay ${isExiting ? "active" : ""}`} />
    </div>
  );
};

export default Page0;
