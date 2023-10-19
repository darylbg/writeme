import React from "react";
import SelectSearch from "react-select-search";
import 'react-select-search/style.css'
import { FiArrowRight } from "react-icons/fi";

export default function ContentPage(toggleWelcomeOpen) {
  const options = [
    { name: "Swedish", value: "sv" },
    { name: "English", value: "en" },
  ];

  return (
    <section className="content-section">
      <div className="content">
        <div className="menu">
          <div className="username-search">
            <label>Search Github username</label>
            <input type="text" />
          </div>
          <div className="repo-search">
            <label>Select desired repository</label>
            <input type="text" />
          </div>
          <div className="writeme-btn">
            <button>writeme<FiArrowRight /></button>
          </div>
        </div>
        <div className="display"></div>
      </div>
    </section>
  );
}
