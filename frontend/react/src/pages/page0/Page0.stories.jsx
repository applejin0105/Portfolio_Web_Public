import React from "react";
import Page0 from "./Page0";

import { SoundProvider } from "@/context/SoundProvider";
import { MemoryRouter } from "react-router-dom";
import ScalableWrapper from "@/components/layout/ScalableWrapper";

import "@pageStyles/Page0.css";

export default {
  title: "Pages/Page0 (Password)",
  component: Page0,
  parameters: {
    backgrounds: {
      default: "black",
      values: [{ name: "black", value: "#000000" }],
    },
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <SoundProvider>
        <MemoryRouter>
          <div style={{ width: "100vw", height: "100vh", overflow: "hidden" }}>
            <ScalableWrapper>
              <Story />
            </ScalableWrapper>
          </div>
        </MemoryRouter>
      </SoundProvider>
    ),
  ],
};

export const Default = () => <Page0 />;
