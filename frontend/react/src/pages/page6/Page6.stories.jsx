import React from "react";
import Page6 from "./Page6";
import { MemoryRouter } from "react-router-dom";
import { SoundProvider } from "@/context/SoundProvider";
import "@styles/index.css";

export default {
  title: "Pages/Page6",
  component: Page6,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <SoundProvider>
        <MemoryRouter initialEntries={["/page6"]}>
          <Story />
        </MemoryRouter>
      </SoundProvider>
    ),
  ],
};

export const Default = () => <Page6 />;
