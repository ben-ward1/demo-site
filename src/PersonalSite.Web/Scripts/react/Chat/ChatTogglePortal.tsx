import * as React from "react";
import * as ReactDOM from "react-dom";

const parentElement1 = document.getElementById("nav-icon-container")!;
const parentElement2 = document.getElementById("navbarSupportedContent")!;

interface IProps {
  children: any;
}

interface IState {}

class ChatTogglePortal extends React.Component<IProps, IState> {
  rootNode: HTMLDivElement;
  clone: HTMLDivElement;

  constructor(props) {
    super(props);

    this.rootNode = document.createElement("div");
    this.rootNode.style.paddingRight = "1rem";

    this.clone = this.rootNode.cloneNode(true) as HTMLDivElement;
    this.clone.id = "expanded-chat-icon";
  }

  componentDidMount() {
    parentElement1.appendChild(this.rootNode);
    parentElement2.appendChild(this.clone);
  }

  componentWillUnmount() {
    parentElement1.removeChild(this.rootNode);
    parentElement2.removeChild(this.clone);
  }

  render() {
    return [
      ReactDOM.createPortal(this.props.children, this.rootNode),
      ReactDOM.createPortal(this.props.children, this.clone),
    ];
  }
}

export default ChatTogglePortal;
