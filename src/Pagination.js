import React from "react";

export const Pagination = ({
  prevPage,
  nextPage,
  setCurrentPageUrl,
  currentPokemon,
}) => {
  return (
    <>
      {prevPage !== null && !currentPokemon && (
        <button onClick={() => setCurrentPageUrl(prevPage)}>Previous</button>
      )}
      {nextPage !== null && !currentPokemon && (
        <button onClick={() => setCurrentPageUrl(nextPage)}>Next</button>
      )}
    </>
  );
};
