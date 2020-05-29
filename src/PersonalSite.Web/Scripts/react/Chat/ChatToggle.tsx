import * as React from "react";
import ChatTogglePortal from "./ChatTogglePortal";
import { faComment } from "@fortawesome/free-regular-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
        <FontAwesomeIcon
          icon={faComment}
          color="white"
          size="lg"
          onClick={clickCallback}
          tabIndex={0}
          onKeyPress={(e) => e.key === "Enter" && clickCallback()}
          style={{ cursor: "pointer" }}
        />
      </ChatTogglePortal>
    );
  }
}

export default ChatToggle;
