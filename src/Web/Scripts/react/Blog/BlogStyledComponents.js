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
  styleAccents: [
    css`
      height: 60%;
      z-index: 0;
      background: #74a04c73;
      position: absolute;
      top: 0;
      width: 45%;
      right: 0;
    `,
    css`
      height: 45%;
      z-index: 1;
      background: #8d9bcce6;
      bottom: 0;
      left: 30%;
      position: absolute;
      top: 20%;
      width: 30%;
    `,
    css`
      height: 108%;
      z-index: 0;
      background: #d69393e6;
      bottom: 0px;
      left: 0px;
      position: absolute;
      /* top: 20%; */
      width: 12%;
    `,
  ],
};

const BlogContainer = styled.div`
  position: relative;

  @media (min-width: 1024px) {
    display: flex;
    flex-wrap: wrap;
    height: fit-content;
  }
`;

const MainEntryContainer = styled.div`
  position: relative;
  background-color: white;
  color: black;
  padding-bottom: 2rem;

  @media (min-width: 1024px) {
    display: flex;
  }
`;

const MainHeaderContainer = styled.div`
  padding: 1rem;
  flex-basis: 40%;
  display: flex;
  flex-direction: column;

  & > h3 {
    font-size: ${theme.fontSizes.xxl};
    justify-content: center;
  }

  & > img {
    align-self: center;
    width: auto;
    height: 12rem;
    border-radius: 50%;
    padding: 0.5rem;
    z-index: 3;
  }

  @media (max-width: 1024px) {
    & > img {
      height: 9rem;
    }
  }
`;

const MainEntryContent = styled.div`
  padding: 0.5rem;
  font-size: ${theme.fontSizes.lg};
  flex-basis: 60%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  & > div {
    justify-content: center;
    z-index: 1;
  }
`;

const EntryContainer = styled.div`
  z-index: 2;
  ${(props) =>
    css`
      flex-basis: ${(props.index + 1) % 4 > 1 ? "43%" : "52%"};
      padding: ${theme.paddingOpts[props.index]};
      background-color: ${theme.colorSchemes[props.index % 4].secondary};
      margin-top: ${props.index > 2 ? "auto" : 0};
      margin-right: ${props.index % 2 === 0 ? "auto" : 0};
      margin-bottom: ${props.index <= 2 ? "auto" : 0};
      margin-left: ${props.index % 2 !== 0 ? "auto" : 0};
      z-index: ${props.index === 2 ? "1" : "2"};
    `};
`;

const EntryContent = styled.div`
  padding: 0.5rem;

  ${(props) =>
    css`
      background-color: ${theme.colorSchemes[props.index % 4].main};
      color: ${theme.colorSchemes[props.index % 4].font};
      font-family: ${theme.colorSchemes[props.index % 4].family};

      & > h3:first-child {
        font-size: ${theme.fontSizes.xxl};

        @media (max-width: 1126px) {
          width: ${props.index === 2 ? "min-content" : "100%"};
        }
      }

      &>div: last-child {
        font-size: ${theme.fontSizes.lg};
      }
    `}
`;

const EntryHeader = styled.h3`
  width: 100%;
  padding: 0.5rem;
`;

const EntryItem = styled.div`
  width: 100%;
  display: flex;
  padding: 0.5rem;
`;

const StyleAccent = styled.div`
  ${(props) => theme.styleAccents[props.index]}

  @media (max-width: 1024px) {
    display: none;
  }
`;

module.exports = {
  BlogContainer,
  MainEntryContainer,
  MainHeaderContainer,
  MainEntryContent,
  EntryContainer,
  EntryContent,
  EntryHeader,
  EntryItem,
  StyleAccent,
};
