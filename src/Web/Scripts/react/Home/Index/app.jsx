import React from "react";
import ReactDOM from "react-dom";
import { Layout } from "../../shared/LayoutStyledComponents";
import Blog from "../../Blog/Blog";
import HeaderNotification from "../../shared/headerNotification/HeaderNotification";
import GuestbookWizard from "../GuestbookWizard/GuestbookWizard";
import { firstVisitMessageObject } from "../../../notificationHelpers";
import "../../../../Content/styles/app-style.scss";

// TODO: Add IE support to header notification
const isIE = window.navigator.userAgent.indexOf("Trident") != -1;

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notificationIsOpen: true,
    };

    this.closeNotification = this.closeNotification.bind(this);
  }

  closeNotification() {
    const el = document.getElementById("notification-container");
    const cssString = `
      max-height: 0px;
      transition: max-height 0.5s
    `;
    el.style.cssText = cssString;

    setTimeout(() => {
      this.setState({ notificationIsOpen: false });
    }, 500);
  }

  render() {
    const { firstView, captcha } = this.props;
    const { notificationIsOpen } = this.state;

    return (
      <React.Fragment>
        <Blog entries={this.props.blog} />
        <Layout>
          <h2 style={{ marginTop: "2.5rem" }}>Sign my guestbook</h2>
          <GuestbookWizard captcha={captcha} />
          {firstView && notificationIsOpen && !isIE && (
            <HeaderNotification
              closeCallback={this.closeNotification}
              message={firstVisitMessageObject}
            />
          )}
        </Layout>
      </React.Fragment>
    );
  }
}

ReactDOM.render(<App {...window.MODEL} />, document.getElementById("app"));
