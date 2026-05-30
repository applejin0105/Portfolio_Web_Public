import React from "react";
import UserInfo from "./UserInfo";

import { SoundProvider } from "@/context/SoundContext";
import ScalableWrapper from "@/components/layout/ScalableWrapper";
import "@pageStyles/Page3.css";

export default {
  title: "Pages/Page3/Components/UserInfo",
  component: UserInfo,

  decorators: [
    /* eslint-disable no-unused-vars */
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
    onCopy: () => alert("텍스트가 복사되었습니다!"),
  },
};
