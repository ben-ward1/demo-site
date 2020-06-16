type User = {
  id: string;
  name: string;
};

type Message = {
  type: string;
  content: string;
};

export const RegisterEvents = (
  connection: signalR.HubConnection,
  name: string,
  messageCallback: (msg: Message) => void,
  userCallback: (toAdd: boolean, user: User) => void,
  getUsersCallback: (users: Array<User>) => void,
  modCallback: (isMod: boolean) => void
) => {
  connection.on("ReceiveMessage", (user: string, message: string) => {
    const msg: Message = {
      type: "user",
      content: message,
    };

    messageCallback(msg);
  });

  connection.on("ReceiveNewUser", (id: string, user: string) => {
    const usr: User = {
      id,
      name: user,
    };

    userCallback(true, usr);
  });

  connection.on("UserLeft", (id: string, user: string) => {
    const usr: User = {
      id,
      name: user,
    };

    userCallback(false, usr);
  });

  connection.on("ReceiveUsers", (users: Array<User>) => {
    getUsersCallback(users);
  });

  connection.on("GrantMod", (isMod: boolean) => {
    modCallback(isMod);
  });

  connection.onclose(() => {
    setTimeout(() => {
      connection
        .start()
        .then(() => {
          newUser(connection, name, messageCallback);
        })
        .catch((err) => {
          return console.error(err.toString());
        });
    }, 5000);
  });

  connection
    .start()
    .then(() => {
      (document.getElementById(
        "sendChatMsgBtn"
      ) as HTMLButtonElement).disabled = false;

      newUser(connection, name, messageCallback);
    })
    .catch((err) => {
      return console.error(err.toString());
    });
};

export const SizeWindow = () => {
  const height = window.innerHeight;
  document.getElementById("chatWindowContainer")!.style.height = `${height}px`;
};

export const ToggleUserPanel = () => {
  const userPanel = document.getElementById("userPanel")!;
  const msgBoard = document.getElementById("messageBoard")!;
  const userIcon = document.getElementById("user-panel-icon")!;
  const chatIcon = document.getElementById("chat-panel-icon")!;
  const userPanelIsVisible = userPanel.style.display === "block";

  userPanel.style.display = userPanelIsVisible ? "none" : "block";
  msgBoard.style.display = userPanelIsVisible ? "block" : "none";

  userIcon.style.display = userPanelIsVisible ? "inline-block" : "none";
  chatIcon.style.display = userPanelIsVisible ? "none" : "inline-block";
};

export const ToggleChat = () => {
  const body = document.getElementsByTagName("body")[0];
  const chat = document.getElementById("chatWindowContainer")!;
  const visible = chat.style.display !== "none";
  chat.style.display = visible ? "none" : "flex";

  if (visible) {
    body.classList.remove("chat-open");
  } else {
    body.classList.add("chat-open");
    SizeWindow();
  }
};

export const AddPopoverListeners = (callback) => {
  const els = document.getElementsByClassName("chat-icon");

  for (let i = 0; i < els.length; i++) {
    (els[i] as HTMLElement).addEventListener("mouseover", () => callback(true));
    (els[i] as HTMLElement).addEventListener("mouseout", () => callback(false));
    (els[i] as HTMLElement).addEventListener("focus", () => callback(true));
    (els[i] as HTMLElement).addEventListener("blur", () => callback(false));
  }
};

export const RemovePopoverListeners = (
  callback: (makeVisible: boolean) => void
) => {
  const els = document.getElementsByClassName("chat-icon");

  for (let i = 0; i < els.length; i++) {
    (els[i] as HTMLElement).removeEventListener("mouseover", () =>
      callback(true)
    );
    (els[i] as HTMLElement).removeEventListener("mouseout", () =>
      callback(false)
    );
    (els[i] as HTMLElement).removeEventListener("focus", () => callback(true));
    (els[i] as HTMLElement).removeEventListener("blur", () => callback(false));
  }
};

export const ToggleChatIconBorder = (makeVisible: boolean) => {
  const els = document.getElementsByClassName("chat-icon-container");

  for (let i = 0; i < els.length; i++) {
    (els[i] as HTMLElement).style["background-color"] = makeVisible
      ? "green"
      : "#222";
  }
};

const newUser = (
  connection: signalR.HubConnection,
  name: string,
  callback: (msg: Message) => void
) => {
  const user = name;
  connection
    .invoke("NewUser", user)
    .then(() => {
      const msg: Message = {
        type: "system",
        content: `${user} joined the chat. Say hi.`,
      };

      callback(msg);
    })
    .catch((err) => {
      const msg: Message = {
        type: "system",
        content: `I had trouble logging you in. Sorry about that, this feature is still being worked on. 
          Feel free to refresh the page to try again or come back later.`,
      };

      callback(msg);

      return console.error(err.toString());
    });
};
