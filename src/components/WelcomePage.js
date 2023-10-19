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
      <div className="home-link">
        <button>WRITEME</button>
      </div>
      <div className="welcome-intro">
        <p># My Project</p>
        <p>## Description</p>
        <p>This project is cool and like does cool stuff...</p>
      </div>
      <div className="welcome-text">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
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
