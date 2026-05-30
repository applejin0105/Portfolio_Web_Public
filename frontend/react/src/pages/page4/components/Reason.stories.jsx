import React from "react";
import Reason from "./Reason";
import { SoundProvider } from "@/context/SoundProvider";
import "@pageStyles/Page4.css";

export default {
  title: "Pages/Page4/Components/Reason",
  component: Reason,
  parameters: {
    backgrounds: {
      default: "dark",
      values: [{ name: "dark", value: "#000000" }],
    },
  },
  decorators: [
    (Story) => (
      <SoundProvider>
        <div
          style={{
            position: "relative",
            width: "1100px",
            height: "700px",
            backgroundColor: "#111",
            overflow: "hidden",
            border: "1px dashed #555",
            margin: "50px auto",
          }}
        >
          <Story />
        </div>
      </SoundProvider>
    ),
  ],
};

export const Default = () => <Reason />;
