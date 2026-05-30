import React from "react";
import Page5 from "./Page5";
import { MemoryRouter } from "react-router-dom";
import { SoundProvider } from "@/context/SoundProvider";
import "@styles/index.css";

export default {
  title: "Pages/Page5",
  component: Page5,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <SoundProvider>
        <MemoryRouter initialEntries={["/page5"]}>
          <Story />
        </MemoryRouter>
      </SoundProvider>
    ),
  ],
};

export const Default = () => <Page5 />;
