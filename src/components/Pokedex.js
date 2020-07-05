import React, { useEffect, useState } from "react";
import { CurrentPokemon } from "./CurrentPokemon";
import { Pagination } from "./Pagination";
import { Loader } from "./Loader";
import { Search } from "./Search";
import styled from "styled-components/macro";

const PokemonButton = styled.button`
  background: none;
  width: fit-content;
  min-width: 8rem;
  padding: 0.5rem;
  margin: 0 auto;

  font-size: 1rem;
  color: #8c8c8c;
  font-weight: 500;

  transition: all 0.2s;
  border: none;

  border-radius: 1.4rem;

  background: #ffffff;
  box-shadow: 0.3rem 0.3rem 1rem 0px #d9d9d9, -0.4rem -0.4rem 1rem #fff;

  &:hover {
    cursor: pointer;
    background-position: right;

    box-shadow: 0.3rem 0.3rem 1rem 0px #fff, -0.4rem -0.4rem 1rem #fff;
    background: linear-gradient(145deg, #e6e6e6, #ffffff);
    box-shadow: 0.3rem 0.3rem 1rem 0px #d9d9d9, -0.4rem -0.4rem 1rem #ffffff;
  }

  &:active {
    color: #8c8c8c;
    box-shadow: inset 0.3rem 0.3rem 1rem 0px #d9d9d9,
      inset -0.4rem -0.4rem 1rem #fff;
  }

  &:focus {
    outline: none;
  }
`;

const Section = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
  grid-auto-rows: 3rem;
  max-width: 35rem;
  margin: auto;
  gap: 1rem;
  row-gap: 1rem;
`;

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 1rem 0 2rem;
`;

const TitleImg = styled.img`
  width: 100%;
  max-width: 40rem;
  margin: 2rem auto;
  display: block;
  filter: drop-shadow(0 0 0.75rem #356abd98);
`;

const Title = styled.h1`
  text-align: center;
  color: #8c8c8c;
  margin: 0;
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
        setLoading(false);
        setPokemons(json.results);
        setNextPage(json.next);
        setPrevPage(json.previous);
      });
  }, [currentPageUrl]);

  return (
    <>
      <TitleImg
        src="https://fontmeme.com/permalink/200702/fadb68e47232ec9709ca82d9e274a4a6.png"
        alt="Pokemon written in pokemon font"
        border="0"
      />
      {!currentPokemon && !loading && (
        <>
          <Title>SEARCH OR CLICK</Title>
          <Wrapper>
            <Search
              currentPokemon={currentPokemon}
              setCurrentPokemon={setCurrentPokemon}
            />
          </Wrapper>
        </>
      )}
      <Loader loading={loading} />
      {currentPokemon && (
        <CurrentPokemon
          loading={loading}
          setLoading={setLoading}
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
              {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
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
    </>
  );
};
