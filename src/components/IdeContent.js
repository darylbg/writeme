import React, { useEffect, useState, useContext } from "react";
import { FiDownload, FiCopy } from "react-icons/fi";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { AiContext } from "../context/AiContext";
import { DotPulse } from "@uiball/loaders";
import Editor from "@monaco-editor/react";

export default function IdeContent({
  handleEditorChange,
  markdown,
  setShowPanes,
  showPanes,
}) {
  const [copied, setCopied] = useState(false);

  const { aiApiData, handleAiApiCall, isAiDataLoading } = useContext(AiContext);

  const toggleShowPanes = (e) => {
    e.preventDefault();
    setShowPanes(!showPanes);
  };

  useEffect(() => {
    let timeout;
    if (copied) {
      timeout = setTimeout(() => {
        setCopied(false);
      }, 2000);
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
                fontSize: "12px",
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
              content={copied ? "Copied!" : "Copy"}
              style={{
                color: copied ? "#07E607" : "white",
                fontSize: "12px",
              }}
            />{" "}
          </div>
        </div>
      </div>
      <div className="ide-content">
        {isAiDataLoading ? (
          <div className="is-ai-loading">
            <DotPulse size={40} speed={1.3} color="white" />
            <p>loading...</p>
          </div>
        ) : null}
        <div className="ide-content-code">
          <Editor
            height="90%"
            defaultLanguage="markdown"
            defaultValue={markdown}
            value={markdown}
            onChange={handleEditorChange}
            options={{
              minimap: {
                enabled: false,
              },
            }}
          />

          <p>{markdown}</p>
        </div>
      </div>
    </div>
  );
}
