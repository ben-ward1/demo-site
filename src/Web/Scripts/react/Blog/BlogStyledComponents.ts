import styled, { css } from "styled-components";

interface IProps {
  index: number;
}

const theme = {
  colorSchemes: [
    { main: "#77c4d3", secondary: "#007373", font: "white" },
    { main: "rgba(246, 247, 146, 0.90)", secondary: "#614561", font: "#222" },
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
      background: rgba(116, 160, 76, 0.45);
      position: absolute;
      top: 0;
      width: 45%;
      right: 0;

      @media (max-width: 1024px) {
        height: 60%;
        z-index: 0;
        position: absolute;
        top: 0;
        left: 50%;
        right: 20%;
      }
    `,
    css`
      height: 45%;
      z-index: 1;
      background: rgba(141, 155, 204, 0.9);
      bottom: 0;
      left: 30%;
      position: absolute;
      top: 20%;
      width: 30%;

      @media (max-width: 1024px) {
        height: 45%;
        z-index: 1;
        bottom: 0;
        left: 0;
        position: absolute;
        top: -2%;
        width: 30%;
      }
    `,
    css`
      height: 108%;
      z-index: 0;
      background: rgba(214, 147, 147, 0.9);
      bottom: 0px;
      left: 0px;
      position: absolute;
      width: 12%;

      @media (max-width: 1024px) {
        // TODO: figure out the z-index issue here
        // height: 40%;
        // z-index: 0;
        // bottom: 0;
        // left: auto;
        // right: 10%;
        // position: absolute;
        // width: 12%;
        display: none;
      }
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
    z-index: 1;
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
    align-self: center;
  }
`;

const EntryContainer = styled.div<IProps>`
  z-index: 2;
  ${(props) =>
    css`
      flex-basis: ${(props.index + 1) % 4 > 1 ? "43%" : "52%"};
      padding: ${theme.paddingOpts[props.index]};
      background-color: ${theme.colorSchemes[props.index % 4].secondary};
      // margin-top: ${props.index > 2 ? "auto" : 0};
      margin-right: ${props.index % 2 === 0 ? "auto" : 0};
      margin-bottom: ${props.index <= 2 ? "auto" : 0};
      margin-left: ${props.index % 2 !== 0 ? "auto" : 0};
      z-index: ${props.index === 2 ? "1" : "2"};

      ${
        props.index === 0 &&
        css`
          position: relative;
        `
      }
    `};
`;

const EntryContent = styled.div<IProps>`
  padding: 0.5rem;

  ${(props) =>
    css`
      background-color: ${theme.colorSchemes[props.index % 4].main};
      color: ${theme.colorSchemes[props.index % 4].font};

      & > h3:first-child {
        font-size: ${theme.fontSizes.xxl};

        @media (max-width: 1126px) {
          width: ${props.index === 2 ? "min-content" : "100%"};
        }

        ${props.index === 1 &&
        css`
          @media (max-width: 1024px) {
            float: right;
            width: 65%;
            text-align: end;
          }
        `}
      }

      &>div: last-child {
        font-size: ${theme.fontSizes.lg};
      }

      ${props.index === 1 &&
      css`
        @media (max-width: 1024px) {
          &::before {
            content: "filler filler filler filler filler filler filler filler filler filler filler filler filler filler filler filler filler filler filler filler filler filler filler filler filler filler filler filler filler filler filler filler filler filler filler filler filler filler filler filler filler filler filler filler filler filler filler filler filler filler filler filler fillerfiller filler fillerfiller filler filler";
            width: 32%;
            float: left;
            color: transparent;
          }
        }
      `}
    `}
`;

const EntryHeader = styled.h3`
  width: 100%;
  padding: 0.5rem;
`;

const EntryItem = styled.div`
  // width: 100%;
  // display: flex;
  padding: 0.5rem;
`;

const StyleAccent = styled.div<IProps>`
  ${(props) => theme.styleAccents[props.index]}
`;

export { BlogContainer };
export { MainEntryContainer };
export { MainHeaderContainer };
export { MainEntryContent };
export { EntryContainer };
export { EntryContent };
export { EntryHeader };
export { EntryItem };
export { StyleAccent };
