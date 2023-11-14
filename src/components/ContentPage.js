import React, { useState, useEffect, useContext } from "react";
import IdeContent from "./IdeContent";
import Select from "react-select";
import SplitPane from "react-split-pane";
import { FiArrowRight, FiSearch } from "react-icons/fi";
import axios from "axios";
import { AiContext } from "../context/AiContext";
import PreviewPane from "./PreviewPane";
import Sidebar from "./Sidebar";
import { generateReadmeQuery } from '../utils/GenerateReadmeQuery';

import "../assets/css/splitPaneStyle.css";

export default function ContentPage(toggleWelcomeOpen) {
  const [username, setUsername] = useState("");
  const [userRepos, setUserRepos] = useState([]);
  const [selectedRepo, setSelectedRepo] = useState(null);
  const [inputErrorMsg, setInputErrorMsg] = useState("");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [showPanes, setShowPanes] = useState(false);
  const [markdown, setMarkdown] = useState("");
  const [sidebarToggle, setSidebarToggle] = useState(false);

  // console.log('selected repo', markdown)

  const { aiApiData, handleAiApiCall, isAiDataLoading } = useContext(AiContext);

  useEffect(() => {
    if (aiApiData && aiApiData.response) {
      // console.log('apidata', aiApiData.response)
      setMarkdown(aiApiData.response);
    }
  }, [aiApiData]);

  const handleReadmeGenerate = () => {
    const query = generateReadmeQuery(selectedRepo.value);
    handleAiApiCall(query);
  };

  useEffect(() => {
    // Function to update window width
    const updateWindowWidth = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", updateWindowWidth);
    return () => {
      window.removeEventListener("resize", updateWindowWidth);
    };
  }, []);

  const handleSidebarToggle = (e) => {
    e.preventDefault();
    setSidebarToggle(!sidebarToggle);
  };

  const handleGetUserRepos = async (e) => {
    e.preventDefault();
    const url = `https://api.github.com/users/${username}/repos?per_page=100`;
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
        setInputErrorMsg("");
        // console.log(githubData);
      }
    } catch (error) {
      // console.log(error);
      setInputErrorMsg("No user found!");
      setSelectedRepo(null);
    }
  };

  const handleEditorChange = (value, event) => {
    // Update the markdown content when the editor changes
    setMarkdown(value);
  };

  return (
    <>
      <section className="content-section">
        <div className="menu-row">
          <div className="menu">
            <form onSubmit={handleGetUserRepos} className="username-search">
              <label htmlFor="">Search Github username</label>
              <div className="error-div">{inputErrorMsg}</div>
              <input
                type="text"
                value={username}
                placeholder="username"
                onChange={(e) => setUsername(e.target.value)}
              />
              <div
                className="username-search-icon"
                // onClick={handleGetUserRepos}
                type="submit"
              >
                <FiSearch />
              </div>
            </form>
            <form className="repo-select">
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
            </form>
            {windowWidth > 650 ? (
              <div
                className={`writeme-button ${
                  selectedRepo !== null
                    ? "writeme-btn-enabled"
                    : "writeme-btn-disabled"
                }`}
              >
                <button
                  disabled={selectedRepo === null}
                  onClick={handleReadmeGenerate}
                >
                  WRITEME
                  <FiArrowRight />
                </button>
              </div>
            ) : null}
          </div>
          {/* <div className="break"></div>
          <div className="filters">
            <div className="filter-button">
              <button
                className={selectedRepo === null ? "filter-btn-disabled" : ""}
                disabled={selectedRepo === null}
                onClick={handleSidebarToggle}
              >
                <p>Filters</p>
                <MdOutlineTune />
              </button>
            </div>
            {windowWidth < 650 ? (
              <div
                className={`writeme-button ${
                  selectedRepo !== null
                    ? "writeme-btn-enabled"
                    : "writeme-btn-disabled"
                }`}
              >
                <button
                  disabled={selectedRepo === null}
                  onClick={handleReadmeGenerate}
                >
                  WRITEME
                  <FiArrowRight />
                </button>
              </div>
            ) : null}
          </div> */}
        </div>
        <div className="display-row">
          {showPanes ? (
            <SplitPane
              split="vertical"
              minSize={230}
              maxSize={windowWidth - 260}
              defaultSize="50%"
              className="content-split-pane"
            >
              <IdeContent
                handleEditorChange={handleEditorChange}
                markdown={markdown}
                showPanes={showPanes}
                setShowPanes={setShowPanes}
              />
              <PreviewPane markdown={markdown} />
            </SplitPane>
          ) : (
            <IdeContent
              handleEditorChange={handleEditorChange}
              markdown={markdown}
              showPanes={showPanes}
              setShowPanes={setShowPanes}
              windowWidth={windowWidth}
            />
          )}
        </div>
        {sidebarToggle ? (
          <Sidebar
            handleSidebarToggle={handleSidebarToggle}
          />
        ) : null}
      </section>
    </>
  );
}
