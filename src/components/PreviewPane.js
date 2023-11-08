import React from "react";
import MarkdownPreview from "@uiw/react-markdown-preview";

export default function PreviewPane({ markdown }) {
  return (
    <div className="preview-pane">
      <div className="preview-menu">
        <div className="preview-menu-header">
          <div className="preview-dot"></div>
          <p>Live preview</p>
        </div>
      </div>
      <div className="preview-content">
        <MarkdownPreview
          source={markdown}
          wrapperElement={{
            "data-color-mode": "light",
          }}
        />
      </div>
    </div>
  );
}
