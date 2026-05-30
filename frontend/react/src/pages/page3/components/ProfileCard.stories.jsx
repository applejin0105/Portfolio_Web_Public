import React from "react";
import ProfileCard from "./ProfileCard";
import { SoundProvider } from "@/context/SoundProvider";
import ScalableWrapper from "@/components/layout/ScalableWrapper";
import "@pageStyles/Page3.css";

export default {
  title: "Pages/Page3/Components/ProfileCard",
  component: ProfileCard,

  decorators: [
    (Story) => (
      <SoundProvider>
        <div
          style={{
            width: "100vw",
            height: "100vh",
            backgroundColor: "#000",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden",
          }}
        >
          <ScalableWrapper>
            <div
              style={{ position: "relative", width: "100%", height: "100%" }}
            >
              <Story />
            </div>
          </ScalableWrapper>
        </div>
      </SoundProvider>
    ),
  ],
};

export const Default = {
  args: {
    onCopy: () => alert("ID Copied!"),
  },
};
