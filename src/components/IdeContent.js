import React, { useEffect, useState, useContext } from "react";
import { FiDownload, FiCopy } from "react-icons/fi";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { AiContext } from "../context/AiContext";
import { DotPulse } from "@uiball/loaders";
import Editor from "@monaco-editor/react";

export default function IdeContent({handleEditorChange, markdown, setShowPanes, showPanes }) {
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
            onChange={handleEditorChange}
            options={{
              minimap: {
                enabled: false
                }
            }}
          />
          {/* <p style={{ paddingTop: "500px" }}>
            {aiApiData && aiApiData.response}
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
            vehicula justo at augue varius, quis bibendum ex convallis. Sed
            auctor massa sed feugiat tincidunt. Nulla at lectus id tortor
            tincidunt dapibus. Curabitur id viverra ante. Nulla vitae neque in
            ipsum varius ullamcorper. Integer consequat ipsum nec justo
            convallis, nec cursus justo fermentum. Integer sit amet aliquet mi.
            Suspendisse euismod, metus vel consequat mattis, odio felis posuere
            est, ut dignissim justo justo nec libero. In suscipit volutpat odio,
            eget eleifend dolor congue quis. Sed semper luctus massa id
            tincidunt. Sed nec risus ac justo laoreet volutpat. Sed bibendum
            libero eu sem ullamcorper, quis dapibus sem fringilla. Sed sed velit
            sit amet lorem ultricies efficitur eget eget ipsum. Curabitur
            consectetur tincidunt euismod. Nulla fringilla, tortor vel viverra
            varius, erat dui sollicitudin libero, a fringilla tortor nisl et
            ligula. Suspendisse volutpat urna id dui rhoncus varius. Integer vel
            quam in ipsum cursus auctor. In hac habitasse platea dictumst.
            Suspendisse vitae nunc vel sapien bibendum vehicula. Integer varius
            erat vel augue vehicula, ac fermentum odio efficitur. Vivamus ut
            urna risus. Curabitur consectetur nunc ac augue egestas laoreet.
            Integer facilisis massa sit amet enim bibendum, in suscipit dui
            hendrerit. Vestibulum ullamcorper, mi ut ullamcorper cursus, ipsum
            erat bibendum massa, et tincidunt quam tortor nec nunc. Etiam auctor
            ultricies odio, at tincidunt arcu.
          </p> */}
        </div>
      </div>
    </div>
  );
}
