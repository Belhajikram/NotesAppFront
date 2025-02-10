import React, { useState } from "react";
import { FiFolder, FiBriefcase, FiUser, FiCheckSquare } from "react-icons/fi";
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

const Sidebar = ({ onSelectCategory }: { onSelectCategory: (category: string) => void }) => {
  const [activeCategory, setActiveCategory] = useState("All Notes");

  const items = categories.map(({ name, icon }) => ({
    key: name,
    icon: <span className="text-gray-600 text-lg">{icon}</span>,
    label: <span className="text-gray-700">{name}</span>,
  }));

  return (
    <div className="w-72 h-screen bg-white shadow-lg rounded-r-xl p-5 flex flex-col">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">Categories</h2>
      <Menu
        mode="vertical"
        selectedKeys={[activeCategory]}
        onClick={({ key }) => {
          setActiveCategory(key as string);
          onSelectCategory(key as string);
        }}
        className="bg-transparent border-none"
        items={items.map((item) => ({
          ...item,
          className: activeCategory === item.key ? "bg-gray-100 rounded-lg font-semibold" : "",
        }))}
      />
    </div>
  );
};

export default Sidebar;
