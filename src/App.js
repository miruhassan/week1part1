import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation";
import StreamList from "./components/StreamList";
import Movies from "./components/Movies";
import Cart from "./components/Cart";
import About from "./components/About";
import "./App.css";
import NowPlaying from "./components/NowPlaying";
import SearchResults from "./components/SearchResults";

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <Routes>
          <Route path="/" element={<StreamList />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/about" element={<About />} />
          <Route path="/nowplaying" element={<NowPlaying />} />
          <Route path="/searchresults" element={<SearchResults />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
