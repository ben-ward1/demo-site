import * as React from "react";
import ChatTogglePortal from "./ChatTogglePortal";
import { faComment } from "@fortawesome/free-regular-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Badge } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import styled from "styled-components";

const ChatIconPadding = styled.div`
  padding: 6px;
  background-color: #222;
`;

const ChatIconContainer = styled.div`
  padding: 2px;
  background-color: green;
`;

const GreenBadge = withStyles(() => ({
  badge: { backgroundColor: "#12da12" },
}))(Badge);

library.add(faComment);

interface IProps {
  clickCallback: () => void;
}

class ChatToggle extends React.Component<IProps, {}> {
  constructor(props) {
    super(props);
  }

  render() {
    const { clickCallback } = this.props;

    return (
      <ChatTogglePortal>
        <ChatIconContainer className="chat-icon-container">
          <ChatIconPadding>
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
          </ChatIconPadding>
        </ChatIconContainer>
      </ChatTogglePortal>
    );
  }
}

export default ChatToggle;
