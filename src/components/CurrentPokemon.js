import React, { useEffect, useState } from "react";
import styled from "styled-components/macro";

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
  text-align: right;
`;

export const CurrentPokemon = ({ currentPokemon, setCurrentPokemon }) => {
  const [pokemon, setPokemon] = useState({});
  const [sprites, setSprites] = useState({});
  const [back, setBack] = useState(false);

  useEffect(() => {
    fetch(currentPokemon)
      .then((res) => res.json())
      .then((json) => {
        setPokemon(json);
        setSprites(json.sprites);
      });
  }, [currentPokemon]);

  const weightFormat = (weight) => {
    if (weight < 10) return weight + "hg";
    return weight / 10 + "kg";
  };

  const heightFormat = (height) => {
    if (height < 10) return height + "dm";
    return height / 10 + "m";
  };

  return (
    <section>
      <button
        onClick={() => {
          setBack(true);
          setCurrentPokemon();
        }}
      >
        Back
      </button>
      {pokemon.name && !back && (
        <>
          <CurrentPokemonName>
            {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
          </CurrentPokemonName>
          <WrapperRow>
            <img src={sprites.front_default} alt={pokemon.name} />
            <WrapperCol>
              <CurrentPokemonInfo>_id: {pokemon.id}</CurrentPokemonInfo>
              <CurrentPokemonInfo>
                Height: {heightFormat(pokemon.height)}
              </CurrentPokemonInfo>
              <CurrentPokemonInfo>
                Weight: {weightFormat(pokemon.weight)}
              </CurrentPokemonInfo>
            </WrapperCol>
          </WrapperRow>
        </>
      )}
    </section>
  );
};
