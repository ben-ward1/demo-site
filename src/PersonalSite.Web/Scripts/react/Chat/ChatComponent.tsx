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
  AddPopoverListeners,
  RemovePopoverListeners,
  ToggleChatIconBorder,
} from "./ChatHelperFunctions";
import {
  faWindowClose,
  faUser,
  faComment,
} from "@fortawesome/free-regular-svg-icons";
import { Popover } from "../shared/Popover";
import Collapse from "@material-ui/core/Collapse";

library.add(faWindowClose, faUser, faComment);

interface IProps {
  captcha: string;
}

interface IState {
  chatOpen: boolean;
  name: string;
  popoverIsOpen: boolean;
}

class ChatComponent extends React.Component<IProps, IState> {
  connection: signalR.HubConnection;

  constructor(props) {
    super(props);

    this.state = {
      chatOpen: false,
      name: "",
      popoverIsOpen: false,
    };

    this.connection = new signalR.HubConnectionBuilder()
      .withUrl("chatHub")
      .build();

    this.sendMessage = this.sendMessage.bind(this);
    this.enterChatCallback = this.enterChatCallback.bind(this);
    this.togglePopover = this.togglePopover.bind(this);
    this.isPopoverVisible = this.isPopoverVisible.bind(this);
    this.openChat = this.openChat.bind(this);
  }

  componentDidMount() {
    document.getElementById("chatWindowContainer")!.style.display = "none";

    window.addEventListener("resize", () => {
      SizeWindow();
    });

    this.showPopover();
  }

  componentDidUpdate() {
    SizeWindow();
  }

  componentWillUnmount() {
    this.connection.stop();
    RemovePopoverListeners(this.togglePopover);
  }

  isPopoverVisible() {
    const body = document.getElementsByTagName("body")[0];
    const chatIsOpen = body.classList.contains("chat-open");
    return this.state.popoverIsOpen && !chatIsOpen;
  }

  openChat() {
    this.togglePopover(false);
    ToggleChat();
  }

  showPopover() {
    this.setState({ popoverIsOpen: true }, () => {
      setTimeout(() => {
        this.setState({ popoverIsOpen: false });
        ToggleChatIconBorder(false);
        AddPopoverListeners(this.togglePopover);
      }, 6000);
    });
  }

  togglePopover(makeVisible: boolean) {
    this.setState({ popoverIsOpen: makeVisible });
    ToggleChatIconBorder(makeVisible);
  }

  enterChatCallback(name: string) {
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
    const { name, chatOpen } = this.state;

    return (
      <React.Fragment>
        <ChatSC.WindowContainer id="chatWindowContainer">
          {chatOpen ? (
            <ChatSC.Container>
              <ChatSC.Header>
                <span>
                  User: <b>{name}</b>
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
        <ChatToggle clickCallback={this.openChat} />
        <div
          style={{
            // TODO: this positioning is dependent on chat icon
            position: "fixed",
            top: "46px",
            right: "47px",
            zIndex: 1222,
          }}
        >
          <Collapse in={this.isPopoverVisible()}>
            <Popover
              id="chat-toggle-popover"
              message="Ben is online! Click here to chat."
            />
          </Collapse>
        </div>
      </React.Fragment>
    );
  }
}

export default ChatComponent;
