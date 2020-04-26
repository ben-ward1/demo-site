import React from "react";
import ReactDOM from "react-dom";

const parentElement = document.getElementsByClassName("page-background")[0];
const pageElement = document.getElementsByClassName("page-container")[0];

class HeaderNotificationPortal extends React.Component {
  constructor(props) {
    super(props);

    this.rootNode = document.createElement("div");
  }

  componentDidMount() {
    parentElement.insertBefore(this.rootNode, pageElement);
  }

  componentWillUnmount() {
    parentElement.removeChild(this.rootNode);
  }

  render() {
    return ReactDOM.createPortal(this.props.children, this.rootNode);
  }
}

export default HeaderNotificationPortal;
