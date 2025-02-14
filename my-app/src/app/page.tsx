"use client";
import { useEffect, useState, useCallback } from "react";
import Sidebar from "./components/sideBar";
import SearchBar from "./components/searchBar";
import Notes from "./components/notes";
import { getNotes, createNote, searchNotes, filterNotesByCategory, Note } from "./services/noteService";
import '@ant-design/v5-patch-for-react-19';
import ProtectedRoute from "./components/protectedRoute";
import { useAuth } from "./context/authContext";
import { FiMenu } from "react-icons/fi";

export default function DashboardPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All Notes");
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { logout } = useAuth();

  const fetchNotes = useCallback(async () => {
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
  }, [searchQuery, selectedCategory]);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

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
        {/* Sidebar with state control */}
        <Sidebar 
          onSelectCategory={setSelectedCategory} 
          isOpen={sidebarOpen} 
          setIsOpen={setSidebarOpen} 
        />

        {/* Main Content */}
        <div className={`flex-1 p-6 transition-all duration-300 ${sidebarOpen ? "ml-64 md:ml-0" : "ml-0"}`}>
          {/* Top Section: Sidebar Toggle, Welcome Message & Search Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            {/* Sidebar Toggle Button (Mobile) */}
            <button 
              className="md:hidden bg-[#FF9800] text-white p-2 rounded-lg shadow-md mb-4 sm:mb-0"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <FiMenu size={24} />
            </button>

            {/* Welcome Message */}
            <h2 className="text-2xl font-semibold text-gray-700 mb-4 sm:mb-0 flex-1">
              Welcome to your notes app!
            </h2>

            {/* Search Bar & Logout Button */}
            <div className="flex items-center space-x-4 w-full sm:w-auto">
              <SearchBar onSearch={setSearchQuery} className="w-full sm:w-72 bg-white shadow-md px-4 rounded-full" />
              <button 
                onClick={logout} 
                className="bg-[#FF9800] text-white font-semibold px-6 py-2 rounded-full shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg"
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
            isSidebarOpen={sidebarOpen} 
          />
        </div>
      </div>
    </ProtectedRoute>
  );
}
