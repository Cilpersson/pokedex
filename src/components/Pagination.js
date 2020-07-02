import React from "react";
import styled from "styled-components/macro";

const PaginationButton = styled.button`
  background: none;
  border: none;
  font-size: 1rem;

  &:hover:enabled {
    cursor: pointer;
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export const Pagination = ({
  prevPage,
  nextPage,
  setCurrentPageUrl,
  currentPokemon,
}) => {
  return (
    <Wrapper>
      <>
        {!currentPokemon && (
          <PaginationButton
            disabled={prevPage === null ? true : false}
            onClick={() => setCurrentPageUrl(prevPage)}
          >
            {"<"}
          </PaginationButton>
        )}
        {!currentPokemon && (
          <PaginationButton
            disabled={nextPage === null ? true : false}
            onClick={() => setCurrentPageUrl(nextPage)}
          >
            {">"}
          </PaginationButton>
        )}
      </>
    </Wrapper>
  );
};
