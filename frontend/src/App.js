import React, { useEffect, useState } from "react";
import { useRoutes, useLocation } from "react-router-dom";
import Routes from "./router/indexRouter";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Intro, Steps } from "intro.js-react";
import "intro.js/introjs.css"

function App() {
  const location = useLocation();
  const [showOnboarding, setShowOnboarding] = useState(true);

  const handleOnboardingClose = () => {
    setShowOnboarding(false);
  };

  const isMapPage = location.pathname === "/map"
  return (
    <div>
      <Header></Header>
      {useRoutes(Routes)}
      <Footer></Footer>

      {isMapPage && (
        <OnboardingModal show={showOnboarding} onClose={handleOnboardingClose} />
        )}
    </div>
  );
}
export default App;
