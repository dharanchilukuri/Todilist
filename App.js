import React from "react";
import ReactDOM from "react-dom/client";
import { useState } from "react";

const TaskList = () => {
  const [items, setList] = useState(['Book train tickets', 'Cancel subscription']);
  const [input, setInput] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [tempInput, setTempInput] = useState('');

  const addTask = () => {
    if (input.trim() !== '') {
      setList([...items, input]);
      setInput('');
    } else {
      alert('Please enter a task');
    }
  };

  const updateList = (index, newValue) => {
    const updatedItems = items.map((item, i) =>
      i === index ? newValue : item
    );
    setList(updatedItems);
    setEditIndex(null);
  };

  const handleEditClick = (index) => {
    setEditIndex(index);
    setTempInput(items[index]);
  };

  const handleBlur = (index) => {
    updateList(index, tempInput);
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Enter') {
      updateList(index, tempInput);
    }
  };

  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter') {
      addTask();
    }
  };

  const deleteListItem = (key) => setList(items.filter((_, index) => index !== key));

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Task List</h1>
        <div className="flex mb-4">
          <input
            type="text"
            placeholder="Enter task"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleInputKeyDown}
            className="flex-grow border rounded-l-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={addTask}
            className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 transition-colors"
          >
            Add task
          </button>
        </div>
        <div className="overflow-y-auto max-h-60"> {/* Add this div for scrollable list */}
          <ul className="space-y-3">
            {items.map((item, index) => (
              <li
                key={index}
                className="flex justify-between items-center bg-gray-100 p-2 rounded-md hover:bg-gray-200"
              >
                {editIndex === index ? (
                  <input
                    type="text"
                    value={tempInput}
                    onChange={(e) => setTempInput(e.target.value)}
                    onBlur={() => handleBlur(index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    autoFocus
                    className="flex-grow border px-2 py-1 rounded outline-none focus:ring-2 focus:ring-blue-400"
                  />
                ) : (
                  <span
                    onClick={() => handleEditClick(index)}
                    className="flex-grow cursor-pointer"
                  >
                    {item}
                  </span>
                )}
                <button
                  onClick={() => deleteListItem(index)}
                  className="text-red-500 hover:text-red-700 ml-4 transition-colors"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TaskList;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<TaskList />);
