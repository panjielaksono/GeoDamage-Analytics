import React, { useState } from "react";
import LandingPage from "./components/LandingPage";
import Workspace from "./components/Workspace";

function App() {
  const [view, setView] = useState("landing");

  return (
    <>
      {view === "landing" ? (
        <LandingPage onStartPrediction={() => setView("workspace")} />
      ) : (
        <Workspace onBackToLanding={() => setView("landing")} />
      )}
    </>
  );
}

export default App;
