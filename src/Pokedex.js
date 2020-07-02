import React, { useEffect, useState } from "react";
import { CurrentPokemon } from "./CurrentPokemon";
import { Pagination } from "./Pagination";

export const Pokedex = () => {
  const [pokemons, setPokemons] = useState([]);
  const [currentPokemon, setCurrentPokemon] = useState();
  const [currentPageUrl, setCurrentPageUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon?limit=20&offset=0"
  );
  const [loading, setLoading] = useState(true);
  const [nextPage, setNextPage] = useState();
  const [prevPage, setPrevPage] = useState();

  useEffect(() => {
    setLoading(true);
    fetch(currentPageUrl)
      .then((res) => res.json())
      .then((json) => {
        setLoading(false);
        setPokemons(json.results);
        setNextPage(json.next);
        setPrevPage(json.previous);
      });
  }, [currentPageUrl]);

  return (
    <>
      {loading && <h4>LOADING</h4>}
      {currentPokemon && !loading && (
        <CurrentPokemon
          currentPokemon={currentPokemon}
          setCurrentPokemon={setCurrentPokemon}
        />
      )}
      {!currentPokemon && !loading && (
        <section>
          {pokemons.map((pokemon) => (
            <button
              key={pokemon.name}
              onClick={() => setCurrentPokemon(pokemon.url)}
            >
              {pokemon.name}
            </button>
          ))}
        </section>
      )}

      <Pagination
        currentPokemon={currentPokemon}
        prevPage={prevPage}
        nextPage={nextPage}
        setCurrentPageUrl={setCurrentPageUrl}
      />
    </>
  );
};
