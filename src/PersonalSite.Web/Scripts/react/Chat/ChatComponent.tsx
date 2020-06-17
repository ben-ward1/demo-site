import * as React from "react";
import * as signalR from "@microsoft/signalr";
import axios from "axios";
import { BuildBaseUrl } from "../../urlHelperFunctions";
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
import { Select, MenuItem, Collapse } from "@material-ui/core";

library.add(faWindowClose, faUser, faComment);

type User = {
  id: string;
  name: string;
};

type Message = {
  type: string;
  content: string;
};

interface IProps {
  captcha: string;
}

interface IState {
  chatActive: boolean;
  chatOpen: boolean;
  name: string;
  popoverIsOpen: boolean;
  users: Array<User>;
  messages: Array<Message>;
  isMod: boolean;
  selectedUser?: User;
  loadingChat: boolean;
}

class ChatComponent extends React.Component<IProps, IState> {
  connection: signalR.HubConnection;

  constructor(props) {
    super(props);

    this.state = {
      chatActive: false,
      chatOpen: false,
      name: "",
      popoverIsOpen: false,
      users: [],
      messages: [],
      isMod: false,
      selectedUser: undefined,
      loadingChat: true,
    };

    axios.defaults.baseURL = BuildBaseUrl();

    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(BuildBaseUrl() + "chatHub")
      .build();

    this.sendMessage = this.sendMessage.bind(this);
    this.enterChatCallback = this.enterChatCallback.bind(this);
    this.togglePopover = this.togglePopover.bind(this);
    this.isPopoverVisible = this.isPopoverVisible.bind(this);
    this.openChat = this.openChat.bind(this);
    this.userCallback = this.userCallback.bind(this);
    this.messageCallback = this.messageCallback.bind(this);
    this.getUsersCallback = this.getUsersCallback.bind(this);
    this.modCallback = this.modCallback.bind(this);
    this.selectUser = this.selectUser.bind(this);
  }

  componentDidMount() {
    document.getElementById("chatWindowContainer")!.style.display = "none";

    window.addEventListener("resize", () => {
      SizeWindow();
    });

    this.showPopover();

    axios
      .get("Utility/IsChatActive")
      .then((response) => {
        const active = response.data.success;

        if (active) {
          this.setState({ chatActive: true });
        }
      })
      .then(() => {
        this.setState({ loadingChat: false });
      });
  }

  componentDidUpdate() {
    SizeWindow();
  }

  componentWillUnmount() {
    this.connection.stop();
    RemovePopoverListeners(this.togglePopover);
  }

  messageCallback(msg: Message) {
    this.setState({ messages: this.state.messages.concat(msg) }, () => {
      const msgBoard = document.getElementById("messageBoard")!;
      msgBoard.scrollTop = msgBoard.scrollHeight;
    });
  }

  userCallback(toAdd: boolean, user: User) {
    this.setState({
      users: toAdd
        ? this.state.users.concat(user)
        : this.state.users.filter((x) => x.id !== user.id),
    });

    const msg: Message = {
      type: "system",
      content: `${user.name} ${toAdd ? "joined" : "left"} the chat.${
        toAdd ? " Say hi." : ""
      }`,
    };

    this.messageCallback(msg);
  }

  getUsersCallback(users: Array<User>) {
    if (users.length !== 0) {
      this.setState({ users });
    }
  }

  modCallback(isMod: boolean) {
    this.setState({ isMod });
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
        ToggleChatIconBorder(false, this.state.chatActive);
        AddPopoverListeners(this.togglePopover);
      }, 6000);
    });
  }

  togglePopover(makeVisible: boolean) {
    this.setState({ popoverIsOpen: makeVisible });
    ToggleChatIconBorder(makeVisible, this.state.chatActive);
  }

  enterChatCallback(name: string) {
    this.setState({ chatOpen: true, name }, () => {
      (document.getElementById(
        "sendChatMsgBtn"
      ) as HTMLButtonElement).disabled = true;

      RegisterEvents(
        this.connection,
        this.state.name,
        this.messageCallback,
        this.userCallback,
        this.getUsersCallback,
        this.modCallback
      );
    });
  }

  sendMessage(event) {
    const user = this.state.name;
    const { isMod, selectedUser } = this.state;

    const messageEl = document.getElementById(
      "messageInput"
    ) as HTMLInputElement;
    const message = messageEl.value;

    if (message.length < 1) {
      return;
    }

    const targetId = isMod && selectedUser ? selectedUser.id : " ";

    if (targetId) {
      this.connection
        .invoke("SendMessage", user, message, targetId)
        .catch((err) => {
          return console.error(err.toString());
        });
    }

    event.preventDefault();

    messageEl.value = "";
  }

  selectUser(e) {
    const selectedUser = this.state.users.filter(
      (u) => u.id === e.target.value
    )[0];

    this.setState({ selectedUser });
  }

  render() {
    const {
      chatActive,
      name,
      chatOpen,
      messages,
      users,
      selectedUser,
      isMod,
      loadingChat,
    } = this.state;

    return (
      <React.Fragment>
        <ChatSC.WindowContainer id="chatWindowContainer">
          {chatOpen ? (
            <ChatSC.Container>
              <ChatSC.Header>
                <span>
                  User: <b>{name}</b>
                </span>
                {isMod && (
                  <Select
                    value={selectedUser ? selectedUser.id : "Select a user"}
                    onChange={this.selectUser}
                    displayEmpty
                  >
                    <MenuItem value="" disabled>
                      Select a user
                    </MenuItem>
                    {users.map((u, i) => {
                      return (
                        <MenuItem value={u.id} key={`user-select-item-${i}`}>
                          {u.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                )}
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
              >
                {messages &&
                  messages.map((m, i) => {
                    return (
                      <p key={`chat-message-${i}`}>
                        {m.type === "system" ? (
                          <i>{m.content}</i>
                        ) : (
                          <>
                            <b>
                              {m.content.substring(
                                0,
                                m.content.indexOf(":") + 1
                              )}
                            </b>
                            <span>
                              {" " +
                                m.content.substring(
                                  m.content.indexOf(":") + 2,
                                  m.content.length
                                )}
                            </span>
                          </>
                        )}
                      </p>
                    );
                  })}
              </ChatSC.MessageBoard>
              <ChatSC.UserPanel id="userPanel" style={{ display: "none" }}>
                <h5>Connected Users</h5>
                {users &&
                  users.map((u, i) => {
                    return <p key={`user-panel-entry-${i}`}>{u.name}</p>;
                  })}
              </ChatSC.UserPanel>
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
        {!loadingChat && (
          <>
            <ChatToggle chatActive={chatActive} clickCallback={this.openChat} />
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
                  message={
                    chatActive
                      ? "Ben is online! Click here to chat."
                      : "Ben is offline right now. Check back later if you'd like to chat."
                  }
                  active={chatActive}
                />
              </Collapse>
            </div>
          </>
        )}
      </React.Fragment>
    );
  }
}

export default ChatComponent;
