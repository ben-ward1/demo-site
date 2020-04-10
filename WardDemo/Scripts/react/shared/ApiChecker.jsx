import React from "react";
import axios from "axios";
import { faSyncAlt } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SuccessCheckIcon from "../shared/SuccessCheckIcon";
import { BuildBaseUrl } from "../../urlHelperFunctions";

library.add(faSyncAlt);

class ApiChecker extends React.Component {
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
      <div id="api-response-container">
        <SuccessCheckIcon id="api-check" check={someValue !== null} />
        <div id="response-text" className={someValue && "connected"}>
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
    );
  }
}

export default ApiChecker;
