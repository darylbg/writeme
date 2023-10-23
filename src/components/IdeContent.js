import React, { useEffect, useState } from "react";
import { FiDownload, FiCopy } from "react-icons/fi";
import { Tooltip as ReactTooltip } from "react-tooltip";

export default function IdeContent({ setShowPanes, showPanes }) {
  const [copied, setCopied] = useState(false);
  
  const toggleShowPanes = (e) => {
    e.preventDefault();
    setShowPanes(!showPanes);
  };

  useEffect(() => {
    let timeout;
    if (copied) {
      timeout = setTimeout(() => {
        setCopied(false);
      }, 3000);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [copied]);

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
          <div className="ide-menu-item" data-tooltip-id="download-tooltip">
            <FiDownload />
            <ReactTooltip
              className="ide-tooltip"
              id="download-tooltip"
              place="top"
              content="Download"
              border="1px solid #7c7c7d"
              style={{
                fontSize: '12px'
              }}
            />
          </div>
          <div
            className="ide-menu-item"
            data-tooltip-id="copy-tooltip"
            onClick={() => setCopied(true)}
          >
            <FiCopy />
            <ReactTooltip
              className="ide-tooltip"
              id="copy-tooltip"
              place="top"
              border={copied ? "1px solid #07E607" : "1px solid #7c7c7d"}
              content={copied ? 'Copied' : 'Copy'}
              style={{
                color: copied ? '#07E607': 'white',
                fontSize: '12px'
              }}
            />{" "}
          </div>
        </div>
      </div>
      <div className="ide-content">content section here</div>
    </div>
  );
}
