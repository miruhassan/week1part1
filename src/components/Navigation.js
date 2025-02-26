import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navigation = () => {
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedSearchInput = localStorage.getItem("lastSearchInput");
    if (storedSearchInput) setSearchInput(storedSearchInput);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      localStorage.setItem("lastSearchInput", searchInput);

      const searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
      if (!searchHistory.includes(searchInput)) {
        const updatedHistory = [searchInput, ...searchHistory].slice(0, 10);
        localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
      }

      const searchEvents = JSON.parse(localStorage.getItem("searchEvents")) || [];
      const newEvent = {
        event: "search",
        query: searchInput,
        timestamp: new Date().toISOString(),
      };
      localStorage.setItem("searchEvents", JSON.stringify([newEvent, ...searchEvents].slice(0, 20)));

      navigate(`/searchresults?query=${encodeURIComponent(searchInput)}`);
      setSearchInput("");
    }
  };

  const handleNavigation = (page) => {
    localStorage.setItem("lastPageVisited", page);

    const navEvents = JSON.parse(localStorage.getItem("navigationEvents")) || [];
    const newEvent = {
      event: "navigation",
      page,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem("navigationEvents", JSON.stringify([newEvent, ...navEvents].slice(0, 20)));
  };

  return (
    <nav>
      <ul>
        <li>
          <Link to="/" onClick={() => handleNavigation("/")}> 
            <i className="fas fa-home"></i> StreamList
          </Link>
        </li>
        <li><Link to="/movies" onClick={() => handleNavigation("/movies")}>Movies</Link></li>
        <li><Link to="/cart" onClick={() => handleNavigation("/cart")}>Cart</Link></li>
        <li><Link to="/about" onClick={() => handleNavigation("/about")}>About</Link></li>
        <li><Link to="/nowplaying" onClick={() => handleNavigation("/nowplaying")}>Now Playing</Link></li>
        <li>
          <form onSubmit={handleSearch} className="search-form">
            <input
              type="text"
              placeholder="Search movies..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="search-input"
            />
            <button type="submit" className="search-button">
              <i className="fas fa-search"></i>
            </button>
          </form>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
