import React from "react";
import { FiDownload, FiCopy } from "react-icons/fi";
import { Tooltip as ReactTooltip } from "react-tooltip";

export default function IdeContent({ setShowPanes, showPanes }) {
  const toggleShowPanes = (e) => {
    e.preventDefault();
    setShowPanes(!showPanes);
  };

  return (
    <div
      className="ide-pane"
      style={{ maxWidth: showPanes ? "100%" : "800px" }}
    >
      <div
        className="ide-menu"
        style={{ borderTopRightRadius: showPanes ? "0" : "12px" }}
      >
        <div className="ide-menu-items-left">
          <button onClick={toggleShowPanes}>
            {showPanes ? "Hide preview" : "Show preview and edit"}
          </button>
        </div>
        <div className="ide-menu-items-right">
          <div className="ide-menu-item" id="download-tooltip">
            <FiDownload />
            <ReactTooltip
              id="download-tooltip"
              place="bottom"
              content="Download"
            />
          </div>
          <div className="ide-menu-item" id="copy-tooltip">
            <FiCopy />
            <ReactTooltip
              id="copy-tooltip"
              place="bottom"
              content="Copy"
            />
          </div>
        </div>
      </div>
      <div className="ide-content">content section here</div>
    </div>
  );
}
