import { useState } from "react";
import WelcomePage from "./components/WelcomePage";
import ContentPage from "./components/ContentPage";
import { AiContextProvider } from "./context/AiContext";
import "./assets/css/style.css";
import logoImg from './assets/images/Logo.png'

function App() {
  const [continueBtn, setContinueBtn] = useState(true);

  const toggleWelcomeClose = (e) => {
    e.preventDefault();
    setContinueBtn(false);
  };

  const toggleWelcomeOpen = (e) => {
    e.preventDefault();
    setContinueBtn(true);
  };

  return (
    <AiContextProvider>
      <div className="app">
        <div className="logo" onClick={toggleWelcomeOpen}>
          <img src={logoImg} alt="logo" />
        </div>
        {continueBtn ? (
          <WelcomePage
            toggleWelcomeClose={toggleWelcomeClose}
            continueBtn={continueBtn}
          />
        ) : (
          <ContentPage toggleWelcomeOpen={toggleWelcomeOpen} />
        )}
      </div>
    </AiContextProvider>
  );
}

export default App;
