import React from "react";
import ProjectDetail from "./ProjectDetail";
import { SoundProvider } from "@/context/SoundProvider";
import "@styles/index.css";
import "@styles/pages/Page5.css";

export default {
  title: "Pages/Page5/Components/ProjectDetail",
  component: ProjectDetail,
  parameters: {
    backgrounds: {
      default: "dark",
      values: [{ name: "dark", value: "#000000" }],
    },
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <SoundProvider>
        <div
          style={{
            width: "100%",
            height: "100vh",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Story />
        </div>
      </SoundProvider>
    ),
  ],
};

const sampleProject = {
  name: "Sample Project",
  period: "2023.01.01 - 2023.12.31",
  role: "Main Developer",
  status: "Completed",
  description: `
# 프로젝트 개요
이것은 **샘플 프로젝트**입니다.
마크다운 문법을 지원합니다.

## 주요 기능
- 기능 1
- 기능 2
- 기능 3

### 기술 스택
- React
- Unity
- Node.js
  `,
  tags: [
    { name: "React", url: "https://reactjs.org" },
    { name: "Unity" },
    { name: "Node.js", url: "https://nodejs.org" },
  ],
  links: {
    git: "https://github.com",
    youtube: "https://youtube.com",
    steam: "https://store.steampowered.com",
    tistory: "https://tistory.com",
    homepage: "https://google.com",
  },
};

export const Default = () => (
  <ProjectDetail
    project={sampleProject}
    onClose={() => console.log("Close clicked")}
  />
);
