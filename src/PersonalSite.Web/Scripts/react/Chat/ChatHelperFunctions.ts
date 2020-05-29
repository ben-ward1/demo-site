export const RegisterEvents = (connection, name: string) => {
  connection.on("ReceiveMessage", (user: string, message: string) => {
    var label = user + " says: ";
    var p = document.createElement("p");
    var b = document.createElement("b");
    var sp = document.createElement("span");
    b.textContent = label;
    sp.textContent = message;
    p.appendChild(b);
    p.appendChild(sp);
    p.style.marginBottom = "0.5rem";

    const msgBoard = document.getElementById("messageBoard")!;
    msgBoard.appendChild(p);
    msgBoard.scrollTop = msgBoard.scrollHeight;
  });

  connection.on("ReceiveNewUser", (user: string) => {
    const message = user + " joined the chat. Say hi.";
    const msgBoard = document.getElementById("messageBoard")!;
    const p = document.createElement("p");
    const i = document.createElement("i");
    i.textContent = message;
    p.appendChild(i);
    p.style.marginBottom = "0.5rem";
    msgBoard.appendChild(p);
    msgBoard.scrollTop = msgBoard.scrollHeight;
  });

  connection.on("ReceiveUsers", (users: Array<string>) => {
    const userPanel = document.getElementById("userPanel")!;
    userPanel.innerHTML = "";

    const h = document.createElement("h5");
    h.textContent = "Connected users:";
    userPanel.appendChild(h);

    users.forEach((u) => {
      const p = document.createElement("p");
      p.style.marginBottom = "0.5rem";
      p.style.textAlign = "right";
      p.textContent = u;
      userPanel.appendChild(p);
    });
  });

  connection
    .start()
    .then(() => {
      (document.getElementById(
        "sendChatMsgBtn"
      ) as HTMLButtonElement).disabled = false;

      newUser(connection, name);
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

const newUser = (connection, name: string) => {
  const user = name;
  connection.invoke("NewUser", user).catch((err) => {
    return console.error(err.toString());
  });
};
