import React from "react";
import BasicInfo from "./BasicInfo";
import { SoundProvider } from "@/context/SoundProvider";
import "@pageStyles/Page4.css";

export default {
  title: "Pages/Page4/Components/BasicInfo",
  component: BasicInfo,
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

export const Default = () => <BasicInfo />;

export const WithGlitchEffect = () => {
  const [key, setKey] = React.useState(0);
  return (
    <div>
      <button
        style={{ position: "absolute", top: "-40px", left: 0, zIndex: 9999 }}
        onClick={() => setKey((prev) => prev + 1)}
      >
        Re-mount (Trigger Glitch)
      </button>
      <BasicInfo key={key} />
    </div>
  );
};
