import React, { useEffect, useState } from "react";

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
          <h2>
            {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
          </h2>
          <img src={sprites.front_default} alt={pokemon.name}></img>
          <h3>_id: {pokemon.id}</h3>
          <h3>Height: {heightFormat(pokemon.height)}</h3>
          <h3>Weight: {weightFormat(pokemon.weight)}</h3>
        </>
      )}
    </section>
  );
};
