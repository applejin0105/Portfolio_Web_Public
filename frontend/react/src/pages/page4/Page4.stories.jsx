import React from "react";
import Page4 from "./Page4";
import { MemoryRouter } from "react-router-dom";
import { SoundProvider } from "@/context/SoundProvider";
import "@styles/index.css";

export default {
  title: "Pages/Page4",
  component: Page4,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <SoundProvider>
        <MemoryRouter initialEntries={["/page4"]}>
          <Story />
        </MemoryRouter>
      </SoundProvider>
    ),
  ],
};

export const Default = () => <Page4 />;
