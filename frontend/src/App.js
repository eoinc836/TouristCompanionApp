import React, { useEffect, useState } from "react";
import { useRoutes } from "react-router-dom";
import Routes from "./router/indexRouter";
import Header from "./components/Header";
import Footer from "./components/Footer";
import StartUpGuide from "./components/StartUpGuide";
import { useDarkMode } from "./components/DarkModeContext";
import { ThemeProvider } from "styled-components";

const lightTheme = {
  background: '#DCD7C9',
  text: '#000000',
};

const darkTheme = {
  background: '#000000',
  text: '#ffffff',
};

function App() {
  const [showGuide, setShowGuide] = useState(false);
  const { darkMode, toggleDarkMode } = useDarkMode();
  //console.log("Dar mode in app is: ", darkMode)

  useEffect(() => {
    const hasSeenGuide = localStorage.getItem("hasSeenGuide");
    if (!hasSeenGuide) {
      setShowGuide(true);
      localStorage.setItem("hasSeenGuide", "true");
    }
  }, []);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <div>
        <Header darkMode={darkMode} onToggle={toggleDarkMode} />
        {useRoutes(Routes)}
        <Footer />
        {showGuide && <StartUpGuide />} 
      </div>
    </ThemeProvider>
  );
}
export default App;
