import styled, { css } from "styled-components";

const Container = styled.div`
  position: relative;
  z-index: 1199;
  display: flex;
  justify-content: space-between;
  padding: 0 1rem;
  font-weight: 600;
  text-align: justify;
  background-color: #e60000;
  color: white;
  overflow: hidden;
  max-height: 4rem;
  transform-origin: top;

  ${(props) =>
    props.isExpanded !== null && props.isExpanded
      ? css`
          animation-name: notificationAnimation;
          animation-duration: 0.25s;
          animation-timing-function: 0.25s;
          animation-fill-mode: forwards;
        `
      : props.isExpanded !== null
      ? css`
          animation-name: notificationReverseAnimation;
          animation-duration: 0.25s;
          animation-timing-function: 0.25s;
          animation-fill-mode: forwards;
        `
      : ``}

  ${(props) =>
    props.isClosed
      ? props.isExpanded
        ? css`
            animation-name: notificationCloseFromOpen;
            animation-duration: 0.25s;
            animation-timing-function: 0.25s;
            animation-fill-mode: forwards;
          `
        : css`
            animation-name: notificationCloseFromClosed;
            animation-duration: 0.25s;
            animation-timing-function: 0.25s;
            animation-fill-mode: forwards;
          `
      : ``}
`;

const Contents = styled.div`
  display: flex;
  transform-origin: top;

  ${(props) =>
    props.isExpanded !== null && props.isExpanded
      ? css`
          animation-name: notificationContentsAnimation;
          animation-duration: 0.25s;
          animation-timing-function: 0.25s;
          animation-fill-mode: forwards;
          transform: translateZ(0);
          transition: transform 0.25s;
        `
      : props.isExpanded !== null
      ? css`
          animation-name: notificationReverseContentsAnimation;
          animation-duration: 0.25s;
          animation-timing-function: 0.25s;
          animation-fill-mode: forwards;
        `
      : ``}
`;

const TextContainer = styled.div`
  padding-right: 1.2rem;
  width: 100%;
  justify-content: center;
  display: flex;
  height: fit-content;
  transform-origin: top;

  @media only screen and (max-width: 960px) {
    font-size: 14px;
  }

  @media only screen and (max-width: 689px) {
    font-size: 12px;
  }
`;

const SubText = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const ControlsContainer = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: ${(props) =>
    props.overflowing ? "space-between" : "center"};
  padding: 0.3rem 0;
`;

const Control = styled.div`
  height: 14px;
  width: 14px;
  background-color: ${(props) => (props.isExpanded ? "white" : "black")};
  border: 2px solid black;
`;

const Hn = {
  Container,
  Contents,
  TextContainer,
  SubText,
  ControlsContainer,
  Control,
};

export default Hn;
