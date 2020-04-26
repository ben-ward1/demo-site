import styled, { css } from "styled-components";

const collapsedDisplayHeight = "4rem";

const Container = styled.div`
  position: relative;
  z-index: 1199;
  display: flex;
  justify-content: space-between;
  font-weight: 600;
  text-align: justify;
  background-color: #e60000;
  color: white;
  overflow: hidden;
  max-height: ${collapsedDisplayHeight};
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
  width: 100%;
  justify-content: center;
  display: flex;
  height: fit-content;
  transform-origin: top;

  & > div > #main-text-container > .text-item {
    padding: 1rem;
  }

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

const CollapsedText = styled.div`
  height: ${collapsedDisplayHeight};
  display: flex;
  justify-content: left;
  align-items: center;

  & > strong {
    padding: 0 1rem;
    white-space: nowrap;
  }

  & > div {
    padding-right: 1rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    @media only screen and (max-width: 770px) {
      display: none;
    }
  }
`;

const ControlsContainer = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: ${(props) =>
    props.overflowing ? "space-between" : "center"};
  padding: 0.3rem 1rem;
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
  CollapsedText,
  ControlsContainer,
  Control,
};

export default Hn;
