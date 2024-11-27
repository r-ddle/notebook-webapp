"use client";

import React from "react";
import { ScrollArea } from "../../components/ui/scroll-area";

interface Note {
  id: number;
  title: string;
  content: string;
}

interface SidebarProps {
  notes: Note[];
  selectedNote: number | null;
  setSelectedNote: (id: number) => void;
}

const SidebarFile: React.FC<SidebarProps> = ({
  notes,
  selectedNote,
  setSelectedNote,
}) => {
  return (
    <aside className="m-2 hidden w-64 flex-shrink-0 overflow-y-auto rounded-lg bg-black bg-opacity-20 text-white backdrop-blur-sm md:block">
      {/* Header of the sidebar */}
      <h2 className="mb-2 border-b p-4 text-xl font-semibold">Notes</h2>
      <ScrollArea className="h-[calc(100vh-8rem)]">
        <ul>
          {/* Iterate over each note and display it as a list item */}
          {notes.map((note) => (
            <li
              key={note.id} // Unique key for each list item
              onClick={() => setSelectedNote(note.id)} // Sets the clicked note as selected
              className={`cursor-pointer p-4 hover:bg-gray-900 ${
                selectedNote === note.id
                  ? "mx-3 rounded-lg bg-black text-white" // Highlight if selected
                  : ""
              }`}
            >
              {note.title} {/* Display the title of the note */}
            </li>
          ))}
        </ul>
      </ScrollArea>
    </aside>
  );
};

export default SidebarFile; // Export the SidebarFile component
