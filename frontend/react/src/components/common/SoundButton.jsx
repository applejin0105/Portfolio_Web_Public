import React from "react";
import { useSound } from "@/hooks/useSound";

const SoundButton = ({
  onClick,
  children,
  hoverSound = "sfx_mousehover",
  clickSound = "sfx_confirm",
  ...props
}) => {
  const { playSfx } = useSound();

  const handleMouseEnter = () => {
    playSfx(hoverSound);
  };

  const handleClick = (e) => {
    playSfx(clickSound);
    if (onClick) onClick(e);
  };

  return (
    <button onMouseEnter={handleMouseEnter} onClick={handleClick} {...props}>
      {children}
    </button>
  );
};

export default SoundButton;
