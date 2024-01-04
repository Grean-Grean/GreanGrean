import React from "react";
import styled, { css } from "styled-components";
import { Link, useLocation } from "react-router-dom";

const Container = styled.div`
  margin: 20px 0 20px 0;
  font-size: 1.5rem;

  &:hover {
    cursor: pointer;
  }

  a {
    text-decoration: none;
    color: ${({ theme }) => theme.textColor};
  }

  ${({ focus, theme }) => {
    if (focus) {
      return css`
        scale: 1.1;
        border-bottom: 2px solid ${theme.textColor};
      `;
    }
  }}
`;

const MenuItem = ({ menuName, path }) => {
  const { pathname } = useLocation();
  const focus = pathname === path ? true : false;
  return (
    <Container focus={focus}>
      <Link to={path}>{menuName}</Link>
    </Container>
  );
};

export default MenuItem;
