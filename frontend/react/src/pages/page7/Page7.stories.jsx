import React from "react";
import Page7 from "./Page7";
import { MemoryRouter } from "react-router-dom";
import { SoundProvider } from "@/context/SoundProvider";
import "@styles/index.css";

export default {
  title: "Pages/Page7",
  component: Page7,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <SoundProvider>
        <MemoryRouter initialEntries={["/page7"]}>
          <Story />
        </MemoryRouter>
      </SoundProvider>
    ),
  ],
};

export const Default = () => <Page7 />;
