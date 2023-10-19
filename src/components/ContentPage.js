import React, { useState, useEffect, useRef } from "react";
import SelectSearch from "react-select-search";
import SlimSelect from "slim-select";
// import "slim-select/slimselect/slimselect.css";
import "react-select-search/style.css";
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
            <select>
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
              <option value="option4">Option 4</option>
              <option value="option5">Option 5</option>
            </select>
          </div>
          <div className="writeme-btn">
            <button>
              writeme
              <FiArrowRight />
            </button>
          </div>
        </div>
        <div className="display"></div>
      </div>
    </section>
  );
}
