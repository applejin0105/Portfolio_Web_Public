import React from "react";
import GameContainer from "./GameContainer";
import { SoundProvider } from "@/context/SoundProvider";
import "@/styles/index.css";
import "@styles/pages/Page6.css";

const dummyThumbnail =
  "https://via.placeholder.com/600x800/ffd800/000000?text=Thumbnail";

export default {
  title: "Pages/Page6/Components/GameContainer",
  component: GameContainer,
  parameters: {
    backgrounds: {
      default: "dark",
      values: [{ name: "dark", value: "#000000" }],
    },
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <SoundProvider>
        <div
          style={{
            width: "1920px",
            height: "1080px",
            position: "relative",
            backgroundColor: "#000",
          }}
        >
          <div style={{ position: "absolute", top: "118px", left: "100px" }}>
            <Story />
          </div>
        </div>
      </SoundProvider>
    ),
  ],
};

const sampleGameData = {
  name: "Limbus Company",
  thumbnail: dummyThumbnail,
  steamLink: "https://store.steampowered.com",
  comment: [
    { type: "text", content: "이 게임은 정말 놀라운 경험을 제공합니다." },
    { type: "text", content: "\n\n스토리텔링과 분위기가 압도적입니다." },
  ],
  scores: {
    originality: 5,
    soul: 4.5,
    uniqueness: 5,
    vibe: 4,
    immersion: 5,
    impact: 4.5,
  },
  playTime: "120h",
};

export const Default = () => (
  <GameContainer gameData={sampleGameData} index={0} totalCount={4} />
);
