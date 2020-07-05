import React, { useEffect, useState } from "react";
import styled from "styled-components/macro";
import { Loader } from "./Loader";

const WrapperCol = styled.section`
  display: flex;
  flex-direction: column;
  /* z-index: 100;
  position: absolute; */
`;

const WrapperColAbs = styled(WrapperCol)`
  z-index: 100;
  position: absolute;
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
  display: block;
  margin: 0 0.2rem;
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
  display: block;
  margin: auto;
  width: 55%;
  filter: drop-shadow(0 0 0.75rem #24270980);
`;

const Pokedex = styled.section`
  background-image: linear-gradient(to left, #b5102c, #d60a2d 37%, #f10d34);
  border-radius: 0.01rem;
  overflow: hidden;
  padding: 1.5rem;
  width: 18rem;
  height: 25rem;
  flex-direction: column;
  display: flex;
  justify-content: flex-end;

  &::before {
    /* content: "";
    background: blue; */
    /* background-image: linear-gradient(to right, #b5102c, #d60a2d 4%, #f10d34); */
    /* overflow: hidden;
    padding: -0.5rem;
    width: 18rem;
    height: 25rem;
    position: absolute;

    background-position: center; */
  }
`;

const Dot = styled.div`
  background-color: #d60a2d;
  height: 0.5rem;
  width: 0.5rem;
  position: absolute;
  border-radius: 50%;

  display: flex;
  background-color: #d60a2d;
  height: 0.5rem;
  width: 0.5rem;
  position: absolute;
  border-radius: 50%;
  z-index: 100;
  align-self: flex-end;
`;

const PokedexRight = styled.section`
  clip-path: polygon(
    35% 1%,
    55% 15%,
    56% 16%,
    100% 16%,
    100% 100%,
    50% 100%,
    0 100%,
    0% 70%,
    0 0,
    32% 0
  );
  background-image: linear-gradient(to right, #b5102c, #d60a2d 4%, #f10d34);
  border-radius: 0.01rem;
  overflow: hidden;
  padding: 1.5rem;
  width: 18rem;
  height: 25rem;
  position: relative;
  background: #b5102c;

  &::before {
    content: "";
    clip-path: polygon(
      35% 1%,
      55% 15%,
      56% 16%,
      100% 16%,
      100% 100%,
      50% 100%,
      0 100%,
      0% 70%,
      0 0,
      32% 0
    );
    background-image: linear-gradient(to right, #b5102c, #d60a2d 4%, #f10d34);
    overflow: hidden;
    padding: -0.5rem;
    width: 98%;
    height: 97%;
    position: absolute;
    top: 6px;
    left: 1px;
    background-position: center;
  }
`;

const PokedexCenter = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  padding: 1.5rem 0;

  background-color: #d60a2d;
  width: 1.5rem;
  border-left: 0.1rem solid #a50f2880;
  border-right: 0.1rem solid #a50f2880;
  background-image: linear-gradient(
    to right,
    #b5102c,
    #d60a2d 30%,
    #f92045 50%,
    #d60a2d 70%,
    #b5102c
  );
`;

const Display = styled.div`
  display: flex;
  background-color: #b0bf2d;
  box-shadow: inset 0 0 0.5rem 0.2rem #6a731c;
  background-size: 4px 4px;
  background-image: linear-gradient(to right, grey 1px, transparent 1px),
    linear-gradient(to bottom, grey 1px, transparent 1px);
  background-image: linear-gradient(
      to right,
      #464d1245 0.04rem,
      transparent 0.04rem
    ),
    linear-gradient(to bottom, #464d1245 0.04rem, transparent 0.04rem);
  border: 1rem solid lightgrey;
  border-width: 1rem 1rem 2rem 1rem;
  margin: 0 auto 1rem;
  width: 100%;
  height: 13rem;
  clip-path: polygon(100% 0, 100% 100%, 14% 100%, 0 84%, 0 0);
`;

const Filler = styled.div`
  height: 3.5rem;
`;

const Curve = styled.div`
  border-top: 0.1rem solid #b5102c;
  border-radius: 50%;
  width: 1.5rem;
  height: 0.5rem;
  margin: 0.1rem 0;
`;

const DisplayWrap = styled.div`
  filter: drop-shadow(6px 6px 6px #650919);
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
          console.log(json);
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

  const textFact = (wordOrWords) => {
    let popularWord = "";
    wordOrWords.forEach((word, index) => {
      if (wordOrWords.length - index === 1) {
        popularWord += ` ${
          word.type.name.charAt(0).toUpperCase() + word.type.name.slice(1)
        }`;
      } else if (wordOrWords.length - index > 2) {
        popularWord += ` ${
          word.type.name.charAt(0).toUpperCase() + word.type.name.slice(1)
        }, `;
      } else {
        popularWord += ` ${
          word.type.name.charAt(0).toUpperCase() + word.type.name.slice(1)
        } & `;
      }
    });
    return popularWord;
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
        <WrapperRow>
          <Pokedex>
            <DisplayWrap>
              <Display>
                <PokemonImg src={sprites.front_default} alt={pokemon.name} />
              </Display>
            </DisplayWrap>
            <WrapperRow>
              <CurrentPokemonInfo>
                {pokemon.types.length > 1 ? "Types: " : "Type: "}
              </CurrentPokemonInfo>
              <CurrentPokemonInfo>{textFact(pokemon.types)}</CurrentPokemonInfo>
            </WrapperRow>
          </Pokedex>
          <PokedexCenter>
            <WrapperCol>
              <Curve />
              <Curve />
            </WrapperCol>
            <WrapperCol>
              <Curve />
              <Curve />
            </WrapperCol>
          </PokedexCenter>
          <PokedexRight>
            <WrapperColAbs>
              <Filler></Filler>
              <CurrentPokemonName>
                {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
              </CurrentPokemonName>
              <CurrentPokemonInfo>_id: {pokemon.id}</CurrentPokemonInfo>
              <CurrentPokemonInfo>
                Height: {heightFormat(pokemon.height)}
              </CurrentPokemonInfo>
              <CurrentPokemonInfo>
                Weight: {weightFormat(pokemon.weight)}
              </CurrentPokemonInfo>
            </WrapperColAbs>
          </PokedexRight>
        </WrapperRow>
      )}
      {loading && <Loader />}
    </Section>
  );
};
