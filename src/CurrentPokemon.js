import React, { useEffect, useState } from "react";

export const CurrentPokemon = ({ currentPokemon }) => {
  const [pokemon, setPokemon] = useState({});
  const [sprites, setSprites] = useState({});

  useEffect(() => {
    fetch(currentPokemon)
      .then((res) => res.json())
      .then((json) => {
        setPokemon(json);
        setSprites(json.sprites);
        console.log("This is current pokemon json: ", json);
      });
  }, [currentPokemon]);

  return (
    <section>
      <h2>Name: {pokemon.name}</h2>
      <h3>Height: {pokemon.height}</h3>
      <h3>Weight: {pokemon.weight}</h3>
      <img src={sprites.front_default} alt={pokemon.name}></img>
    </section>
  );
};
