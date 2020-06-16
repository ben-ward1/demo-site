import * as React from "react";
import * as ReactDOM from "react-dom";
import axios from "axios";
import { BuildBaseUrl } from "../../../urlHelperFunctions";
import Logos from "./Logos";
import TechAccordion from "./TechAccordion";
import { Layout } from "../../shared/LayoutStyledComponents";
import Footer from "../../shared/Footer";
import "../../../../Content/styles/app-style.scss";
import ChatComponent from "../../Chat/ChatComponent";

interface IProps {
  captcha: string;
}

interface IState {
  chatIsActive: boolean;
}

class App extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);

    this.state = {
      chatIsActive: false,
    };

    axios.defaults.baseURL = BuildBaseUrl();
  }

  componentDidMount() {
    axios.get("Utility/IsChatActive").then((response) => {
      const active = response.data.success;

      if (active) {
        this.setState({ chatIsActive: true });
      }
    });
  }

  render() {
    const { chatIsActive } = this.state;
    const { captcha } = this.props;
    return (
      <React.Fragment>
        <Layout>
          <h2 className="page-header">About.</h2>
          <h4>
            This is a demo site showing off some of the technologies I develop
            with. See below for more info.
          </h4>
          <Logos />
          <TechAccordion />
          <Footer>
            <a
              className="pull-right"
              href="https://github.com/BenjaminEllisWard/demo-site"
              style={{ float: "right" }}
            >
              See this site's source code here
            </a>
          </Footer>
        </Layout>
        {chatIsActive && <ChatComponent captcha={captcha} />}
      </React.Fragment>
    );
  }
}

ReactDOM.render(<App {...window.MODEL} />, document.getElementById("app"));
