import React, { useEffect, useState } from "react";
import { useRoutes } from "react-router-dom";
import Routes from "./router/indexRouter";
import Header from "./components/Header";
import Footer from "./components/Footer";
import StartUpGuide from "./components/StartUpGuide";

function App() {
  const [showGuide, setShowGuide] = useState(false);

  useEffect(() => {
    const hasSeenGuide = localStorage.getItem("hasSeenGuide");
    if (!hasSeenGuide) {
      setShowGuide(true);
      localStorage.setItem("hasSeenGuide", "true");
    }
  }, []);

  return (
    <div>
      <Header></Header>
      {useRoutes(Routes)}
      <Footer></Footer>

      {showGuide && <StartUpGuide />} 
    </div>
  );
}
export default App;
