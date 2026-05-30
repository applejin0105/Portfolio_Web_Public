import React from "react";
import Page2 from "./Page2";

import { SoundProvider } from "@/context/SoundProvider";
import ScalableWrapper from "@/components/layout/ScalableWrapper";

import "@pageStyles/Page2.css";
import "@/styles/index.css";

export default {
  title: "Pages/Page2",
  component: Page2,
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
            <Story />
          </ScalableWrapper>
        </div>
      </SoundProvider>
    ),
  ],
};

// [수정] props로 progress 전달
export const Default = () => <Page2 progress={50} />;
export const LoadingStart = () => <Page2 progress={0} />;
export const LoadingComplete = () => <Page2 progress={100} />;
