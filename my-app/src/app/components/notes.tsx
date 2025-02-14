import React, { useState } from "react";
import { Card, Button, Select, Input, Modal } from "antd";
import { Note } from "../services/noteService";
import { FiEdit, FiTrash } from "react-icons/fi";
import { createNote, deleteNote, updateNote } from "../services/noteService";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const Notes = ({
  notes,
  onDelete,
  onAdd,
  isSidebarOpen, // Pass sidebar state to adjust styles
}: {
  notes: Note[];
  onDelete: (id: number) => void;
  onAdd: (note: Note) => void;
  isSidebarOpen: boolean;
}) => {
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newCategory, setNewCategory] = useState("Work");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);

  const showModal = () => {
    setEditingNote(null);
    resetForm();
    setIsModalOpen(true);
  };

  const showEditModal = (note: Note) => {
    setEditingNote(note);
    setNewTitle(note.title);
    setNewContent(note.content);
    setNewCategory(note.category);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setNewTitle("");
    setNewContent("");
    setNewCategory("Work");
  };

  const handleAddNote = async () => {
    if (!newTitle || !newContent) return;

    try {
      const newNote = await createNote({
        title: newTitle,
        content: newContent,
        category: newCategory,
      });

      onAdd(newNote);
      setIsModalOpen(false);
      resetForm();
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  const handleUpdateNote = async () => {
    if (!editingNote || !newTitle || !newContent) return;

    try {
      const updatedNote = await updateNote(editingNote.id, {
        title: newTitle,
        content: newContent,
        category: newCategory,
      });

      onDelete(editingNote.id);
      onAdd(updatedNote);

      setIsModalOpen(false);
      resetForm();
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  const handleDeleteNote = async (id: number) => {
    try {
      await deleteNote(id);
      onDelete(id);
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const showDeleteConfirm = (id: number) => {
    Modal.confirm({
      title: (
        <div className="flex items-center space-x-3">
          <ExclamationCircleOutlined className="text-red-500 text-2xl" />
          <span className="text-lg font-semibold">Delete Note?</span>
        </div>
      ),
      content: (
        <p className="text-gray-600 mt-2">
          This action <b>cannot be undone</b>. Are you sure you want to delete this note?
        </p>
      ),
      centered: true,
      icon: null,
      className: "custom-delete-modal",
      okText: "Yes, Delete",
      cancelText: "Cancel",
      okType: "danger",
      onOk() {
        handleDeleteNote(id);
      },
    });
  };

  return (
    <div
      className={`relative px-4 md:px-8 transition-all duration-300 ${isSidebarOpen ? "sm:ml-64" : "sm:ml-0"
        }`}
    >
      {/* Notes List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-4">
        {notes.map((note) => (
          <Card
            key={note.id}
            title={note.title}
            bordered={false}
            className="shadow-lg hover:shadow-xl transition-all rounded-lg bg-white hover:bg-[#fabe63] group"
            extra={
              <div className="flex items-center space-x-3">
                <Button
                  className="text-[#FF9800] group-hover:text-white"
                  type="link"
                  icon={<FiEdit />}
                  onClick={() => showEditModal(note)}
                />
                <Button
                  className="text-[#FF9800] group-hover:text-white"
                  type="link"
                  icon={<FiTrash />}
                  onClick={() => showDeleteConfirm(note.id)}
                />
              </div>
            }
          >
            <p className="text-gray-600">{note.content}</p>
          </Card>
        ))}
      </div>

      {/* Floating Add New Note Button */}
      <Button
        type="primary"
        className="fixed bottom-6 right-6 sm:bottom-10 sm:right-10 bg-[#FF9800] hover:bg-[#FB8C00] rounded-full w-14 h-14 flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110"
        icon={<span className="text-2xl text-white">+</span>}
        onClick={showModal}
      />

      {/* Modal for Adding or Editing Note */}
      <Modal
        title={editingNote ? "Edit Note" : "Add New Note"}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        destroyOnClose
      >
        <div className="mb-4">
          <Input
            placeholder="Title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="mb-2 p-3 border rounded-md"
          />
          <Input.TextArea
            placeholder="Content"
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            className="mb-2 p-3 border rounded-md"
          />
          <Select
            value={newCategory}
            onChange={(value) => setNewCategory(value)}
            className="w-full mb-3 border rounded-md"
          >
            <Select.Option value="Work">Work</Select.Option>
            <Select.Option value="Personal">Personal</Select.Option>
            <Select.Option value="Ideas">Ideas</Select.Option>
            <Select.Option value="To-Do">To-Do</Select.Option>
          </Select>
        </div>
        <Button
          type="primary"
          className="w-full bg-[#FF9800] hover:bg-[#FB8C00] rounded-md"
          onClick={editingNote ? handleUpdateNote : handleAddNote}
        >
          {editingNote ? "Update Note" : "Add Note"}
        </Button>
      </Modal>
    </div>
  );
};

export default Notes;
