import { useState } from "react";
import WelcomePage from "./components/WelcomePage";
import ContentPage from "./components/ContentPage";
import "./assets/css/style.css";

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
    <div className="app">
      {continueBtn ? (
        <WelcomePage
          toggleWelcomeClose={toggleWelcomeClose}
          continueBtn={continueBtn}
        />
      ) : (
        <ContentPage toggleWelcomeOpen={toggleWelcomeOpen} />
      )}
    </div>
  );
}

export default App;
