import React from "react";
import { FiArrowRight } from "react-icons/fi";

export default function WelcomePage(props) {
  return (
    <section
      className="welcome-section"
      style={
        props.continueBtn
          ? { width: "75%", padding: "0 20px 0 50px" }
          : { display: "none" }
      }
    >
      {/* <div className="home-link">
        <button>WRITEME</button>
      </div> */}
      <div className="welcome-intro">
        <h1># Writeme</h1>
        <p>
          Your go-to AI writing assistant for creating compelling README files
          for your GitHub repositories!
        </p>
        <h2>## Description</h2>
        <p>
          Welcome to Writeme, an innovative platform powered by ChatGPT, Say goodbye to
          the hassle of manually crafting documentation. Simply input your
          Github username, select the desired repository, and let ChatGPT generate a concise and informative
          README in markdown syntax. With our platform, you can seamlessly edit
          the generated README, live preview changes, and easily copy or
          download the file straight into your project. Experience the future of
          README creation with ChatGPT!
        </p>
      </div>
      <div className="welcome-text">
        {/* <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p> */}
        <div className="continue-button">
          <button onClick={props.toggleWelcomeClose}>
            Ok lets Go
            <FiArrowRight />
          </button>
        </div>
      </div>
    </section>
  );
}
