export interface Note {
  id: number;
  title: string;
  content: string;
  category: string;
}

const API_URL = "http://localhost:3001/notes";

// Fetch all notes
export async function getNotes(): Promise<Note[]> {
  const response = await fetch(API_URL, {
    method: "GET",
    credentials: "include", // Automatically sends the auth cookie
  });
  if (!response.ok) throw new Error("Failed to fetch notes");
  return response.json();
}

// Create a new note
export async function createNote(note: {
  title: string;
  content: string;
  category: string;
}): Promise<Note> {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(note),
    credentials: "include",
  });
  if (!response.ok) throw new Error("Failed to create note");
  return response.json();
}

// Delete a note
export async function deleteNote(id: number): Promise<void> {
  const response = await fetch(`${API_URL}/${id}`, { method: "DELETE", credentials: "include" });
  if (!response.ok) throw new Error("Failed to delete note");
}

// Update a note
export const updateNote = async (
  id: number,
  updatedNote: { title: string; content: string; category: string }
) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedNote),
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to update note");
  }

  return await response.json();
};

// Search notes by keyword
export async function searchNotes(query: string): Promise<Note[]> {
  const response = await fetch(`${API_URL}/search?query=${query}`);
  if (!response.ok) throw new Error("Failed to search notes");
  return response.json();
}

// Filter notes by category
export async function filterNotesByCategory(category: string): Promise<Note[]> {
  const response = await fetch(`${API_URL}/filter?category=${category}`);
  if (!response.ok) throw new Error("Failed to filter notes");
  return response.json();
}
