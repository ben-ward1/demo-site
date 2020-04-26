import React from "react";
import { faWindowClose, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import HeaderNotificationPortal from "./HeaderNotificationPortal";
import Hn from "./HeaderNotificationStyledComponents";
import {
  createKeyFrameAnimation,
  resetPageTop,
} from "../../../notificationHelpers";

library.add(faWindowClose, faAngleRight);

class HeaderNotification extends React.Component {
  constructor() {
    super();

    this.state = {
      overflowing: false,
      isExpanded: null,
      isClosed: false,
    };

    this.handleOverflow = this.handleOverflow.bind(this);
    this.toggleNotification = this.toggleNotification.bind(this);
    this.closeSelf = this.closeSelf.bind(this);
    this.resizeDisplayText = this.resizeDisplayText.bind(this);
    this.handleResize = this.handleResize.bind(this);
  }

  componentDidMount() {
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
    createKeyFrameAnimation();
  }

  handleResize() {
    this.handleOverflow();
    this.resizeDisplayText();
  }

  handleOverflow() {
    const el = document.getElementById("notification-container");
    const overflowing = el && el.clientHeight < el.scrollHeight;
    this.setState({ overflowing });
  }

  toggleNotification() {
    this.setState(
      (previous) => ({
        isExpanded: previous.isExpanded === null ? true : !previous.isExpanded,
      }),
      () => {
        const { isExpanded, isClosed } = this.state;
        resetPageTop(isExpanded, isClosed);
        if (!isExpanded) {
          this.resizeDisplayText();
        }
      }
    );
  }

  closeSelf() {
    this.setState({ isClosed: true }, () => {
      const { isExpanded, isClosed } = this.state;

      resetPageTop(isExpanded, isClosed);

      setTimeout(() => {
        this.props.closeCallback();
      }, 750);
    });
  }

  resizeDisplayText() {
    const mainContainer = document.getElementById("notification-container");
    const controlContainer = document.getElementById(
      "notification-controls-container"
    );
    const container = document.getElementById("collapsed-text-container");
    const width =
      mainContainer.clientWidth -
      controlContainer.clientWidth -
      container.children[0].clientWidth;
    container.children[1].style.width = `${width}px`;
  }

  render() {
    const { overflowing, isExpanded, isClosed } = this.state;
    const { displayText, mainText, subText } = this.props.message;

    return (
      <HeaderNotificationPortal>
        <Hn.Container
          id="notification-container"
          isExpanded={isExpanded}
          isClosed={isClosed}
        >
          <Hn.Contents isExpanded={isExpanded}>
            <Hn.TextContainer
              id="notification-text-container"
              isClosed={isClosed}
              isExpanded={isExpanded}
            >
              <div>
                {!isExpanded && (
                  <Hn.CollapsedText id="collapsed-text-container">
                    <strong>{displayText}</strong>
                    <div>{mainText}</div>
                  </Hn.CollapsedText>
                )}
                <div id="main-text-container">
                  <div className="text-item">{mainText}</div>
                  {subText && subText.length > 0 && (
                    <Hn.SubText className="text-item">{subText}</Hn.SubText>
                  )}
                </div>
              </div>
            </Hn.TextContainer>
            <Hn.ControlsContainer
              id="notification-controls-container"
              overflowing={overflowing}
            >
              <FontAwesomeIcon
                icon={faWindowClose}
                size="lg"
                onClick={this.closeSelf}
              />
              {overflowing && (
                <FontAwesomeIcon
                  icon={faAngleRight}
                  onClick={this.toggleNotification}
                  size="lg"
                  style={
                    isExpanded
                      ? {
                          transform: "rotate(90deg)",
                          transition: "transform 0.25s ease-in-out",
                        }
                      : { transition: "transform 0.25s ease-in-out" }
                  }
                />
              )}
            </Hn.ControlsContainer>
          </Hn.Contents>
        </Hn.Container>
      </HeaderNotificationPortal>
    );
  }
}

export default HeaderNotification;
