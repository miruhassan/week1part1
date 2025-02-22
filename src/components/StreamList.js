import React, { useState } from "react";

const StreamList = () => {
  const [list, setList] = useState([]);
  const [input, setInput] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editInput, setEditInput] = useState("");

  const addToList = () => {
    if (input.trim() !== "") {
      setList([...list, { text: input, completed: false }]);
      setInput("");
    }
  };

  const deleteItem = (index) => {
    setList(list.filter((_, i) => i !== index));
  };

  const toggleComplete = (index) => {
    setList(
      list.map((item, i) =>
        i === index ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const startEdit = (index) => {
    setEditIndex(index);
    setEditInput(list[index].text);
  };

  const saveEdit = (index) => {
    if (editInput.trim() !== "") {
      setList(
        list.map((item, i) => (i === index ? { ...item, text: editInput } : item))
      );
      setEditIndex(null);
      setEditInput("");
    }
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
