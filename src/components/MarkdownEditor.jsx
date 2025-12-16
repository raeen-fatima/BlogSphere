"use client";

import { useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Bold, Code, Link2 } from "lucide-react";

export default function MarkdownEditor({ value, onChange }) {
  const textareaRef = useRef(null);

  const applyFormat = (type) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.slice(start, end);

    let formatted = "";

    switch (type) {
      case "bold":
        formatted = `**${selectedText || "bold text"}**`;
        break;
      case "code":
        formatted = `\`${selectedText || "code"}\``;
        break;
      case "link":
        formatted = `[${selectedText || "link text"}](https://)`;
        break;
      default:
        return;
    }

    const updated =
      value.slice(0, start) + formatted + value.slice(end);

    onChange(updated);

    // Reset cursor position
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + formatted.length,
        start + formatted.length
      );
    }, 0);
  };

  return (
    <div className="border border-black/40 rounded-xl overflow-hidden">
      
      {/* Toolbar */}
      <div className="flex items-center gap-2 px-3 py-2 border-b border-black/30 bg-gray-50">
        <button
          type="button"
          onClick={() => applyFormat("bold")}
          className="p-2 rounded hover:bg-gray-200"
          title="Bold"
        >
          <Bold size={16} />
        </button>

        <button
          type="button"
          onClick={() => applyFormat("code")}
          className="p-2 rounded hover:bg-gray-200"
          title="Inline code"
        >
          <Code size={16} />
        </button>

        <button
          type="button"
          onClick={() => applyFormat("link")}
          className="p-2 rounded hover:bg-gray-200"
          title="Link"
        >
          <Link2 size={16} />
        </button>
      </div>

      {/* Editor + Preview */}
      <div className="grid grid-cols-1 md:grid-cols-2 min-h-[300px]">
        
        {/* Editor */}
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Write your blog in Markdown..."
          className="p-4 resize-none focus:outline-none border-r border-black/20 text-sm"
        />

        {/* Preview */}
        <div className="p-4 prose prose-sm max-w-none overflow-y-auto">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {value || "Nothing to preview yet…"}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
