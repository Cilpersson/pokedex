import React, { useState, useEffect } from "react";

export const Search = ({ setCurrentPokemon, currentPokemon }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [search, setSearch] = useState(false);
  const [error, setError] = useState("");
  const SEARCH_URL = `https://pokeapi.co/api/v2/pokemon-species/${searchTerm}`;

  const handleSubmit = (event) => {
    event.preventDefault();
    setSearch(true);
  };

  useEffect(() => {
    if (search) {
      fetch(SEARCH_URL)
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          throw new Error(`Could not find ${searchTerm}`);
        })
        .then((json) => {
          setCurrentPokemon(`https://pokeapi.co/api/v2/pokemon/${json.id}`);
          setSearch(false);
        })
        .catch((err) => {
          setError(`Could not find ${searchTerm}`);
        });
    }
  }, [search, SEARCH_URL, searchTerm, setCurrentPokemon]);

  return (
    <form onSubmit={(event) => handleSubmit(event)}>
      <label>
        {error}
        <input
          placeholder="Pikachu"
          value={searchTerm}
          onFocus={() => {
            setSearchTerm("");
            setError("");
            setSearch(false);
          }}
          onChange={(event) => {
            setSearchTerm(event.target.value.toLowerCase());
            setError("");
          }}
        />
      </label>
      <button type="submit">Search</button>
    </form>
  );
};
