import styled from "styled-components";

export const Header = styled.h1`
  margin-bottom: 6.625rem;
  font-size: 16px;
  letter-spacing: 10px;
  font-weight: 100;

  @media (min-width: 768px) {
    margin-bottom: 17rem; /* 272px */
  }

  @media (min-width: 1024px) {
    margin-bottom: 7.25rem; /* 116px */
  }
`;
