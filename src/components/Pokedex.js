import React, { useEffect, useState } from "react";
import { CurrentPokemon } from "./CurrentPokemon";
import { Pagination } from "./Pagination";
import { Loader } from "./Loader";
import { Search } from "./Search";
import styled from "styled-components/macro";

const PokemonButton = styled.button`
  background: none;
  border: 1px solid black;
  width: 8rem;
  padding: 0.5rem;
  margin: 0 auto;

  &:hover {
    cursor: pointer;
  }
`;

const Section = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(8rem, 1fr));
  grid-auto-rows: 3rem;
  max-width: 30rem;
  margin: auto;
  gap: 0.5rem;
`;

const Title = styled.img`
  width: 100%;
  max-width: 40rem;
  margin: 2rem auto;
  display: block;
`;

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
        console.log(json);
        setLoading(false);
        setPokemons(json.results);
        setNextPage(json.next);
        setPrevPage(json.previous);
      });
  }, [currentPageUrl]);

  return (
    <>
      <Title
        src="https://fontmeme.com/permalink/200702/fadb68e47232ec9709ca82d9e274a4a6.png"
        alt="Pokemon written in pokemon font"
        border="0"
      />
      <Loader loading={loading} />
      {currentPokemon && !loading && (
        <CurrentPokemon
          currentPokemon={currentPokemon}
          setCurrentPokemon={setCurrentPokemon}
        />
      )}
      {!currentPokemon && !loading && (
        <Section>
          {pokemons.map((pokemon) => (
            <PokemonButton
              key={pokemon.name}
              onClick={() => setCurrentPokemon(pokemon.url)}
            >
              <div>
                {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
              </div>
            </PokemonButton>
          ))}
        </Section>
      )}

      <Pagination
        currentPokemon={currentPokemon}
        prevPage={prevPage}
        nextPage={nextPage}
        setCurrentPageUrl={setCurrentPageUrl}
      />
      <Search />
    </>
  );
};
