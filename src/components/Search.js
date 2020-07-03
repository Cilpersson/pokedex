import React, { useState, useEffect } from "react";

export const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [search, setSearch] = useState(false);
  const SEARCH_URL = `https://pokeapi.co/api/v2/pokemon-species/${searchTerm}`;

  const handleSubmit = (event) => {
    event.preventDefault();
    setSearch(true);
    console.log(searchTerm);
  };

  useEffect(() => {
    if (search) {
      fetch(SEARCH_URL)
        .then((res) => res.json())
        .then((json) => {
          console.log(json);
        });
    }
  }, [search, SEARCH_URL]);

  return (
    <form onSubmit={(event) => handleSubmit(event)}>
      <label>
        <input
          placeholder="Pikachu"
          onChange={(event) => setSearchTerm(event.target.value)}
        ></input>
      </label>
      <button type="submit">Search</button>
    </form>
  );
};
