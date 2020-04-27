import styled, { css } from "styled-components";

const theme = {
  colorSchemes: [
    { main: "#77c4d3", secondary: "#007373", font: "white" },
    { main: "#f6f792e6", secondary: "#614561", font: "#222" },
    { main: "#df3c57", secondary: "#6fad6f", font: "white" },
    { main: "#ecedee", secondary: "#d09323", font: "#222" },
  ],
  paddingOpts: [
    "1rem 0rem 1rem 0rem",
    "0rem 1rem 0rem 1rem",
    "1rem 0rem 0rem 1rem",
    "1rem",
  ],
  fontSizes: { xxl: "36px", xl: "24px", lg: "20px", md: "16px", sm: "12px" },
};

const BlogContainer = styled.div`
  @media (min-width: 1024px) {
    display: flex;
    flex-wrap: wrap;
    height: fit-content;
  }
`;

const EntryContainer = styled.div`
  ${(props) =>
    css`
      flex-basis: ${(props.index + 1) % 4 > 1 ? "45%" : "55%"};
      padding: ${theme.paddingOpts[props.index]};
      background-color: ${theme.colorSchemes[props.index % 4].secondary};
    `};
`;

const EntryContent = styled.div`
  padding: 0.5rem;

  ${(props) =>
    css`
      background-color: ${theme.colorSchemes[props.index % 4].main};
      color: ${theme.colorSchemes[props.index % 4].font};
      font-family: ${theme.colorSchemes[props.index % 4].family};
    `}

  & > h3:first-child {
    font-size: ${theme.fontSizes.xxl};
  }

  &>div: last-child {
    font-size: ${theme.fontSizes.lg};
  }
`;

const EntryHeader = styled.h3`
  width: 100%;
  display: flex;
  padding: 0.5rem;
`;

const EntryItem = styled.div`
  width: 100%;
  display: flex;
  padding: 0.5rem;
`;

module.exports = {
  BlogContainer,
  EntryContainer,
  EntryContent,
  EntryHeader,
  EntryItem,
};
