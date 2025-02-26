import React, { useState, useEffect } from "react";

const StreamList = () => {
  const [list, setList] = useState([]);
  const [input, setInput] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editInput, setEditInput] = useState("");

  useEffect(() => {
    const savedList = localStorage.getItem("streamList");
    if (savedList) setList(JSON.parse(savedList));
  }, []);

  useEffect(() => {
    localStorage.setItem("streamList", JSON.stringify(list));
  }, [list]);

  const addToList = () => {
    if (input.trim() !== "") {
      const newItem = { text: input, completed: false, addedAt: new Date().toISOString() };
      setList([...list, newItem]);
      setInput("");
      saveEvent("add", newItem);
    }
  };

  const deleteItem = (index) => {
    saveEvent("delete", list[index]);
    setList(list.filter((_, i) => i !== index));
  };

  const toggleComplete = (index) => {
    const updatedItem = {
      ...list[index],
      completed: !list[index].completed,
      completedAt: !list[index].completed ? new Date().toISOString() : null,
    };
    setList(list.map((item, i) => (i === index ? updatedItem : item)));
    saveEvent("toggleComplete", updatedItem);
  };

  const startEdit = (index) => {
    setEditIndex(index);
    setEditInput(list[index].text);
    saveEvent("startEdit", list[index]);
  };

  const saveEdit = (index) => {
    if (editInput.trim() !== "") {
      const updatedItem = { ...list[index], text: editInput, editedAt: new Date().toISOString() };
      setList(list.map((item, i) => (i === index ? updatedItem : item)));
      setEditIndex(null);
      setEditInput("");
      saveEvent("saveEdit", updatedItem);
    }
  };

  const saveEvent = (action, item) => {
    const events = JSON.parse(localStorage.getItem("streamListEvents")) || [];
    const newEvent = {
      action,
      item,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem("streamListEvents", JSON.stringify([newEvent, ...events].slice(0, 20)));
  };

  return (
    <div className="container">
      <h1>StreamList</h1>
      <input
        type="text"
        placeholder="Add a movie or show..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === "Enter") addToList();
        }}
      />
      <button onClick={addToList}>Add</button>

      <ul className="list">
        {list.map((item, index) => (
          <li key={index} className={item.completed ? "completed" : ""}>
            {editIndex === index ? (
              <div className="edit-mode">
                <input
                  type="text"
                  value={editInput}
                  onChange={(e) => setEditInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") saveEdit(index);
                  }}
                />
                <button className="icon-button" onClick={() => saveEdit(index)}>
                  <i className="fas fa-save"></i>
                </button>
              </div>
            ) : (
              <div className="list-item">
                <span className="movie-title">{item.text}</span>
                <div className="actions">
                  <button
                    className="icon-button"
                    title={item.completed ? "Undo" : "Complete"}
                    onClick={() => toggleComplete(index)}
                  >
                    <i className={`fas ${item.completed ? "fa-undo" : "fa-check"}`}></i>
                  </button>
                  <button
                    className="icon-button"
                    title="Edit"
                    onClick={() => startEdit(index)}
                  >
                    <i className="fas fa-edit"></i>
                  </button>
                  <button
                    className="icon-button"
                    title="Delete"
                    onClick={() => deleteItem(index)}
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StreamList;
