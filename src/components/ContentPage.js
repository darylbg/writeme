import React, { useState, useEffect, useRef } from "react";
import IdeContent from "./IdeContent";
import Select from "react-select";
import SplitPane from "react-split-pane";
import { FiArrowRight, FiSearch } from "react-icons/fi";
import axios from "axios";
import "../assets/css/splitPaneStyle.css";

export default function ContentPage(toggleWelcomeOpen) {
  const [username, setUsername] = useState("");
  const [userRepos, setUserRepos] = useState([]);
  const [selectedRepo, setSelectedRepo] = useState(null);
  const [inputErrorMsg, setInputErrorMsg] = useState("");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [showPanes, setShowPanes] = useState(false);

  useEffect(() => {
    // Function to update window width
    const updateWindowWidth = () => {
      setWindowWidth(window.innerWidth);
    };

    // Attach the event listener to the window's resize event
    window.addEventListener("resize", updateWindowWidth);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", updateWindowWidth);
    };
  }, []);

  const handleUsernameInput = (e) => {
    e.preventDefault();
  };

  const handleGetUserRepos = async (e) => {
    e.preventDefault();
    const url = `https://api.github.com/users/${username}/repos`;
    try {
      const response = await axios.get(url);
      const data = await response.data;

      if (data.length === 0) {
        setInputErrorMsg("No user found!");
        setUserRepos([]);
        setSelectedRepo(null);
      } else {
        const githubData = data.map((repo) => ({
          value: repo.url,
          label: repo.name,
        }));
        setUserRepos(githubData);
        setSelectedRepo(githubData[0]);
        setInputErrorMsg(""); // Clear any previous error message
      }
    } catch (error) {
      console.log(error);
      setInputErrorMsg("No user found!");
      setSelectedRepo(null);
    }
  };

  return (
    <>
      <section className="content-section">
        <div className="menu-row">
          <div className="menu">
            <div className="username-search">
              <label htmlFor="">Search Github username</label>
              <div className="error-div">{inputErrorMsg}</div>
              <input
                type="text"
                value={username}
                placeholder="username"
                onChange={(e) => setUsername(e.target.value)}
              />
              <div className="username-search-icon">
                <FiSearch onClick={handleGetUserRepos} />
              </div>
            </div>
            <div className="repo-select">
              <label htmlFor="">Select repository</label>
              <div className="error-div"></div>
              <Select
                options={userRepos}
                value={selectedRepo}
                unstyled={true}
                classNamePrefix="react-select"
                className="react-select-container"
                onChange={(selectedOption) => setSelectedRepo(selectedOption)}
                styles={{
                  control: (provided, state) => ({
                    ...provided,
                    border: state.isFocused ? "1px solid #1b1315" : "none",
                    borderRadius: state.isFocused ? "4px" : "none",
                    backgroundColor: state.isSelected ? "red" : "transparent",
                  }),
                  option: (provided, state) => ({
                    ...provided,
                    backgroundColor: state.isSelected
                      ? "#720018"
                      : "transparent",
                    color: state.isSelected ? "white" : "#1b1315",
                  }),
                  placeholder: (provided) => ({
                    ...provided,
                    color: "#7c7c7d", // Set your preferred placeholder color
                  }),
                }}
              />
            </div>
            <div className="writeme-button">
              <button>
                WRITEME
                <FiArrowRight />
              </button>
            </div>
          </div>
        </div>
        <div className="display-row">
          {showPanes ? (
            <SplitPane
              split="vertical"
              minSize={230}
              maxSize={windowWidth - 236}
              defaultSize="50%"
              className="content-split-pane"
            >
              <IdeContent showPanes={showPanes} setShowPanes={setShowPanes} />
              <div className="">panel 2</div>
            </SplitPane>
          ) : (
            <IdeContent showPanes={showPanes} setShowPanes={setShowPanes} />
          )}
        </div>
      </section>
    </>
  );
}
