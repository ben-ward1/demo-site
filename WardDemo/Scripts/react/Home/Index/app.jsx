import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { faSyncAlt } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SuccessCheckIcon from "../../shared/SuccessCheckIcon";
import GuestbookWizard from "../GuestbookWizard/GuestbookWizard";
import { BuildBaseUrl } from "../../../urlHelperFunctions";
import "../../../../Content/styles/app-style.scss";

library.add(faSyncAlt);

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      someValue: null,
      errorMsg: null,
    };

    axios.defaults.baseURL = BuildBaseUrl();
    this.checkApiConnection = this.checkApiConnection.bind(this);
  }

  componentDidMount() {
    this.checkApiConnection();
  }

  checkApiConnection() {
    const thisComponent = this;

    this.setState({ someValue: null, errorMsg: null }, () => {
      setTimeout(function () {
        axios
          .get("home/test")
          .then((response) => {
            if (response.data) {
              thisComponent.setState({ someValue: response.data });
            } else {
              throw "No response from api";
            }
          })
          .catch(function (e) {
            thisComponent.setState({
              errorMsg: "Oops, something went wrong: " + e,
            });
          });
        // set an arbitrary amount of time here just for demonstration
      }, 1200);
    });
  }

  render() {
    const { errorMsg, someValue } = this.state;

    return (
      <Fragment>
        <div id="api-response-container">
          <SuccessCheckIcon id="api-check" check={someValue !== null} />
          <div id="response-text" class={someValue && "connected"}>
            {errorMsg
              ? errorMsg
              : someValue
              ? "API: Connected!"
              : "API: Checking..."}
          </div>
          <FontAwesomeIcon
            id="sync-icon"
            icon={faSyncAlt}
            onClick={this.checkApiConnection}
          />
        </div>
        {/* <div id="api-response-container">
          <Button
            className="primary-button"
            variant="light"
            onClick={this.checkApiConnection}
          >
            Make another call
          </Button>
        </div> */}

        <GuestbookWizard />
      </Fragment>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
