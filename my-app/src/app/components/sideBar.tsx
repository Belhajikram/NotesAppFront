import React, { useState } from "react";
import { FiFolder, FiBriefcase, FiUser, FiCheckSquare, FiMenu } from "react-icons/fi";
import { AiOutlineBulb } from "react-icons/ai";
import { Menu } from "antd";

// Define category names and corresponding icons
const categories = [
  { name: "All Notes", icon: <FiFolder /> },
  { name: "Work", icon: <FiBriefcase /> },
  { name: "Personal", icon: <FiUser /> },
  { name: "Ideas", icon: <AiOutlineBulb /> },
  { name: "To-Do", icon: <FiCheckSquare /> },
];

const Sidebar = ({ onSelectCategory, isOpen, setIsOpen }: { 
  onSelectCategory: (category: string) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}) => {
  const [activeCategory, setActiveCategory] = useState("All Notes");

  const items = categories.map(({ name, icon }) => ({
    key: name,
    icon: <span className="text-gray-600 text-lg">{icon}</span>,
    label: <span className="text-gray-700">{name}</span>,
  }));

  return (
    <>
      {/* Sidebar Toggle Button (Visible on Mobile) */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-[#FF9800] text-white p-2 rounded-lg shadow-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        <FiMenu size={24} />
      </button>

      {/* Sidebar Panel */}
      <div
        className={`fixed md:relative top-0 left-0 h-full w-64 bg-white shadow-lg p-5 transition-transform z-40 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:w-72`}
      >
        <h2 className="text-xl font-semibold mb-6 text-gray-800">Categories</h2>
        <Menu
          mode="vertical"
          selectedKeys={[activeCategory]}
          onClick={({ key }) => {
            setActiveCategory(key as string);
            onSelectCategory(key as string);
            setIsOpen(false); // ✅ Close sidebar after selection on mobile
          }}
          className="bg-transparent border-none"
          items={items.map((item) => ({
            ...item,
            className: activeCategory === item.key ? "bg-gray-100 rounded-lg font-semibold" : "",
          }))}
        />
      </div>
    </>
  );
};

export default Sidebar;
