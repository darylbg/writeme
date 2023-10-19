import { FiArrowRight } from "react-icons/fi";
import "./App.css";
import { useState } from "react";

function App() {
  const [continueBtn, setContinueBtn] = useState(true);

  const toggleWelcomeClose = () => {
    setContinueBtn(false);
  };

  const toggleWelcomeOpen = () => {
    setContinueBtn(true);
  };

  return (
    <div className="app">
      <div
        className="home-link-small"
        style={continueBtn ? { display: "none" } : { display: "block" }}
      >
        <button onClick={toggleWelcomeOpen}>WRITEME</button>
      </div>
      <section
        className="welcome-section"
        style={
          continueBtn
            ? { width: "75%", padding: "0 20px 0 50px" }
            : { display: "none" }
        }
      >
        <div className="home-link">
          <button>WRITEME</button>
        </div>
        {continueBtn ? (
          <>
            <div className="welcome-intro">
              <p># My Project</p>
              <p>## Description</p>
              <p>This project is cool and like does cool stuff...</p>
            </div>
            <div className="welcome-text">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
              <div className="continue-button">
                <button onClick={toggleWelcomeClose}>
                  Ok lets Go
                  <FiArrowRight />
                </button>
              </div>
            </div>
          </>
        ) : null}
      </section>
      <section className="content-section"></section>
    </div>
  );
}

export default App;
