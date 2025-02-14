import React, { useState, useEffect } from "react";
import { FiFolder, FiBriefcase, FiUser, FiCheckSquare } from "react-icons/fi";
import { AiOutlineBulb } from "react-icons/ai";
import { Menu } from "antd";

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

  // Close sidebar when clicking outside (for mobile)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const sidebar = document.getElementById("sidebar");
      if (sidebar && !sidebar.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, setIsOpen]);

  const items = categories.map(({ name, icon }) => ({
    key: name,
    icon: <span className="text-gray-600 text-lg">{icon}</span>,
    label: <span className="text-gray-700">{name}</span>,
  }));

  return (
    <>
      {/* Overlay to close sidebar when clicking outside */}
      {isOpen && <div className="fixed inset-0 bg-black bg-opacity-30 md:hidden" onClick={() => setIsOpen(false)}></div>}

      {/* Sidebar Panel */}
      <div
        id="sidebar"
        className={`fixed md:relative top-0 left-0 h-full w-64 bg-white shadow-lg p-5 transition-transform z-50 ${
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
            setIsOpen(false);
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
