import React, { useState } from "react";
import { useSound } from "@/hooks/useSound";

import BgClickableDeco from "@buttons/ClickableDeco.png";
import CurriculumVitae from "@logos/Curriculum_Vitae.png";
import Cantabile from "@logos/Cantabile.png";

const ClickableDeco = ({ className }) => {
  const [isCantabile, setIsCantabile] = useState(false);
  const { playSfx } = useSound();

  const toggleImage = () => {
    playSfx("sfx_dding");
    setIsCantabile((prev) => !prev);
  };

  return (
    <div
      className={`clickable-deco ${className || ""}`}
      onClick={toggleImage}
      onMouseEnter={() => playSfx("sfx_mousehover")}
    >
      <img className="bg-deco" src={BgClickableDeco} alt="Background Deco" />
      <img
        className={`curriculum-vitae deco-img ${!isCantabile ? "active" : ""}`}
        alt="Curriculum vitae"
        src={CurriculumVitae}
      />
      <img
        className={`cantabile deco-img ${isCantabile ? "active" : ""}`}
        alt="Cantabile"
        src={Cantabile}
      />
    </div>
  );
};

export default ClickableDeco;
