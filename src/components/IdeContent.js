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
  windowWidth
}) {
  const [copied, setCopied] = useState(false);
  const [editor, setEditor] = useState(null);

  const { aiApiData, handleAiApiCall, isAiDataLoading } = useContext(AiContext);

  const toggleShowPanes = (e) => {
    e.preventDefault();
    setShowPanes(!showPanes);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(markdown);
      setCopied(true);
    } catch (error) {
      // console.log("copy failed", error);
    }
  };

  const handleMarkdownDownload = () => {
    const blob = new Blob([markdown], { type: "text/markdown" });

    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'README.md';
    link.style.display = 'none';

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
  }

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

  const editorOptions = {
    selectOnLineNumbers: true,
    wordWrap: "on",
    minimap: {
      enabled: false,
    },
    theme: "vs-dark",
  };   

  // editor loads in light mode, this  fixes it but not ideal :)
  const simulateEnterKeyPress = () => {
    if (editor) {
      editor.trigger("keyboard", "type", { text: "\n" });
    }
  };

  useEffect(() => {
    const timeout = setTimeout(simulateEnterKeyPress, 2000);

    return () => clearTimeout(timeout);
  }, []);

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
          <div
            className="ide-menu-item"
            data-tooltip-id="download-tooltip"
            onClick={handleMarkdownDownload}
          >
            <FiDownload />
            <ReactTooltip
              className="ide-tooltip"
              id="download-tooltip"
              place="left"
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
            onClick={handleCopy}
          >
            <FiCopy />
            <ReactTooltip
              className="ide-tooltip"
              id="copy-tooltip"
              place="left"
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
      <div className="ide-content"
      style={{width: windowWidth < 800 ?  windowWidth - 30 : null}}
      >
        {isAiDataLoading ? (
          <div className="is-ai-loading">
            <DotPulse size={40} speed={1.3} color="white" />
            <p>loading...</p>
          </div>
        ) : null}
        <div className="ide-content-code">
          <Editor
            height="100%"
            defaultLanguage="markdown"
            defaultValue={markdown}
            value={markdown}
            onChange={handleEditorChange}
            options={editorOptions}
            onMount={setEditor}
          />
        </div>
      </div>
    </div>
  );
}
