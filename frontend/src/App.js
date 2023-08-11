import React from "react";
import { useRoutes } from "react-router-dom";
import Routes from "./router/indexRouter";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useDarkMode } from "./components/DarkModeContext";
import { ThemeProvider } from "styled-components";

const lightTheme = {
  background: '#DCD7C9',
};

const darkTheme = {
  background: '#00001a',
  text: '#ffffff',
};

function App() {
  const { darkMode, toggleDarkMode } = useDarkMode();

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <div>
        <Header darkMode={darkMode} onToggle={toggleDarkMode} />
        {useRoutes(Routes)}
        <Footer />
      </div>
    </ThemeProvider>
  );
}
export default App;
