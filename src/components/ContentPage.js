import React, { useState, useEffect, useRef } from "react";
import Select from "react-select";
import { FiArrowRight, FiSearch } from "react-icons/fi";
import axios from "axios";

export default function ContentPage(toggleWelcomeOpen) {
  const [username, setUsername] = useState("");
  const [userRepos, setUserRepos] = useState([]);
  const [selectedRepo, setSelectedRepo] = useState(null);

  const handleUsernameInput = (e) => {
    e.preventDefault();
  };

  const handleGetUserRepos = async (e) => {
    e.preventDefault();
    const url = `https://api.github.com/users/${username}/repos`;
    try {
      const response = await axios.get(url);
      const data = response.data;
      const githubData = data.map((repo) => {
        return { value: repo.url, label: repo.name };
      });
      setUserRepos(githubData);

      if (githubData.length > 0) {
        setSelectedRepo(githubData[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="content-section">
      <div className="content">
        <div className="menu">
          <div className="username-search">
            <label>Search Github username</label>
            <div className="input-group">
              <input
                type="text"
                value={username}
                placeholder="@github..."
                onChange={(e) => setUsername(e.target.value)}
                style={{
                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    fontFamily: '"Poppins", sans-serif',
                    fontSize: '16px'
                  }),
                }}
              />
              <div className="icon">
                <FiSearch onClick={handleGetUserRepos} />
              </div>
            </div>
          </div>
          <div className="repo-select">
            <label>Select desired repository</label>
            <Select
              options={userRepos}
              value={selectedRepo}
              onChange={(selectedOption) => setSelectedRepo(selectedOption)}
              className="react-select-container"
              classNamePrefix="react-select"
            />
          </div>
          <div className="writeme-btn">
            <button>
              WRITEME
              <FiArrowRight />
            </button>
          </div>
        </div>
        <div className="display"></div>
      </div>
    </section>
  );
}
