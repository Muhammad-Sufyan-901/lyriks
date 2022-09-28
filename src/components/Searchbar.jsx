import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Searchbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (searchTerm === "") navigate("/");

    navigate(`/search/${searchTerm}`);
  };

  return (
    <form onSubmit={handleSubmit} autoComplete="off" className="p-2 text-gray-400 focus-within:text-gray-600">
      <label htmlFor="search-field" className="sr-only">
        Search All Songs
      </label>
      <div className="flex flex-row justify-start items-center">
        <FiSearch className="w-5 h-5 ml-4" />
        <input
          onChange={(event) => setSearchTerm(event.target.value)}
          value={searchTerm}
          type="search"
          name="search-field"
          autoComplete="off"
          id="search-field"
          placeholder="Search..."
          className="flex-1 bg-transparent border-none outline-none placeholder-gray-400 text-base text-white p-4"
        />
      </div>
    </form>
  );
};

export default Searchbar;
