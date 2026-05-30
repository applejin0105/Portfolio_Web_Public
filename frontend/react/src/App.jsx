/* src/App.jsx */
import React, { Suspense, lazy, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { SoundProvider } from "@/context/SoundProvider";
import ScalableWrapper from "@/components/layout/ScalableWrapper";

import InitialLoader from "@/components/loaders/InitialLoader";
import MainLoader from "@/components/loaders/MainLoader";
import PageLoader from "@/components/loaders/PageLoader";

import "@/styles/index.css";

// 페이지 Lazy Import
const Page0 = lazy(() => import("@pages/page0/Page0"));
const Page1 = lazy(() => import("@pages/page1/Page1"));
const Page3 = lazy(() => import("@pages/page3/Page3"));
const Page4 = lazy(() => import("@pages/page4/Page4"));
const Page5 = lazy(() => import("@pages/page5/Page5"));
const Page6 = lazy(() => import("@pages/page6/Page6"));
const Page7 = lazy(() => import("@pages/page7/Page7"));

function App() {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <div
      className={`custom-cursor-container ${isClicked ? "cursor-clicked" : "cursor-default"}`}
      onMouseDown={() => setIsClicked(true)}
      onMouseUp={() => setIsClicked(false)}
    >
      <SoundProvider>
        <ScalableWrapper>
          <Router>
            <Suspense fallback={null}>
              <Routes>
                <Route path="/" element={<InitialLoader />} />
                <Route path="/auth" element={<Page0 />} />
                <Route path="/intro" element={<Page1 />} />
                <Route path="/loading" element={<MainLoader />} />
                <Route path="/page3" element={<Page3 />} />
                <Route path="/page4" element={<Page4 />} />
                <Route path="/page5" element={<Page5 />} />
                <Route
                  path="/loading-page6"
                  element={<PageLoader target="/page6" />}
                />
                <Route path="/page6" element={<Page6 />} />
                <Route path="/page7" element={<Page7 />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Suspense>
          </Router>
        </ScalableWrapper>
      </SoundProvider>
    </div>
  );
}

export default App;
