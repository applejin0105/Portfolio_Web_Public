import React from "react";
import Page3 from "./Page3";

import { MemoryRouter } from "react-router-dom";
import { SoundProvider } from "@/context/SoundProvider";
import "@styles/index.css";

export default {
  title: "Pages/Page3",
  component: Page3,
  decorators: [
    (Story) => (
      <SoundProvider>
        <MemoryRouter>
          <div style={{ width: "100%", height: "100%", margin: 0, padding: 0 }}>
            <Story />
          </div>
        </MemoryRouter>
      </SoundProvider>
    ),
  ],
};

export const Default = () => <Page3 />;
