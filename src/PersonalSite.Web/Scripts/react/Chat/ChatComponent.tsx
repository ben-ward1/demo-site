import * as React from "react";
import * as signalR from "@microsoft/signalr";
import ChatNameInput from "./ChatNameInput";
import ChatToggle from "./ChatToggle";
import ChatSC from "./ChatStyledComponents";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "react-bootstrap";
import {
  RegisterEvents,
  SizeWindow,
  ToggleUserPanel,
  ToggleChat,
} from "./ChatHelperFunctions";
import {
  faWindowClose,
  faUser,
  faComment,
} from "@fortawesome/free-regular-svg-icons";

library.add(faWindowClose, faUser, faComment);

interface IProps {
  captcha: string;
}

interface IState {
  chatOpen: boolean;
  name: string;
}

class ChatComponent extends React.Component<IProps, IState> {
  connection: signalR.HubConnection;

  constructor(props) {
    super(props);

    this.state = {
      chatOpen: false,
      name: "",
    };

    this.connection = new signalR.HubConnectionBuilder()
      .withUrl("chatHub")
      .build();

    this.sendMessage = this.sendMessage.bind(this);
    this.enterChatCallback = this.enterChatCallback.bind(this);
  }

  componentDidMount() {
    document.getElementById("chatWindowContainer")!.style.display = "none";

    window.addEventListener("resize", () => {
      SizeWindow();
    });

    this.connection.invoke("GetUsers").catch((err) => {
      console.log(err.toString());
    });
  }

  componentDidUpdate() {
    SizeWindow();
  }

  componentWillUnmount() {
    this.connection.stop();
  }

  enterChatCallback(name) {
    this.setState({ chatOpen: true, name }, () => {
      (document.getElementById(
        "sendChatMsgBtn"
      ) as HTMLButtonElement).disabled = true;

      RegisterEvents(this.connection, this.state.name);
    });
  }

  sendMessage(event) {
    const user = this.state.name;

    const messageEl = document.getElementById(
      "messageInput"
    ) as HTMLInputElement;
    const message = messageEl.value;

    if (message.length < 1) {
      return;
    }

    this.connection.invoke("SendMessage", user, message).catch((err) => {
      return console.error(err.toString());
    });

    event.preventDefault();

    messageEl.value = "";
  }

  render() {
    return (
      <React.Fragment>
        <ChatSC.WindowContainer id="chatWindowContainer">
          {this.state.chatOpen ? (
            <ChatSC.Container>
              <ChatSC.Header>
                <span>
                  User: <b>{this.state.name}</b>
                </span>
                <ChatSC.IconContainer>
                  <FontAwesomeIcon
                    id="user-panel-icon"
                    icon={faUser}
                    onClick={ToggleUserPanel}
                    tabIndex={0}
                    onKeyPress={(e) => e.key === "Enter" && ToggleUserPanel()}
                    style={{ cursor: "pointer" }}
                  />
                  <FontAwesomeIcon
                    id="chat-panel-icon"
                    icon={faComment}
                    onClick={ToggleUserPanel}
                    tabIndex={0}
                    onKeyPress={(e) => e.key === "Enter" && ToggleUserPanel()}
                    style={{ cursor: "pointer", display: "none" }}
                  />
                  <FontAwesomeIcon
                    icon={faWindowClose}
                    onClick={ToggleChat}
                    tabIndex={0}
                    onKeyPress={(e) => e.key === "Enter" && ToggleChat()}
                    style={{ cursor: "pointer" }}
                  />
                </ChatSC.IconContainer>
              </ChatSC.Header>
              <ChatSC.MessageBoard
                id="messageBoard"
                style={{ display: "block" }}
              />
              <ChatSC.UserPanel id="userPanel" style={{ display: "none" }} />
              <input
                type="text"
                id="messageInput"
                placeholder="What would you like to say?"
                onKeyPress={(e) => e.key === "Enter" && this.sendMessage(e)}
              />
              <Button
                id="sendChatMsgBtn"
                onClick={this.sendMessage}
                className="primary-button"
                variant="light"
              >
                Send Message
              </Button>
            </ChatSC.Container>
          ) : (
            <ChatNameInput
              enterChatCallback={this.enterChatCallback}
              captcha={this.props.captcha}
            />
          )}
        </ChatSC.WindowContainer>
        <ChatToggle clickCallback={ToggleChat} />
      </React.Fragment>
    );
  }
}

export default ChatComponent;
