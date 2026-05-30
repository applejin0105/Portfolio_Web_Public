import React from "react";
import { MemoryRouter } from "react-router-dom";
import { SoundProvider } from "@/context/SoundProvider";
import { PasswordWindow } from "./PasswordWindow";

export default {
  title: "Pages/Page0/IntroPanel",
  component: PasswordWindow,
  parameters: {
    layout: "fullscreen",
    backgrounds: {
      default: "dark",
      values: [{ name: "dark", value: "#000000" }],
    },
  },
  decorators: [
    (Story) => (
      <SoundProvider>
        <MemoryRouter>
          <div
            style={{
              width: "100%",
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#000",
            }}
          >
            <Story />
          </div>
        </MemoryRouter>
      </SoundProvider>
    ),
  ],
};

export const Default = () => <PasswordWindow />;
