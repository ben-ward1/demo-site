import styled, { css } from "styled-components";

const collapsedDisplayHeight = "4rem";

const Container = styled.div`
  position: relative;
  z-index: 1199;
  display: flex;
  justify-content: space-between;
  font-weight: 600;
  text-align: justify;
  background-color: #bd0000;
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

  & > #notification-text-container.animate-text {
    animation: fadein 1s;

    @keyframes fadein {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
  }

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

  @media only screen and (max-width: 960px) {
    font-size: 14px;
  }

  @media only screen and (max-width: 689px) {
    font-size: 12px;
  }

  & > div > #main-text-container {
    .text-item {
      padding-right: 1rem;
      padding-left: 1rem;
    }

    .text-item:first-child {
      padding-top: 1rem;
    }

    .text-item:last-child {
      padding-bottom: 1rem;
    }
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
  justify-content: space-around;
  padding: 0.3rem 1rem;
`;

const Hn = {
  Container,
  Contents,
  TextContainer,
  SubText,
  CollapsedText,
  ControlsContainer,
};

export default Hn;
