import React, { useState } from "react";

const CompletedTaskCard = ({ task, handleDelete, handleHide }) => {
  const handleDeleteClick = () => {
    handleDelete(task.id);
  };

  const handleHideClick = () => {
    handleHide(task.id);
  };

  const [display, setDisplay] = useState(true);

  const toggleDisplay = () => {
    setDisplay(!display);
  };

  return display ? (
    <div className="p-4 mb-4 bg-gray-200 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-2">{task.title}</h3>
      <p className="text-gray-600">{task.description}</p>
      <div className="flex items-center mt-4">
        <button
          className="px-4 py-2 bg-black text-white font-semibold rounded-md hover:bg-gray-700"
          onClick={toggleDisplay}>
          Hide
        </button>
      </div>
    </div>
  ) : null;
};

export default CompletedTaskCard;
