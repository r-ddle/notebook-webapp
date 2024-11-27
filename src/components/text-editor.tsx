"use client";
import { useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { Button } from "./ui/button";
import { updatePageContent } from "~/data/userService";

interface TextEditorProps {
  slug: string;
  initialContent?: string;
}

const TextEditor: React.FC<TextEditorProps> = ({ slug, initialContent }) => {
  const [content, setContent] = useState<string>(initialContent ?? "");

  const handleSubmit = async () => {
    try {
      await updatePageContent({ slug, content });
      console.log("Content updated successfully.");
    } catch (error) {
      console.error("Failed to update content:", error);
    }
  };

  return (
    <div>
      <p className="text-gray-800">start editing here</p>
      <div className="w-full max-w-3xl rounded-lg bg-black bg-opacity-5 backdrop-blur-sm">
        <ReactQuill theme="snow" value={content} onChange={setContent} />
      </div>
      <Button onClick={handleSubmit} className="mt-4">
        Submit
      </Button>
    </div>
  );
};

export default TextEditor;
