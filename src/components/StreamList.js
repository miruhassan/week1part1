import React, { useState } from "react";

const StreamList = () => {
  const [list, setList] = useState([]);
  const [input, setInput] = useState("");

  const addToList = () => {
    if (input.trim() !== "") {
      setList([...list, input]);
      setInput("");
    }
  };

  return (
    <div>
      <h1>StreamList</h1>
      <input 
        type="text" 
        placeholder="Add a movie or show..." 
        value={input} 
        onChange={(e) => setInput(e.target.value)} 
      />
      <button onClick={addToList}>Add</button>
      <ul>
        {list.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default StreamList;
