import React, { useState } from "react";
import styled from "styled-components/macro";

const PaginationButton = styled.button`
  background: none;
  border: none;
  font-size: 1rem;
  margin: 1rem;

  &:hover:enabled {
    cursor: pointer;
  }
`;

const PaginationText = styled.p`
  font-size: 1rem;
  margin: 1rem 0;
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
  const [pageCount, setPageCount] = useState(1);

  return (
    <Wrapper>
      <>
        {!currentPokemon && (
          <>
            {/* PREV BUTTON STARTS HERE */}
            <PaginationButton
              disabled={prevPage === null ? true : false}
              onClick={() => {
                setCurrentPageUrl(prevPage);
                setPageCount(pageCount - 1);
              }}
            >
              &lt;
            </PaginationButton>
            <PaginationText>{pageCount}</PaginationText>
            {/* NEXT BUTTON STARTS HERE */}
            <PaginationButton
              disabled={nextPage === null ? true : false}
              onClick={() => {
                setCurrentPageUrl(nextPage);
                setPageCount(pageCount + 1);
              }}
            >
              &gt;
            </PaginationButton>
          </>
        )}
      </>
    </Wrapper>
  );
};
