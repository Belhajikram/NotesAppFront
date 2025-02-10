"use client";
import { useEffect, useState } from "react";
import Sidebar from "../components/sideBar";
import SearchBar from "../components/searchBar";
import Notes from "../components/notes";
import { getNotes, createNote, searchNotes, filterNotesByCategory, Note } from "../services/noteService";
import '@ant-design/v5-patch-for-react-19';
import ProtectedRoute from "../components/protectedRoute";
import { useAuth } from "../context/authContext";

export default function DashboardPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All Notes");
  const [searchQuery, setSearchQuery] = useState("");
  const { logout, user } = useAuth();
  useEffect(() => {
    fetchNotes();
  }, [searchQuery, selectedCategory]);

  const fetchNotes = async () => {
    try {
      let data = [];

      if (searchQuery) {
        data = await searchNotes(searchQuery);
      } else if (selectedCategory !== "All Notes") {
        data = await filterNotesByCategory(selectedCategory);
      } else {
        data = await getNotes();
      }

      setNotes(data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  const handleAddNote = async (newNote: { title: string; content: string; category: string }) => {
    if (!newNote.title || !newNote.content) return;

    try {
      const addedNote = await createNote(newNote);
      setNotes((prevNotes) => [...prevNotes, addedNote]);
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  return (
    <ProtectedRoute>
      <div className="flex h-screen bg-gray-100">
        {/* Sidebar */}
        <Sidebar onSelectCategory={setSelectedCategory} />

        {/* Main Content */}
        <div className="flex-1 p-6">
          {/* Top Section: Welcome Message & Search Bar */}
          <div className="flex items-center justify-between mb-6">
            {/* Welcome Message */}
            <h2 className="text-2xl font-semibold text-gray-700">
              {user?.name ? `${user.name}, welcome to your notes app!` : "Welcome to your notes app!"}
            </h2>

            {/* Search Bar & Logout Button */}
            <div className="flex items-center space-x-4">
              <SearchBar onSearch={setSearchQuery} />
              <button onClick={logout} className="bg-[#FF9800] text-white font-semibold px-6 py-2 rounded-full shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Notes Grid */}
          <Notes
            notes={notes}
            onDelete={(id) => setNotes(notes.filter((note) => note.id !== id))}
            onAdd={handleAddNote}
          />
        </div>
      </div>
    </ProtectedRoute>
  );
}
