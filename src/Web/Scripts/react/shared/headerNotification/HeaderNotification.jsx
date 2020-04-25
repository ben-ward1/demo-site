import React from "react";
import styled, { css } from "styled-components";
import HeaderNotificationPortal from "./HeaderNotificationPortal";
import firstVisitMessageObject from "../../../notificationHelpers";

const collapsedHeight = 50;

const NotificationContainer = styled.div`
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
  height: 50px;
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

const NotificationTextContainer = styled.div`
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

const NotificationContents = styled.div`
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

const SubText = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const NotificationControlsContainer = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: ${(props) =>
    props.overflowing ? "space-between" : "center"};
  padding: 0.3rem 0;
`;

const NotificationControl = styled.div`
  height: 14px;
  width: 14px;
  background-color: ${(props) => (props.isExpanded ? "white" : "black")};
  border: 2px solid black;
`;

class HeaderNotification extends React.Component {
  constructor() {
    super();

    this.state = {
      overflowing: false,
      isExpanded: null,
      isClosed: false,
    };

    this.handleOverflow = this.handleOverflow.bind(this);
    this.openNotification = this.openNotification.bind(this);
    this.closeSelf = this.closeSelf.bind(this);
    this.resetPageTop = this.resetPageTop.bind(this);
    this.calculateScale = this.calculateScale.bind(this);
    this.createKeyFrameAnimation = this.createKeyFrameAnimation.bind(this);
  }

  componentDidMount() {
    window.addEventListener("resize", this.handleOverflow);
    this.handleOverflow();
    this.createKeyFrameAnimation();
  }

  handleOverflow() {
    const el = document.getElementById("notification-container");

    const overflowing = el && el.clientHeight < el.scrollHeight;

    this.setState({ overflowing });
  }

  openNotification() {
    this.setState(
      (previous) => ({
        isExpanded: previous.isExpanded === null ? true : !previous.isExpanded,
      }),
      () => {
        this.resetPageTop();
      }
    );
  }

  closeSelf() {
    this.setState({ isClosed: true }, () => {
      this.resetPageTop();
      setTimeout(() => {
        this.props.closeCallback();
      }, 750);
    });
  }

  calculateScale() {
    const fullHeight = document.getElementById("notification-text-container")
      .clientHeight;
    const collapsedHeight = 50;

    return fullHeight / collapsedHeight;
  }

  createKeyFrameAnimation() {
    const mainScale = this.calculateScale();
    let animation = "";
    let reverseAnimation = "";
    let inverseAnimation = "";
    let inverseReverseAnimation = "";
    let closeFromOpenAnimation = "";
    let closeFromClosedAnimation = "";
    let openPageTopAnimation = "";
    let closePageTopAnimation = "";

    for (let step = 0; step <= 100; step++) {
      const factor = step / 100;
      const scaleY = 1 + (mainScale - 1) * factor;
      const reverseScaleY = mainScale - (mainScale - 1) * factor;
      const invScaleY = 1 / scaleY;
      const invReverseScaleY = 1 / reverseScaleY;
      const closeScaleOpen = mainScale - mainScale * factor;
      const closeScaleClosed = 1 - factor;
      const pageTop = mainScale * collapsedHeight - collapsedHeight;
      const pageTopExpand = pageTop * factor;
      const pageTopClose = pageTop - pageTopExpand;

      animation += `
        ${step}% {
            transform: scaleY(${scaleY});
        }`;

      reverseAnimation += `
        ${step}% {
            transform: scaleY(${reverseScaleY});
        }`;

      inverseAnimation += `
        ${step}% {
            transform: scaleY(${invScaleY});
        }`;

      inverseReverseAnimation += `
        ${step}% {
            transform: scaleY(${invReverseScaleY});
        }`;

      closeFromOpenAnimation += `
          ${step}% {
              transform: scaleY(${closeScaleOpen});
          }`;

      closeFromClosedAnimation += `
            ${step}% {
                transform: scaleY(${closeScaleClosed});
            }`;

      openPageTopAnimation += `
            ${step}% {
                top: ${pageTopExpand}px
            }
            `;

      closePageTopAnimation += `
            ${step}% {
                top: ${pageTopClose}px
            }
            `;
    }

    const animationStyleString = `
      @keyframes notificationAnimation {
          ${animation}
      }
      
      @keyframes notificationReverseAnimation {
          ${reverseAnimation}
      }
      
      @keyframes notificationContentsAnimation {
          ${inverseAnimation}
      }
      
      @keyframes notificationReverseContentsAnimation {
          ${inverseReverseAnimation}
      }
      
      @keyframes notificationCloseFromOpen {
          ${closeFromOpenAnimation}
      }
      
      @keyframes notificationCloseFromClosed {
          ${closeFromClosedAnimation}
      }
      
      @keyframes openPageTop {
          ${openPageTopAnimation}
      }
      
      @keyframes closePageTop {
          ${closePageTopAnimation}
      }`;

    const style = document.createElement("style");
    style.textContent = animationStyleString;
    document.head.append(style);
  }

  resetPageTop() {
    const { isExpanded, isClosed } = this.state;

    if (isExpanded !== null) {
      const el = document.getElementsByClassName("page-container")[0];
      const cssString = `
            animation-name: ${
              isExpanded && !isClosed ? "openPageTop" : "closePageTop"
            };
            animation-duration: 0.25s;
            animation-timing-function: 0.25s;
            animation-fill-mode: forwards;
        `;

      el.style.cssText = cssString;
    }
  }

  render() {
    const { overflowing, isExpanded, isClosed } = this.state;
    const yScale = this.calculateScale;

    return (
      <HeaderNotificationPortal>
        <NotificationContainer
          id="notification-container"
          isExpanded={isExpanded}
          isClosed={isClosed}
          yScale={yScale}
        >
          <NotificationContents isExpanded={isExpanded}>
            <NotificationTextContainer
              id="notification-text-container"
              isClosed={isClosed}
              yScale={yScale}
              isExpanded={isExpanded}
            >
              <div>
                <div>{firstVisitMessageObject.mainText}</div>
                {firstVisitMessageObject.subText &&
                  firstVisitMessageObject.subText.length > 0 && (
                    <SubText>{firstVisitMessageObject.subText}</SubText>
                  )}
              </div>
            </NotificationTextContainer>
            <NotificationControlsContainer overflowing={overflowing}>
              <NotificationControl onClick={this.closeSelf} />
              {overflowing && (
                <NotificationControl
                  id="notification-expand-control"
                  onClick={this.openNotification}
                  isExpanded={isExpanded}
                />
              )}
            </NotificationControlsContainer>
          </NotificationContents>
        </NotificationContainer>
      </HeaderNotificationPortal>
    );
  }
}

export default HeaderNotification;
