import * as React from "react";
import ChatTogglePortal from "./ChatTogglePortal";
import { faComment } from "@fortawesome/free-regular-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Badge } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import styled, { css } from "styled-components";

const ChatIconPadding = styled.div`
  padding: 6px;
  background-color: #222;
`;

const ChatIconContainer = styled.div`
  padding: 2px;
  ${(props) =>
    css`
      background-color: ${props.color};
    `}
`;

const GreenBadge = withStyles(() => ({
  badge: { backgroundColor: "#12da12" },
}))(Badge);

const RedBadge = withStyles(() => ({
  badge: { backgroundColor: "red" },
}))(Badge);

library.add(faComment);

interface IProps {
  clickCallback: () => void;
  chatActive: boolean;
}

class ChatToggle extends React.Component<IProps, {}> {
  constructor(props) {
    super(props);
  }

  render() {
    const { clickCallback, chatActive } = this.props;
    const color = chatActive ? "green" : "lightgray";

    return (
      <ChatTogglePortal>
        <ChatIconContainer color={color} className="chat-icon-container">
          <ChatIconPadding>
            {chatActive ? (
              <GreenBadge
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                badgeContent=" "
                variant="dot"
              >
                <FontAwesomeIcon
                  className="chat-icon"
                  icon={faComment}
                  color="white"
                  size="lg"
                  onClick={clickCallback}
                  tabIndex={0}
                  onKeyPress={(e) => e.key === "Enter" && clickCallback()}
                  style={{ cursor: "pointer" }}
                />
              </GreenBadge>
            ) : (
              <RedBadge
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                badgeContent=" "
                variant="dot"
              >
                <FontAwesomeIcon
                  className="chat-icon"
                  icon={faComment}
                  color="white"
                  size="lg"
                  tabIndex={0}
                  style={{ cursor: "pointer" }}
                />
              </RedBadge>
            )}
          </ChatIconPadding>
        </ChatIconContainer>
      </ChatTogglePortal>
    );
  }
}

export default ChatToggle;
