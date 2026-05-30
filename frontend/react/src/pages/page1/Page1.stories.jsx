import React from "react";
import Page1 from "./Page1";

import { SoundProvider } from "@/context/SoundProvider";
import { MemoryRouter } from "react-router-dom";
import ScalableWrapper from "@/components/layout/ScalableWrapper";

import "@pageStyles/Page1.css";

export default {
  title: "Pages/Page1 (Trigger Warning)",
  component: Page1,
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
          <div style={{ width: "100vw", height: "100vh", background: "#000" }}>
            <ScalableWrapper>
              <Story />
            </ScalableWrapper>
          </div>
        </MemoryRouter>
      </SoundProvider>
    ),
  ],
};

export const Default = () => <Page1 />;
