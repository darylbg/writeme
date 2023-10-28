import React from "react";
import Markdown from "react-markdown";

export default function PreviewPane({markdown}) {
  return (
    <div className="preview-pane">
      <div className="preview-menu">
        <div className="preview-menu-header">
          <p>Live preview</p>
        </div>
      </div>
      <div className="preview-content">
        <Markdown>{markdown}</Markdown>
      </div>
    </div>
  );
}
