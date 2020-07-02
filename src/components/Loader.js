import React from "react";
import pokeball from "../images/pokeball.png";
import styled, { keyframes } from "styled-components/macro";

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const LoadingAnimation = styled.img`
  max-width: 5rem;
  margin: auto;
  display: block;
  animation: ${rotate} 2s linear infinite;
`;

export const Loader = ({ loading }) => {
  return <>{loading && <LoadingAnimation src={pokeball}></LoadingAnimation>}</>;
};
