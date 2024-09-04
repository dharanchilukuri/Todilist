import React from "react";
import ReactDOM from "react-dom/client";
import { useState, useEffect } from "react";



import React, { useState } from 'react';

const TaskList = () => {
  const [items, setList] = useState(['first', 'second']);
  const [input, setInput] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  const updateList = (newItem) => {
    if (editIndex !== null) {
      // Editing an existing item
      const updatedItems = items.map((item, index) =>
        index === editIndex ? newItem : item
      );
      setList(updatedItems);
      setEditIndex(null); // Reset editIndex
    } else {
      // Adding a new item
      setList([...items, newItem]);
    }
    setInput(''); // Clear the input field
  };

  const editListItem = (key) => {
    setInput(items[key]); // Set input to the current value of the item
    setEditIndex(key); // Set the index of the item being edited
  };

  const deleteListItem = (key) => setList(items.filter((_, index) => index !== key));

  return (
    <div>
      <input
        type="text"
        placeholder="enter task"
        value={input}
        onInput={(e) => setInput(e.target.value)}
      />
      <button
        onClick={() => {
          if (input === '') {
            alert('Enter a task');
          } else {
            updateList(input);
          }
        }}
      >
        {editIndex !== null ? 'Save' : 'Add task'}
      </button>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            {item}
            <button onClick={() => editListItem(index)}>Edit</button>
            <button onClick={() => deleteListItem(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<TaskList />);


