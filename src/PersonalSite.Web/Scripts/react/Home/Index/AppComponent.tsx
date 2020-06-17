import * as React from "react";
import { Layout } from "../../shared/LayoutStyledComponents";
import axios from "axios";
import { BuildBaseUrl } from "../../../urlHelperFunctions";
import Blog from "../../Blog/Blog";
import HeaderNotification from "../../shared/headerNotification/HeaderNotification";
import ChatComponent from "../../Chat/ChatComponent";
import GuestbookWizard from "../GuestbookWizard/GuestbookWizard";
import { firstVisitMessageObject } from "../../../notificationHelpers";
import "../../../../Content/styles/app-style.scss";

type blogItem = {
  title: string;
  content: string;
};

interface IProps {
  firstView: boolean;
  captcha: string;
  blog: Array<blogItem>;
}

interface IState {
  notificationIsOpen: boolean;
}

// TODO: Add IE support to header notification
const isIE = window.navigator.userAgent.indexOf("Trident") != -1;

class AppComponent extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);

    this.state = {
      notificationIsOpen: true,
    };

    axios.defaults.baseURL = BuildBaseUrl();

    this.closeNotification = this.closeNotification.bind(this);
  }

  closeNotification() {
    const el = document.getElementById("notification-container")!;
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
    const { firstView, captcha, blog } = this.props;
    const { notificationIsOpen } = this.state;

    return (
      <>
        <Blog entries={blog} />
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
        {captcha && <ChatComponent captcha={captcha} />}
      </>
    );
  }
}

export default AppComponent;
