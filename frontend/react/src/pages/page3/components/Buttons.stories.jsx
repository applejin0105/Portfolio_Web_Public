import React from "react";
import Buttons from "./Buttons";

import { SoundProvider } from "@/context/SoundProvider";
import ScalableWrapper from "@/components/layout/ScalableWrapper";
import "@pageStyles/Page3.css";

export default {
  title: "Pages/Page3/Components/Buttons",
  component: Buttons,

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
    onNavigate: (path) => alert(`Navigating to: ${path}`),
  },
};
