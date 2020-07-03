import React, { useEffect, useState } from "react";
import styled from "styled-components/macro";
import { Loader } from "./Loader";

const WrapperCol = styled.section`
  display: flex;
  flex-direction: column;
`;

const WrapperRow = styled.section`
  display: flex;
  justify-content: center;
`;

const CurrentPokemonName = styled.h2`
  text-align: center;
`;

const CurrentPokemonInfo = styled.h3`
  text-align: left;
`;

const Button = styled.button`
  background: none;
  width: fit-content;
  min-width: 8rem;
  padding: 0.5rem;
  margin: 0 auto 1.5rem;

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
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PokemonImg = styled.img`
  background-color: #b0bf2d;
  background-size: 4px 4px;
  background-image: linear-gradient(to right, grey 1px, transparent 1px),
    linear-gradient(to bottom, grey 1px, transparent 1px);
`;

const Pokedex = styled.section`
  background-color: #d60a2d;
`;

export const CurrentPokemon = ({
  currentPokemon,
  setCurrentPokemon,
  loading,
  setLoading,
}) => {
  const [pokemon, setPokemon] = useState({});
  const [sprites, setSprites] = useState({});
  const [back, setBack] = useState(false);

  useEffect(() => {
    if (currentPokemon) {
      setLoading(true);
      fetch(currentPokemon)
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          throw new Error(`Could not get pokemon`);
        })
        .then((json) => {
          setPokemon(json);
          setSprites(json.sprites);
          setLoading(false);
        });
    }
  }, [currentPokemon, setLoading]);

  const weightFormat = (weight) => {
    if (weight < 10) return weight + "hg";
    return weight / 10 + "kg";
  };

  const heightFormat = (height) => {
    if (height < 10) return height + "dm";
    return height / 10 + "m";
  };

  return (
    <Section>
      <Button
        onClick={() => {
          setBack(true);
          setCurrentPokemon();
        }}
      >
        Back
      </Button>

      {pokemon.name && !back && !loading && (
        <Pokedex>
          <CurrentPokemonName>
            {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
          </CurrentPokemonName>
          <WrapperRow>
            <WrapperCol>
              <CurrentPokemonInfo>_id: {pokemon.id}</CurrentPokemonInfo>
              <CurrentPokemonInfo>
                Height: {heightFormat(pokemon.height)}
              </CurrentPokemonInfo>
              <CurrentPokemonInfo>
                Weight: {weightFormat(pokemon.weight)}
              </CurrentPokemonInfo>
            </WrapperCol>{" "}
            <PokemonImg src={sprites.front_default} alt={pokemon.name} />
          </WrapperRow>
        </Pokedex>
      )}
      {loading && <Loader />}
    </Section>
  );
};
