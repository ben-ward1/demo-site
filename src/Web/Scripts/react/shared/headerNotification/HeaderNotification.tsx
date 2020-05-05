import * as React from "react";
import axios from "axios";
import { BuildBaseUrl } from "../../../urlHelperFunctions";
import { faWindowClose, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import HeaderNotificationPortal from "./HeaderNotificationPortal";
import Hn from "./HeaderNotificationStyledComponents";
import {
  addAnimations,
  resetPageTop,
  resizeDisplayText,
  fadeInText,
} from "../../../notificationHelpers";

library.add(faWindowClose, faAngleDown);

type messageType = {
  displayText: string;
  mainText: string;
  subText: string;
};

interface IProps {
  closeCallback: Function;
  message: messageType;
}

interface IState {
  isExpanded: boolean | null;
  isClosed: boolean;
}

class HeaderNotification extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);

    this.state = {
      isExpanded: null,
      isClosed: false,
    };

    axios.defaults.baseURL = BuildBaseUrl();

    this.toggleNotification = this.toggleNotification.bind(this);
    this.closeSelf = this.closeSelf.bind(this);
    this.handleResize = this.handleResize.bind(this);
  }

  componentDidMount() {
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
    addAnimations();
  }

  handleResize() {
    if (this.state.isExpanded) {
      this.setState({ isExpanded: false }, () => {
        const { isExpanded, isClosed } = this.state;
        resetPageTop(isExpanded, isClosed);
        resizeDisplayText();
      });
    }

    addAnimations();
    resizeDisplayText();
  }

  toggleNotification() {
    fadeInText();
    this.setState(
      (previous) => ({
        isExpanded: previous.isExpanded === null ? true : !previous.isExpanded,
      }),
      () => {
        const { isExpanded, isClosed } = this.state;
        resetPageTop(isExpanded, isClosed);
        if (!isExpanded) {
          resizeDisplayText();
        }
      }
    );
  }

  updateSession() {
    axios
      .get("Session/AcknowledgeNotification", {
        params: { acknowledged: true },
      })
      .then((response) => {
        if (!response.data.success) {
          throw "No success response.";
        }
      })
      .catch((e) => {
        console.log("Failed notification acknowledgement: " + e);
      });
  }

  closeSelf() {
    this.setState({ isClosed: true }, () => {
      const { isExpanded, isClosed } = this.state;

      resetPageTop(isExpanded, isClosed);
      this.updateSession();

      setTimeout(() => {
        this.props.closeCallback();
      }, 750);
    });
  }

  render() {
    const { isExpanded, isClosed } = this.state;
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
              className="animate-text"
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
            <Hn.ControlsContainer id="notification-controls-container">
              <FontAwesomeIcon
                icon={faWindowClose}
                size="lg"
                onClick={this.closeSelf}
                tabIndex={0}
                onKeyPress={(e) => e.key === "Enter" && this.closeSelf()}
                style={{ cursor: "pointer" }}
              />
              <FontAwesomeIcon
                icon={faAngleDown}
                onClick={this.toggleNotification}
                tabIndex={0}
                onKeyPress={(e) =>
                  e.key === "Enter" && this.toggleNotification()
                }
                size="lg"
                style={
                  isExpanded
                    ? {
                        transform: "rotate(180deg)",
                        transition: "transform 0.25s ease-in-out",
                        cursor: "pointer",
                      }
                    : {
                        transition: "transform 0.25s ease-in-out",
                        cursor: "pointer",
                      }
                }
              />
            </Hn.ControlsContainer>
          </Hn.Contents>
        </Hn.Container>
      </HeaderNotificationPortal>
    );
  }
}

export default HeaderNotification;
