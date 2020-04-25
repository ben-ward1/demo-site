import React from "react";
import HeaderNotificationPortal from "./HeaderNotificationPortal";
import Hn from "./HeaderNotificationStyledComponents";
import {
  firstVisitMessageObject,
  createKeyFrameAnimation,
  resetPageTop,
} from "../../../notificationHelpers";

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
  }

  componentDidMount() {
    window.addEventListener("resize", this.handleOverflow);
    this.handleOverflow();
    createKeyFrameAnimation();
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
        const { isExpanded, isClosed } = this.state;
        resetPageTop(isExpanded, isClosed);
      }
    );
  }

  closeSelf() {
    this.setState({ isClosed: true }, () => {
      resetPageTop(this.state.isExpanded, true);
      setTimeout(() => {
        this.props.closeCallback();
      }, 750);
    });
  }

  render() {
    const { overflowing, isExpanded, isClosed } = this.state;

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
                <div>{firstVisitMessageObject.mainText}</div>
                {firstVisitMessageObject.subText &&
                  firstVisitMessageObject.subText.length > 0 && (
                    <Hn.SubText>{firstVisitMessageObject.subText}</Hn.SubText>
                  )}
              </div>
            </Hn.TextContainer>
            <Hn.ControlsContainer overflowing={overflowing}>
              <Hn.Control onClick={this.closeSelf} />
              {overflowing && (
                <Hn.Control
                  id="notification-expand-control"
                  onClick={this.openNotification}
                  isExpanded={isExpanded}
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
